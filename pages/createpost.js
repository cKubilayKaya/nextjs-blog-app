import CreatePost from "../components/CreatePost/CreatePost";
import styles from "../styles/Home.module.css";
import Head from "next/head";

export default function createpost() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Post</title>
      </Head>
      <CreatePost />
    </div>
  );
}
