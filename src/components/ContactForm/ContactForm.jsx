import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "/src/redux/contactsSlice.js";

export const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .min(3, "Name should be at least 3 characters!")
      .max(50, "Name should not exceed 50 characters!"),
    number: Yup.string()
      .required("Number is required!")
      .min(3, "Number should be at least 3 characters!")
      .max(50, "Number should not exceed 50 characters!"),
  });

  const handleSubmit = (values, actions) => {
    const contactWithId = { ...values, id: nanoid() };
    dispatch(addContact(contactWithId));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label>Name</label>
        <Field type="text" name="name" className={css.form_input} />
        <ErrorMessage name="name" component="div" className={css.error} />

        <label>Number</label>
        <Field type="tel" name="number" className={css.form_input} />
        <ErrorMessage name="number" component="div" className={css.error} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
