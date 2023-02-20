// side navitem a usabale componet
// have two state active on active apply right border and color to text and icon
// have spaced out

import Image from "next/image";
import { AiOutlineFile, AiOutlineHome, AiOutlineProfile } from "react-icons/ai";

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
        "flex flex-col items-center font-manrope   px-3 cursor-pointer " +
        (isActive ? " border-primaryBlue border-r-2 " : " ")
      }
    >
      <Icon
        className={
          (isActive ? "text-primaryBlue " : " text-[#AAAAAA]") + " text-3xl"
        }
      />
      <p
        className={
          " text-sm pt-1 " + (isActive ? "text-primaryBlue " : "text-[#AAAAAA]")
        }
      >
        {name}
      </p>
    </div>
  );
};

const UserDasBoardNav = () => {
  return (
    <div className="p-1 space-y-8">
      <SideNavItem name="Home" Icon={AiOutlineHome} isActive />
      <SideNavItem name="Ongoing" Icon={AiOutlineFile} />
      <SideNavItem name="Profile" Icon={Avtar} />
    </div>
  );
};

export default UserDasBoardNav;
