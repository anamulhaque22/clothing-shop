/** Icons are imported separatly to reduce build time */
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

import { HiDocumentDuplicate } from "react-icons/hi2";

import { HiAcademicCap } from "react-icons/hi2";

import { HiMiniUserPlus } from "react-icons/hi2";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/dashboard",
    icon: <HiAcademicCap className={iconClasses} />,
    name: "Dashboard",
  },

  {
    path: "", //no url needed as this has submenu
    icon: <HiDocumentDuplicate className={`${iconClasses} inline`} />, // icon component
    name: "Pages", // name that appear in Sidebar
    submenu: [
      {
        path: "/login",
        icon: <HiArrowRightEndOnRectangle className={submenuIconClasses} />,
        name: "Login",
      },
      {
        path: "/register", //url
        icon: <HiMiniUserPlus className={submenuIconClasses} />, // icon component
        name: "Register", // name that appear in Sidebar
      },
    ],
  },

  {
    path: "", //no url needed as this has submenu
    icon: <HiDocumentDuplicate className={`${iconClasses} inline`} />, // icon component
    name: "Pages", // name that appear in Sidebar
    submenu: [
      {
        path: "/login",
        icon: <HiArrowRightEndOnRectangle className={submenuIconClasses} />,
        name: "Login",
      },
      {
        path: "/register", //url
        icon: <HiMiniUserPlus className={submenuIconClasses} />, // icon component
        name: "Register", // name that appear in Sidebar
      },
      {
        path: "/register", //url
        icon: <HiMiniUserPlus className={submenuIconClasses} />, // icon component
        name: "Register", // name that appear in Sidebar
      },
    ],
  },
];

export default routes;
