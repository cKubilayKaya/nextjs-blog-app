import { Formik, Form } from "formik";
import TextField from "../../components/CreatePost/TextField";
import styles from "../../components/CreatePost/createpost.module.css";
import validate from "../../components/CreatePost/validate";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import http from "../../http-config";
import Redirect from "../../components/Redirect";

function Edit({ post, url }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState("");
  const [render, setRender] = useState();

  useEffect(() => {
    isAuthFnc();
  }, []);

  const updatePost = async (values) => {
    await fetch(`${http}/api/posts/${post.data._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    router.push("/");
  };

  const isAuthFnc = async () => {
    const res = await fetch(`${http}/api/posts/${post.data._id}`);
    const data = await res.json();
    let item = JSON.parse(sessionStorage.getItem("user"));
    if (data.data.userName == item.user.email) {
      setIsAuth(true);
      setRender(
        <Formik
          initialValues={{
            title: post.data.title,
            description: post.data.description,
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            updatePost(values);
          }}
        >
          {(formik) => (
            <div className={styles.createPostContainer}>
              <Head>
                <title>{post.data.title}</title>
              </Head>
              <h1 className="my-4 font-weight-bold-display-4 titleText">
                Update Post
              </h1>
              <div className={styles.underline}></div>
              <Form>
                <TextField label="Title" name="title" type="text" />
                <TextField label="Description" name="description" type="text" />
                <button className="btn btn-dark mt-3 shadow-none" type="submit">
                  Update
                </button>
              </Form>
            </div>
          )}
        </Formik>
      );
    } else {
      setIsAuth(false);
    }
  };

  if (isAuth) {
    return <>{render}</>;
  }

  return <Redirect to="/" />;
}

export async function getServerSideProps(context) {
  const res = await fetch(`${http}/api/posts/${context.query.id}`);
  const post = await res.json();

  return {
    props: { post, url: context.req.headers.host },
  };
}

export default Edit;
