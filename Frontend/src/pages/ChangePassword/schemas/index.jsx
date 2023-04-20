import * as Yup from "yup";

export const signUpSchema = Yup.object({
  password: Yup.string().min(6, 'Password must be 6 characters long')
                        .matches(/[0-9]/, 'Password requires a number')
                        .matches(/[a-z]/, 'Password requires a lowercase letter')
                        .matches(/[A-Z]/, 'Password requires an uppercase letter')
                        .matches(/[^\w]/, 'Password requires a symbol')
                        .required("Please enter a password"),

  confirm_password: Yup.string()
    .required("Password must match")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
