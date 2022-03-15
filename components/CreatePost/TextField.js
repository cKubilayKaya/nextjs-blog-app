import React from "react";
import { ErrorMessage, useField } from "formik";
import styles from "../../styles/Home.module.css";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label htmlFor={field.name} className={"mb-2 " + styles.label}>
        {label}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        } `}
        autoComplete="off"
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className={"error mt-2 mb-2 " + styles.error}
      />
    </div>
  );
};

export default TextField;
