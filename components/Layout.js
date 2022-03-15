import Head from "next/head";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Post App</title>
      <link rel="shortcut icon" href="../public/favicon.ico" />
    </Head>
    <Navbar />
    {children}
  </>
);

export default Layout;
