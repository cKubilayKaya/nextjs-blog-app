import { Formik, Form } from "formik";
import TextField from "./TextField";
import styles from "./createpost.module.css";
import validate from "./validate";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import http from "../../http-config";

function CreatePost({ url }) {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    let item = JSON.parse(sessionStorage.getItem("user"));
    setUser(item ? item.user : "");
  }, []);

  const createPost = async (values) => {
    try {
      const res = await fetch(`${http}/api/posts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      await router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        userName: user.email,
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        createPost({ ...values, userName: user.email });
      }}
    >
      {(formik) => (
        <div className={styles.createPostContainer}>
          <h1 className="my-4 font-weight-bold-display-4 titleText">
            Create Post
          </h1>
          <div className={styles.underline}></div>
          <Form>
            <TextField label="Title" name="title" type="text" />
            <TextField label="Description" name="description" type="text" />
            <button className="btn btn-dark mt-3 shadow-none" type="submit">
              Create
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CreatePost;
