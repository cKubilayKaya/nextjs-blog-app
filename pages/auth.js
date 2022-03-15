import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Formik, Form } from "formik";
import TextField from "../components/CreatePost/TextField";
import AuthValidate from "../validates/AuthValidate";
import AuthValidate2 from "../validates/AuthValidate2";
import http from "../http-config";
import Redirect from "../components/Redirect";

export default function Auth() {
  const [authRate, setAuthRate] = useState(1);
  const [signinError, setSigninError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let item = JSON.parse(sessionStorage.getItem("user"));
  }, []);

  const signUp = async (values) => {
    const res = await fetch(`${http}/api/log/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (res.status == 201) {
      setAuthRate(1);
    }
  };

  const signIn = async (values) => {
    const res = await fetch(`${http}/api/log/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (
      data.data.user.email == values.email ||
      data.data.user.password == values.password
    ) {
      sessionStorage.setItem("user", JSON.stringify(data.data));
      window.location.href = "/";
    } else {
      setSigninError(true);
    }
  };

  return (
    <div className={styles.formContainer}>
      {authRate === 0 ? (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={AuthValidate}
          onSubmit={(values) => signUp(values)}
        >
          {(formik) => (
            <Form className={styles.form}>
              <h3>Sign Up</h3>
              <TextField label="Name" name="name" type="text" />
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="password" />
              <button className="btn btn-dark mt-3 shadow-none" type="submit">
                Sign Up
              </button>
              <div onClick={() => setAuthRate(1)}>
                Do you have an accout?
                <b>Sign In</b>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={AuthValidate2}
          onSubmit={(values) => signIn(values)}
        >
          {(formik) => (
            <Form className={styles.form}>
              <h3>Sign In</h3>
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="password" />
              <button className="btn btn-dark mt-3 shadow-none" type="submit">
                Sign In
              </button>
              <p>{setSigninError == true ? "Email/Şifre hatalı!" : ""}</p>
              <div onClick={() => setAuthRate(0)}>
                Dont you have an accout?
                <b>Sign Up</b>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
