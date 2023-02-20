// side navitem a usabale componet
// have two state active on active apply right border and color to text and icon
// have spaced out

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AiOutlineApartment,
  AiOutlineCustomerService,
  AiOutlineFile,
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { MdOutlineApartment } from "react-icons/md";

const Avtar = () => {
  return (
    <div className="h-8 w-8 relative rounded-full">
      <Image
        src={"/agent.png"}
        fill
        className="object-fill rounded-full"
        alt="villa4"
      />
    </div>
  );
};

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

const SideNav = () => {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden  font-manrope">
      <h1 className="text-xl text-black font-bold pl-7 pb-9">My Property Go</h1>
      <Link href={"/company"}>
        <SideNavItem
          name="Dashboard"
          Icon={AiOutlineHome}
          isActive={router.pathname == "/company"}
        />
      </Link>
      <Link href={"/company/mypostings"}>
        <SideNavItem
          name="My Posting"
          Icon={AiOutlineUserSwitch}
          isActive={
            router.pathname == "/company/mypostings" ||
            router.pathname == "/company/mypostings/edit"
          }
        />
      </Link>
      <Link href={"/company/buyers"}>
        <SideNavItem
          name="Buyers"
          Icon={RiUser3Line}
          isActive={
            router.pathname == "/company/buyers" ||
            router.pathname == "/company/mypostings/apartments"
          }
        />
      </Link>
      <Link href={"/admin/compnies"}>
        <SideNavItem
          name="My Profile"
          Icon={MdOutlineApartment}
          isActive={router.pathname == "/admin/compnies"}
        />
      </Link>
    </div>
  );
};

export default SideNav;
