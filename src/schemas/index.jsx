import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().max(64).email().required("Please enter your name"),
  password: Yup.string().min(6).required("Please enter your password")
});