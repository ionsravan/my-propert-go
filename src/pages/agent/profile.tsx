import Image from "next/image";
import { ReactElement } from "react";
import {
  AiOutlineHome,
  AiOutlineInfo,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { Agent, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";

interface Props {
  Icon: React.ElementType;
  name: string;
  value: string | number | undefined;
}

const ProfileItem = ({ Icon, name, value }: Props) => {
  return (
    <div className="flex space-x-3 items-center">
      <div>{Icon && <Icon className="text-primaryBlue" />}</div>
      <div>
        <p className=" font-medium text-sm">{name}</p>
        <p className="text-xs ">{value}</p>
      </div>
    </div>
  );
};

const Profile = () => {
  const { data } = useFetch<response<Agent>>("/agent/property");

  return (
    <>
      <div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-black">My Profile</h1>
        </div>
        <div className="h-20 w-20 relative rounded-full">
          <Image
            src={data?.result?.profilePhoto as string}
            fill
            className="object-fill rounded-full"
            alt="villa4"
          />
        </div>
        <div className="my-5 space-y-5">
          <h2 className="text-xl text-TitleColor font-bold ">
            {data?.result.name}
          </h2>
          <button className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200   ">
            Edit Profile
          </button>
        </div>
        <div className="text-[#4A4A4A] space-y-5 mt-10">
          <ProfileItem
            name="EXEPERENCE"
            value={`${4} years`}
            Icon={AiOutlineInfo}
          />
          <ProfileItem
            name="MOBILE NUMBER"
            value={`${data?.result?.mobileNumber} `}
            Icon={AiOutlinePhone}
          />
          <ProfileItem
            name="EMAIL"
            value={data?.result?.email}
            Icon={AiOutlineMail}
          />
          <ProfileItem
            name="PROPERTY COUNT"
            value={data?.result?.properties.length}
            Icon={AiOutlineHome}
          />
          <ProfileItem
            name="OPRATING AREA"
            value={`Gie   GEo `}
            Icon={FaLocationArrow}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};
