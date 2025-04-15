import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TEACHER_API = "https://lms-1-pwuy.onrender.com";

export const teacherRegistrationApi = createApi({
  reducerPath: "teacherRegistrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TEACHER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerTeacher: builder.mutation({
      query: (formData) => ({
        url: "/teacher_registration.php",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterTeacherMutation } = teacherRegistrationApi;
