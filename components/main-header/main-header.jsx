import Link from "next/link";
import Image from "next/image";

import logoImage from "@/assets/logo.png";
import classes from "@/components/main-header/main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        {/* logo and navigation to home */}
        <Link href={"/"} className={classes.logo}>
          <Image src={logoImage} alt="A plate with food on it" priority />
        </Link>

        {/* navigation section */}
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/meals"}> Browse Meals </NavLink>
            </li>
            <li>
              <NavLink href={"/community"}> Foodies Community </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
