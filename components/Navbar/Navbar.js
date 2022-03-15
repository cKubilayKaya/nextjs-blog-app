import Link from "next/link";
import styles from "./navbar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    let item = JSON.parse(sessionStorage.getItem("user"));
    setUser(item && item.user);
  }, []);

  const signOut = () => {
    setUser("");
    sessionStorage.removeItem("user");
    router.reload(window.location.pathname);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Home</a>
      </Link>
      {user && (
        <div>
          <Link href="/createpost">
            <a>Create Post</a>
          </Link>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </nav>
  );
}
