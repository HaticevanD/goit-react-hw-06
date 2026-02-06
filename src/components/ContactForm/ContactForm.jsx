import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { addContact } from "../../redux/contactsSlice";
import { selectContacts } from "../../redux/contactsSlice";

import css from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const trimmedName = values.name.trim().toLowerCase();

    const nameExists = contacts.some(
      (contact) => contact.name.trim().toLowerCase() === trimmedName,
    );

    if (nameExists) {
      alert("This contact already exists!");
      return;
    }

    const newId =
      Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

    dispatch(
      addContact({
        id: newId,
        name: values.name.trim(),
        number: values.number.trim(),
      }),
    );

    resetForm();
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <label htmlFor="name" className={css.label}>
              Name
            </label>
            <div className={css.inputWrapper}>
              <FaUser className={css.inputIcon} />
              <Field type="text" id="name" name="name" className={css.input} />
            </div>
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="number" className={css.label}>
              Number
            </label>
            <div className={css.inputWrapper}>
              <FaPhoneAlt className={css.inputIcon} />
              <Field
                type="tel"
                id="number"
                name="number"
                className={css.input}
              />
            </div>
            <ErrorMessage name="number" component="div" className={css.error} />
          </div>

          <button type="submit" className={css.submitButton}>
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ContactForm;
