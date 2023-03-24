import { LucideProps } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AdminNavbarIcons } from "../admin/adminIcons";

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
const icons = {
  profile: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="21"
      viewBox="0 0 28 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M10.5 0C16.2897 0 21 4.7103 21 10.5C21 16.2897 16.2897 21 10.5 21C4.7103 21 0 16.2897 0 10.5C0 4.7103 4.7103 0 10.5 0ZM10.5 1.575C5.57865 1.575 1.575 5.57865 1.575 10.5C1.575 15.4213 5.57865 19.425 10.5 19.425C15.4213 19.425 19.425 15.4213 19.425 10.5C19.425 5.57865 15.4213 1.575 10.5 1.575ZM14.6456 9.46438C15.2263 9.46438 15.6956 9.93373 15.6956 10.5144C15.6956 11.095 15.2263 11.5644 14.6456 11.5644C14.065 11.5644 13.5904 11.095 13.5904 10.5144C13.5904 9.93373 14.0555 9.46438 14.6351 9.46438H14.6456ZM10.4354 9.46438C11.0161 9.46438 11.4854 9.93373 11.4854 10.5144C11.4854 11.095 11.0161 11.5644 10.4354 11.5644C9.85478 11.5644 9.38122 11.095 9.38122 10.5144C9.38122 9.93373 9.84532 9.46438 10.426 9.46438H10.4354ZM6.22618 9.46438C6.80683 9.46438 7.27618 9.93373 7.27618 10.5144C7.27618 11.095 6.80683 11.5644 6.22618 11.5644C5.64553 11.5644 5.17093 11.095 5.17093 10.5144C5.17093 9.93373 5.63609 9.46438 6.21673 9.46438H6.22618Z" />
      </g>
    </svg>
  ),
  postings: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="21"
      viewBox="0 0 28 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12.2276 0.41748C12.2754 0.41748 12.3224 0.42151 12.368 0.429247L12.5205 0.430183C12.7478 0.430183 12.9651 0.522663 13.1233 0.686454L18.7669 6.56621C18.9162 6.72108 18.9999 6.92944 18.9999 7.14449V17.3575C19.0198 20.153 16.8426 22.4372 14.0425 22.5508L5.1076 22.552H4.98615C2.25636 22.4903 0.0670344 20.2825 0.000336307 17.5794L0 5.42079C0.0646249 2.6564 2.34767 0.430183 5.092 0.430183L12.0872 0.429247C12.1328 0.42151 12.1797 0.41748 12.2276 0.41748ZM11.3918 2.10107L5.09423 2.10152C3.24796 2.10152 1.71479 3.5968 1.67133 5.44084V17.3575C1.63011 19.2661 3.13431 20.8383 5.02403 20.8806H14.0091C15.8688 20.8037 17.3418 19.2583 17.3285 17.3641L17.3284 8.1981L15.0889 8.19921C13.0499 8.19364 11.3919 6.53122 11.3919 4.49442L11.3918 2.10107ZM12.0195 14.4657C12.4807 14.4657 12.8551 14.8401 12.8551 15.3014C12.8551 15.7627 12.4807 16.137 12.0195 16.137H6.00265C5.54136 16.137 5.16699 15.7627 5.16699 15.3014C5.16699 14.8401 5.54136 14.4657 6.00265 14.4657H12.0195ZM9.74098 10.2851C10.2023 10.2851 10.5766 10.6595 10.5766 11.1208C10.5766 11.5821 10.2023 11.9565 9.74098 11.9565H6.00165C5.54036 11.9565 5.16598 11.5821 5.16598 11.1208C5.16598 10.6595 5.54036 10.2851 6.00165 10.2851H9.74098ZM13.0631 3.03813L13.0633 4.49442C13.0633 5.6131 13.9736 6.52454 15.0911 6.52788L16.4125 6.52676L13.0631 3.03813Z" />
      </g>
    </svg>
  ),
};

const AgentNavbar = () => {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden  font-manrope">
      <h1 className="text-xl text-black font-bold pl-7 pb-9">My Property Go</h1>
      <Link href={"/agent"}>
        <SideNavItem
          name="Dashboard"
          Icon={AdminNavbarIcons.home}
          isActive={router.pathname == "/agent"}
        />
      </Link>
      <Link href={"/agent/mypostings"}>
        <SideNavItem
          name="My Posting"
          Icon={icons.postings}
          isActive={
            router.pathname == "/agent/mypostings" ||
            router.pathname == "/agent/mypostings/edit"
          }
        />
      </Link>
      <Link href={"/agent/buyers"}>
        <SideNavItem
          name="Buyers"
          Icon={AdminNavbarIcons.customer}
          isActive={
            router.pathname == "/agent/buyers" ||
            router.pathname == "/agent/mypostings/apartments"
          }
        />
      </Link>
      <Link href={"/agent/profile"}>
        <SideNavItem
          name="My Profile"
          Icon={icons.profile}
          isActive={router.pathname == "/agent/profile"}
        />
      </Link>
    </div>
  );
};

export default AgentNavbar;
