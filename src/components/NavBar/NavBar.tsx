import React from "react";
import Image from "next/image";
import css from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faIdCard,
  faImagePortrait,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavLinkWithToolTip from "../ToolTip/NavLinkWithToolTip";
import { useUserContext } from "../../context/userContext";

const NavBar = () => {
  const { user: currentUser } = useUserContext();

  return (
    <nav className={css["navbar"]}>
      <div className={css["nav-left"]}>
        <Link href={"/"}>
          <a className={css["brand"]}>
            <Image src={"/images/resume.png"} width={60} height={60} />
          </a>
        </Link>
        <NavLinkWithToolTip
          tooltipLabel={`Search`}
          activeClass={css["active"]}
          className={css["nav-item"]}
          to={`/search`}
          exact={false}
          query={{ f: "name", q: "" }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={css["nav-icon"]}
          />
        </NavLinkWithToolTip>
      </div>
      <div className={css["nav-right"]}>
        <NavLinkWithToolTip
          tooltipLabel={`My Card`}
          activeClass={css["active"]}
          className={css["nav-item"]}
          to={`/profile/${currentUser?.id}`}
        >
          <FontAwesomeIcon icon={faIdCard} className={css["nav-icon"]} />
        </NavLinkWithToolTip>
        <NavLinkWithToolTip
          tooltipLabel={`My Resume`}
          activeClass={css["active"]}
          className={css["nav-item"]}
          to={`/profile/${currentUser?.id}/detail`}
        >
          <FontAwesomeIcon icon={faImagePortrait} className={css["nav-icon"]} />
        </NavLinkWithToolTip>

        {currentUser ? (
          <NavLinkWithToolTip
            tooltipLabel="Logout"
            className={css["nav-item"]}
            activeClass={css["active"]}
            to={"/logout"}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className={css["nav-icon"]}
            />
          </NavLinkWithToolTip>
        ) : (
          <>
            <NavLinkWithToolTip
              tooltipLabel="Register"
              className={css["nav-item"]}
              activeClass={css["active"]}
              to={"/register"}
            >
              <FontAwesomeIcon icon={faUserPlus} className={css["nav-icon"]} />
            </NavLinkWithToolTip>
            <NavLinkWithToolTip
              tooltipLabel="Login"
              className={css["nav-item"]}
              activeClass={css["active"]}
              to={"/login"}
            >
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                className={css["nav-icon"]}
              />
            </NavLinkWithToolTip>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
