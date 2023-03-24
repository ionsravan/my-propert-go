import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useState } from "react";
import {
  AiFillStar,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { Buyer, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { FetchState, useFetch } from "src/lib/hooks/useFetch";

interface LayoutProps {
  children: ReactNode;
}

const ActiveStyle = "text-primaryBlue border-b border-primaryBlue";

export const BuyersPageLayout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      <div>
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-black">Buyers</h1>
          <div className="space-x-5 text-sm text-[#616161]">
            <Link href={"/agent/buyers"}>
              <button
                className={` p-2  ${
                  router.pathname == "/agent/buyers" ? ActiveStyle : " "
                }  `}
              >
                All
              </button>
            </Link>
            <Link href={"/agent/buyers/apartment"}>
              <button
                className={`p-2 ${
                  router.pathname == "/agent/buyers/apartment"
                    ? ActiveStyle
                    : " "
                }`}
              >
                Apartment wise
              </button>
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

const MessageCardBuyers = ({ _id, agent, property, user, message }: Buyer) => {
  const [view, setView] = useState<boolean>(false);
  return (
    <div className="bg-white w-full shrink-0 rounded-xl space-x-[17px] px-6  p-5 shadow-md ">
      <div className="md:flex space-y-4 md:space-y-0 justify-between pb-6  border-b border-[#EFEFEF]">
        <div className="flex space-x-4">
          <div className="relative  flex rounded-full justify-center items-center h-[46px] w-[46px]">
            <Image
              fill
              alt=""
              src={"/agent.png"}
              className="w-full h-full object-contain rounded-full "
            />
          </div>
          <div>
            <h1 className="text-sm text-TitleColor font-bold">{user.name}</h1>
            <p className="font-light text-xs text-[#091E42]">
              Enquired 4 Minutes Ago{" "}
            </p>
          </div>
        </div>
        <div className="text-sm font-medium space-x-6">
          <button
            className="text-primaryBlue"
            onClick={() => {
              setView(!view);
            }}
          >
            View
          </button>
          <button className="text-[#2E7B32]">Reply</button>
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="py-5 space-y-1">
          <p className="text-[#091E42] font-extralight text-xs">ENQUIRED FOR</p>
          <div>
            <h1 className="text-sm text-TitleColor font-bold">
              {property?.name}
            </h1>
            <div className="flex space-x-4 mb-4 text-sm mt-1">
              <p className="font-normal text-xs text-[#091E42]">
                {property?.address}
              </p>
              <div className="flex  items-center px-1 space-x-1 bg-green-300 bg-opacity-40 text-green-800 text-[9px]">
                <p>4.5</p>
                <AiFillStar className="text-[6px]" />
              </div>
            </div>
          </div>
        </div>

        <div className=" flex items-center space-x-10">
          <div className="border-r border-[]">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <FaRupeeSign />
                <span className="text-lg font-bold">{property?.cost}</span>
              </span>
              <span className="ml-1 text-xs">k</span>
            </p>
            <p className="text-black opacity-40 text-sm">Onwards</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <span className="text-lg font-bold">
                  {property?.BHKconfig}BHK
                </span>
              </span>
              <span className="ml-1 text-xs"></span>
            </p>
            <p className="text-black opacity-40 text-sm">
              {property?.BHKconfig} Baths
            </p>
          </div>
        </div>
      </div>
      {!view ? (
        <p className="text-[#2E7B32]  font-medium text-[12px]">1 Messages</p>
      ) : (
        <div className="w-full space-y-4 py-5 max-w-3xl transition transform duration-300 ease-in">
          <div className="text-xs text-[#2B2B2B] space-x-2 flex items-center">
            <AiOutlineUser className="text-primaryBlue text-lg" />
            <p>{user?.name}</p>
          </div>
          <div className="text-xs text-[#2B2B2B] space-x-2 flex items-center">
            <AiOutlinePhone className="text-primaryBlue text-lg rotate-90" />
            <p>{user?.mobileNumber}</p>
          </div>
          <div className="text-xs text-[#2B2B2B] space-x-2 flex items-center">
            <AiOutlineMail className="text-primaryBlue text-lg" />
            <p>{user?.email}</p>
          </div>
          <p className="text-xs font-manrope text-TitleColor">{message}</p>
        </div>
      )}
    </div>
  );
};

const Buyers = () => {
  const { data, status } = useFetch<response<Buyer[]>>(
    "/agent/property/buyers/getAllBuyers"
  );
  return (
    <>
      <div className="space-y-5">
        {data?.result.length == 0 && status == FetchState.FETCHED && (
          <p className="text-xl text-black">No Buyers Yet</p>
        )}
        {status === FetchState.FETCHING && <p>loading....</p>}
        {data?.result.map((buyer) => {
          return <MessageCardBuyers {...buyer} key={buyer._id} />;
        })}
      </div>
    </>
  );
};
Buyers.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout Navbar={AgentNavbar}>
      <BuyersPageLayout>{page}</BuyersPageLayout>
    </DashBoardLayout>
  );
};

export default Buyers;
