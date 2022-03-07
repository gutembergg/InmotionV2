import * as Yup from "yup";

export const validatorSchema = Yup.object().shape({
  billing_last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  billing_first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  billing_email: Yup.string().email("Invalid email").required("Required"),
  billing_phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  billing_address_1: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  billing_address_2: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  billing_postcode: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  billing_city: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  billing_country: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  shipping_last_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  shipping_first_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  shipping_phone: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  shipping_address_1: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  shipping_address_2: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  shipping_postcode: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  shipping_city: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  shipping_country: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
});
