import Image from "next/image";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  AiFillProfile,
  AiFillStar,
  AiOutlineLink,
  AiOutlineMore,
} from "react-icons/ai";
import { Agent, response } from "src/@types";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { Menu } from "@headlessui/react";
import { useAxios } from "src/utills/axios";
import { toast } from "react-toastify";
import imgs from "public.json";
import { FetchState } from "src/lib/hooks/useFetch";

const Card = ({
  name,
  Value,
  Icon,
}: {
  name: string;
  Value: number;
  Icon: string;
}) => {
  return (
    <div className="bg-white w-full rounded-lg flex space-x-3 items-center px-[15px] py-5 max-w-[180px]">
      <img src={Icon} alt="" />

      <div>
        <p className="text-primaryBlue text-[19.05px] font-bold">{Value}</p>
        <p className="text-[#A3AED0] text-xs">{name}</p>
      </div>
    </div>
  );
};

const ComapnyCard = ({
  name,
  place,
  img,
  stars,
  _id,
  setAgent,
}: {
  name: string;
  place: string;
  stars: number;
  img: string;
  _id: string;
  setAgent: Dispatch<SetStateAction<Agent[]>>;
}) => {
  const instance = useAxios();
  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-white w-full shrink-0 rounded-lg flex n  space-x-[17px]  p-5 max-w-[280px] relative">
      <div className="relative  flex rounded-full justify-center items-center h-[46px] w-[46px]">
        <Image
          fill
          alt=""
          src={img}
          className="w-full h-full object-contain rounded-full "
        />
      </div>
      <div>
        <h1 className="text-sm text-TitleColor font-bold">{name}</h1>
        <div className="flex space-x-4 mb-4 text-sm mt-1">
          <p className="font-normal text-xs text-[#091E42]">Savita Grenage</p>
          <div className="flex items-center px-1 space-x-1 bg-green-300 bg-opacity-40 text-green-800 text-[9px] rounded-sm">
            <p>4.5</p>
            <AiFillStar className="text-[6px]" />
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-4">
        <button
          onClick={async () => {
            setLoading(true);
            try {
              const res = await instance.delete("/admin/agent/deleteAdmin", {
                data: {
                  agentId: _id,
                },
              });
              if (res.status == 200) {
                toast("Agent Deleted", {
                  type: "success",
                  position: "bottom-center",
                });
                setAgent((prev) => {
                  return prev.filter((agent) => agent._id !== _id);
                });
                setLoading(false);
              }
            } catch (e) {
              setLoading(false);
              console.log(e);
              toast("Error Accured Try Again", {
                position: "bottom-center",
                type: "error",
              });
            }
          }}
          className="text-red-400 px-3 hover:bg-gray-100"
        >
          {!loading ? "delete" : "deleting agent"}
        </button>
      </div>
    </div>
  );
};

const DashBoard = () => {
  const { data, error, status } = useFetch<response<Agent[]>>(
    "/admin/agent/getAllAgents"
  );
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    if (data?.result.length == 0) return;
    if (data?.result) {
      setAgents(data?.result);
    }
  }, [data?.result]);
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <h1 className="text-[#707EAE] text-[10.94px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-[26px]">Dasboard</h2>
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card Icon={imgs.Profile} name="Total Students" Value={2598} />
        <Card Icon={imgs.data} name="Brokers" Value={2598} />
        <Card Icon={imgs.data} name="Companies" Value={2598} />
      </div>
      {/* <div className="bg-white rounded-sm mb-9 p-6  ">
        <div>
          <div>
            <h1 className="text-[#707EAE] text-sm">Daily Traffic</h1>
            <div className="flex  space-x-2">
              <p className="text-[#2B3674] text-[34px] font-bold">2023</p>
              <h1 className="text-[#707EAE] text-sm self-end">Vistors</h1>
            </div>
          </div>
        </div>
        <div></div>
      </div> */}
      <div>
        <h1 className="text-black font-bold text-lg mb-4">All Compenies</h1>
      </div>
      <div className="w-full overflow-scroll scrollbar-hide">
        <div className="flex space-x-4 scrollbar-hide ">
          {agents.length == 0 && status == FetchState.FETCHED && (
            <p className="text-xl text-black">No Agents</p>
          )}
          {status === FetchState.FETCHING && <p>loading....</p>}
          {status === FetchState.FETCHED &&
            agents?.map((ag) => {
              return (
                <ComapnyCard
                  setAgent={setAgents}
                  _id={ag._id}
                  key={ag._id}
                  name={ag?.name}
                  img={ag?.profilePhoto}
                  place=""
                  stars={3.4}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

DashBoard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default DashBoard;
