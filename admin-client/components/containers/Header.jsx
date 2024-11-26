"use client";
import Image from "next/image";
import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import ThemeSwitch from "../ThemeSwitch";

function Header() {
  function logoutUser() {
    logout();
    // localStorage.clear();
    // window.location.href = "/";
  }
  //   useEffect(() => {
  //     if (!checkUser()) {
  //       router.push("/login");
  //     }
  //   }, []);

  return (
    <>
      <div className="navbar  flex justify-between bg-primary border-b border-b-bc z-10">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <HiBars3 className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{"pageTitle"}</h1>
        </div>

        <div className="flex-none">
          <div>
            <ThemeSwitch />
          </div>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={"/images/avatar-placeholder.png"}
                  height={130}
                  width={130}
                  className="rounded-full  object-fill"
                  alt="avatar"
                />
                {/* <img src="https://placeimg.com/80/80/people" alt="profile" /> */}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link href={"/app/settings-profile"}>
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="">
                <Link href={"/app/settings-billing"}>Bill History</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
