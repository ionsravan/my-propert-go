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
import { BiSupport } from "react-icons/bi";
import { MdMap, MdOutlineApartment, MdPictureInPicture, MdSubscriptions } from "react-icons/md";
import { LucideProps } from "lucide-react";
import { AdminNavbarIcons } from "./adminIcons";
import { BsHouse } from "react-icons/bs";
import { GiBuyCard, GiHouse } from "react-icons/gi";
import { SiGoogleads } from "react-icons/si";

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

const AdminsideNav = () => {
  const router = useRouter();

  const handleURLQueries = (item: string) => {
    if (item) {
      return router.asPath.includes(item);
    }
  };

  const isNavLinkActive = (item: string) => {
    if (router.pathname === item || handleURLQueries(item)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full overflow-hidden  font-manrope">
      <h1 className="text-xl text-black font-bold pl-7 pb-9">My Property Go</h1>
      <Link href={"/admin"}>
        <SideNavItem
          name="Dashboard"
          Icon={AdminNavbarIcons.home}
          isActive={router.pathname == "/admin"}
        />
      </Link>
      <Link href={"/admin/customers"}>
        <SideNavItem
          name="Customer"
          Icon={AdminNavbarIcons.customer}
          isActive={isNavLinkActive("/admin/customers")}
        />
      </Link>
      <Link href={"/admin/orders"}>
        <SideNavItem
          name="Orders"
          Icon={GiBuyCard}
          isActive={isNavLinkActive("/admin/orders")}
        />
      </Link>
      <Link href={"/admin/plans"}>
        <SideNavItem
          name="Plans"
          Icon={MdSubscriptions}
          isActive={isNavLinkActive("/admin/plans")}
        />
      </Link>
      <Link href={"/admin/locations"}>
        <SideNavItem
          name="Locations"
          Icon={MdMap}
          isActive={isNavLinkActive("/admin/locations")}
        />
      </Link>
      <Link href={"/admin/property"}>
        <SideNavItem
          name="Properties"
          Icon={AdminNavbarIcons.compnies}
          isActive={isNavLinkActive("/admin/property")}
        />
      </Link>
      <Link href={"/admin/leads"}>
        <SideNavItem
          name="Leads"
          Icon={SiGoogleads}
          isActive={isNavLinkActive("/admin/leads")}
        />
      </Link>
      <Link href={"/admin/blogs"}>
        <SideNavItem
          name="Blogs"
          Icon={MdPictureInPicture}
          isActive={isNavLinkActive("/admin/blogs")}
        />
      </Link>
      {/* <Link href={"/admin/broker"}>
        <SideNavItem
          name="Brokers"
          Icon={AdminNavbarIcons.brokers}
          isActive={isNavLinkActive("/admin/broker")}
        />
      </Link>
      <Link href={"/admin/compnies"}>
        <SideNavItem
          name="Companies"
          Icon={AdminNavbarIcons.compnies}
          isActive={isNavLinkActive("/admin/compnies")}
        />
      </Link> */}
      <Link href={"/admin/tickets"}>
        <SideNavItem
          name="Tickets"
          Icon={BiSupport}
          isActive={isNavLinkActive("/admin/tickets")}
        />
      </Link>
    </div>
  );
};

export default AdminsideNav;