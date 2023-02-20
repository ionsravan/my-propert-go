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
import SideNav from "src/componets/company/companyNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";

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
            <Link href={"/company/buyers"}>
              <button
                className={` p-2  ${
                  router.pathname == "/company/buyers" ? ActiveStyle : " "
                }  `}
              >
                All
              </button>
            </Link>
            <Link href={"/company/buyers/apartment"}>
              <button
                className={`p-2 ${
                  router.pathname == "/company/buyers/apartment"
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

const MessageCardBuyers = ({
  name,
  place,
  img,
  stars,
}: {
  name: string;
  place: string;
  stars: number;
  img: string;
}) => {
  const [view, setView] = useState<boolean>(false);
  return (
    <div className="bg-white w-full shrink-0 rounded-xl space-x-[17px] px-6  p-5 shadow-md ">
      <div className="flex justify-between pb-6  border-b border-[#EFEFEF]">
        <div className="flex space-x-4">
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
      <div className="flex justify-between">
        <div className="py-5 space-y-1">
          <p className="text-[#091E42] font-extralight text-xs">ENQUIRED FOR</p>
          <div>
            <h1 className="text-sm text-TitleColor font-bold">{name}</h1>
            <div className="flex space-x-4 mb-4 text-sm mt-1">
              <p className="font-normal text-xs text-[#091E42]">
                Savita Grenage
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
                <span className="text-lg font-bold">2.9</span>
              </span>
              <span className="ml-1 text-xs">Cr</span>
            </p>
            <p className="text-black opacity-40 text-sm">Onwards</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex text-TitleColor text-lg items-center">
              <span className="flex items-center space-x-1 ">
                <span className="text-lg font-bold">4BHK</span>
              </span>
              <span className="ml-1 text-xs"></span>
            </p>
            <p className="text-black opacity-40 text-sm">4 Baths</p>
          </div>
        </div>
      </div>
      {!view ? (
        <p className="text-[#2E7B32]  font-medium text-[12px]">4 Messages</p>
      ) : (
        <div className="w-full space-y-4 py-5 max-w-3xl transition transform duration-300 ease-in">
          <div className="text-xs text-[#2B2B2B] space-x-2 flex items-center">
            <AiOutlineUser className="text-primaryBlue text-lg" />
            <p>Name</p>
          </div>
          <div className="text-xs text-[#2B2B2B] space-x-2 flex items-center">
            <AiOutlinePhone className="text-primaryBlue text-lg rotate-90" />
            <p>Phone Number</p>
          </div>
          <div className="text-xs text-[#2B2B2B] space-x-2 flex items-center">
            <AiOutlineMail className="text-primaryBlue text-lg" />
            <p>Email</p>
          </div>
          <p className="text-xs font-manrope text-TitleColor">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
            porttitor molestie vulputate bibendum tellus. Auctor aliquet quis
            donec euismod nunc arcu, rhoncus, sodales id. Ut pellentesque ac
            vulputate gravida odio est lectus. Malesuada mauris integer in arcu,
            semper. Orci in nam neque, volutpat, diam tempor eu egeLorem ipsum
            dolor sit amet, consectetur adipiscing elit. Mattis porttitor
            molestie vulputate bibendum tellus. Auctor aliquet quis donec
            euismod nunc arcu, rhoncus, sodales id. Ut pellentesque ac vulputate
            gravida odio est lectus. Malesuada mauris integer in arcu, semper.
            Orci in nam neque, volutpat, diam tempor eu eget pretium.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Mattis porttitor
            molestie vulputate bibendum tellus. Auctor aliquet quis donec
            euismod nunc arcu, rhoncus, sodales id. Ut pellentesque ac vulputate
            gravida odio est lectus. Malesuada mauris integer in arcu, semper.
            Orci in nam neque, volutpat, diam tempor eu eget pretium.t pretium{" "}
          </p>
        </div>
      )}
    </div>
  );
};

const Buyers = () => {
  return (
    <>
      <div className="space-y-5">
        <MessageCardBuyers
          name="Aparna Construction"
          img="/agent.png"
          place=""
          stars={3.4}
        />{" "}
        <MessageCardBuyers
          name="Aparna Construction"
          img="/agent.png"
          place=""
          stars={3.4}
        />
      </div>
    </>
  );
};
Buyers.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout Navbar={SideNav}>
      <BuyersPageLayout>{page}</BuyersPageLayout>
    </DashBoardLayout>
  );
};

export default Buyers;
