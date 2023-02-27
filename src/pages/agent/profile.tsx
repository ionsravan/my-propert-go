import Image from "next/image";
import { ReactElement, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineInfo,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FaEdit, FaLocationArrow } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { toast } from "react-toastify";
import { Agent, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";

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
  const [file, setFile] = useState<any>(null);
  const instance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const handleSubmit = async () => {
    const data = new FormData();
    if (file) {
      data.append("profilePhoto", file);
    }
    try {
      setLoading(true);
      const res = await instance.patch(
        "/agent/profile/changeProfilePhoto",
        data
      );
      toast("Profile Saved");
      setLoading(false);
      setFile(null);
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast("Some Error Try Again");
    }
  };

  return (
    <>
      <div>
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-black">My Profile</h1>
        </div>
        <div className="h-20 w-20 relative rounded-full">
          <>
            {data?.result?.profilePhoto || file ? (
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : (data?.result?.profilePhoto as string)
                }
                fill
                className="object-fill rounded-full"
                alt="villa4"
              />
            ) : (
              <>
                <label className=" max-w-[150px] flex flex-col w-20 h-20 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 rounded-full">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="text-[9px] tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a photo
                    </p>
                  </div>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e?.target?.files[0]);
                      }
                    }}
                    type="file"
                    className="opacity-0"
                    value={file}
                  />
                </label>
              </>
            )}
          </>
        </div>
        {file && (
          <div className="flex space-x-4 my-7">
            <button
              onClick={() => {
                setFile(null);
              }}
              className="px-8 py-2 bg-red-400 rounded-full text-white"
            >
              cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-primaryBlue rounded-full text-white"
            >
              {loading ? "saving... " : "save profile"}
            </button>
          </div>
        )}
        <div className="my-5 space-y-5">
          <h2 className="text-xl text-TitleColor font-bold ">
            {data?.result.name}
          </h2>
          {/* <button className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200   ">
            Edit Profile
          </button> */}
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
