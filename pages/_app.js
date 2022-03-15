import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Auth from "./auth";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    let item = JSON.parse(sessionStorage.getItem("user"));
    setUser(item ? item.user : "");
  }, []);

  return (
    <Layout>
      {user ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Auth />
        </>
      )}
    </Layout>
  );
}

export default MyApp;
