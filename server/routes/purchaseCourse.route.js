import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  stripeWebhook,
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedCourse);
router.route("/:userId").get(isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId;
    const purchases = await Purchase.find({ userId: userId });

    if (!purchases.length) {
      return res
        .status(404)
        .json({ message: "No purchases found for this user" });
    }

    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
