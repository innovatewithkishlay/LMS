import Stripe from "stripe";
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    console.log("Received courseId:", courseId);

    if (
      !courseId ||
      typeof courseId !== "string" ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      console.log("Invalid courseId format:", courseId);
      return res.status(400).json({ message: "Invalid courseId format" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    event = stripe.webhooks.constructEvent(payload, sig, secret);
    console.log("Webhook event received:", event.type);

    if (event.type === "checkout.session.completed") {
      console.log("Processing checkout.session.completed event");

      const session = event.data.object;

      const { courseId, userId } = session.metadata;

      try {
        const purchase = await CoursePurchase.findOneAndUpdate(
          { paymentId: session.id },
          { status: "completed" },
          { new: true }
        );

        if (!purchase) {
          console.error("Purchase not found for session ID:", session.id);
          return res.status(404).json({ message: "Purchase not found" });
        }

        console.log("Purchase updated to completed:", purchase);

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { enrolledCourses: courseId } },
          { new: true }
        );

        console.log("User updated with enrolled course:", updatedUser);

        const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          { $addToSet: { enrolledStudents: userId } },
          { new: true }
        );

        console.log("Course updated with enrolled student:", updatedCourse);
      } catch (error) {
        console.error(
          "Error processing checkout.session.completed event:",
          error
        );
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }

    res.status(200).send();
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
