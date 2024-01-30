import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/useUser";
import { UserProfile } from "./UserProfile";
import { HiChevronUp } from "react-icons/hi2";
import { User } from "../utils/types";
export const NavbarLink = (props: {
  href: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { href, title, className, style } = props;
  const router = useRouter();
  const selected = router.pathname.toLowerCase() === href;
  return (
    <Link href={href}>
      <div
        className={`flex flex-row items-center gap-4 cursor-pointer ${
          selected && `text-indigo-400`
        } text-gray-600 hover:text-indigo-500 hover:underline hover:bg-black/20 rounded-2xl transition-all duration-150 font-medium stroke-2 px-4 py-2
                ${className ? className : ``} `}
        style={style}
      >
        {title}
      </div>
    </Link>
  );
};

export const Navbar = (props: { ref?: React.RefObject<HTMLDivElement> }) => {
  const userData = useContext(UserContext);
  const user = userData?.user;
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div
      className={`flex flex-row gap-2 justify-center w-full p-4 items-center top-0 sticky z-50 `}
      style={{
        transform: "translate3d(0, 0, 10px)",
        WebkitTransform: "translate3d(0, 0, 10px)",
      }}
      ref={props.ref}
    >
      <div
        className={`w-full max-w-6xl flex flex-row gap-2 justify-between items-center backdrop-blur-xl z-30 lg:flex-col rounded-2xl bg-gray-900/50 px-4 py-2
        `}
      >
        <div className={`flex flex-row gap-4 items-center`}>
          <img
            src="/logo.png"
            width={48}
            height={48}
            alt="Logo"
            className={`p-1 border border-gray-100/10 hover:brightness-110 transition-all duration-300 rounded-full saturate-50`}
          />
          <span
            className={`font-montserrat text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-200 via-red-200 to-yellow-100 md:hi`}
          >
            The Midnight Cafe
          </span>
        </div>
        <div className={`flex flex-row gap-2 items-center md:flex-col`}>
          <div className={`flex flex-row gap-1 items-center font-montserrat`}>
            <NavbarLink href="/" title="Home" />
            <NavbarLink href="/menu" title="Menu" />
            {/* <NavbarLink href="/events" title="Events" /> */}
            {/* <NavbarLink href="/class/directory" title="Directory" /> */}
            <NavbarLink href="/contact" title="Support" />
            {/* {JSON.stringify(user)} */}

            {/* <NavbarLink href="/onboarding" title="Login" /> */}
          </div>

          <NavbarUser user={user} />
        </div>
      </div>
    </div>
  );
};

const NavbarUser = (props: { user?: User | null }) => {
  const { user } = props;
  if (!user) {
    return (
      <div className={`flex flex-row gap-2 items-center -ml-2`}>
        <NavbarLink href="/onboarding" title="Account" />
      </div>
    );
  }
  return (
    <div className={`flex flex-row gap-2 items-center sm:hidden`}>
      <UserProfile user={user} className={`w-8 h-8 text-xs`} />
    </div>
  );
};
