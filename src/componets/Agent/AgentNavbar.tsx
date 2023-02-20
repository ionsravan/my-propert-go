import Link from "next/link";
import { useRouter } from "next/router";
import {
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineUserSwitch,
  AiTwotoneProfile,
} from "react-icons/ai";
import { RiProfileFill, RiUser3Line } from "react-icons/ri";
import { MdOutlineApartment } from "react-icons/md";

// sideNavItem
interface SideNavItemProps {
  name: string;
  Icon: React.ElementType;
  isActive?: boolean;
}

const SideNavItem = ({ name, Icon, isActive }: SideNavItemProps) => {
  return (
    <div
      className={
        "flex w-full space-x-4 py-4  items-center font-manrope   cursor-pointer pl-7 " +
        (isActive ? " border-primaryBlue border-r-2 " : " ")
      }
    >
      <Icon color={isActive ? "#0066FF" : "#AAA"} className={" text-3xl"} />
      <p
        className={
          " text-lg pt-1 " +
          (isActive ? "text-primaryBlue font-bold " : "text-[#AAAAAA]")
        }
      >
        {name}
      </p>
    </div>
  );
};

const AgentNavbar = () => {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden  font-manrope">
      <h1 className="text-xl text-black font-bold pl-7 pb-9">My Property Go</h1>
      <Link href={"/agent"}>
        <SideNavItem
          name="Dashboard"
          Icon={AiOutlineHome}
          isActive={router.pathname == "/agent"}
        />
      </Link>
      <Link href={"/agent/mypostings"}>
        <SideNavItem
          name="My Posting"
          Icon={AiOutlineUserSwitch}
          isActive={
            router.pathname == "/agent/mypostings" ||
            router.pathname == "/agent/mypostings/edit"
          }
        />
      </Link>
      <Link href={"/agent/buyers"}>
        <SideNavItem
          name="Buyers"
          Icon={RiUser3Line}
          isActive={
            router.pathname == "/agent/buyers" ||
            router.pathname == "/agent/mypostings/apartments"
          }
        />
      </Link>
      <Link href={"/agent/profile"}>
        <SideNavItem
          name="My Profile"
          Icon={AiOutlineProfile}
          isActive={router.pathname == "/agent/profile"}
        />
      </Link>
    </div>
  );
};

export default AgentNavbar;
