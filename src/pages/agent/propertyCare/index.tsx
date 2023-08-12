import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";
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
import { useAxios } from "src/utills/axios";



const myPropertyCare = () => {
  const instance = useAxios();




  useEffect(() => {
  const myGetPropertyCare = async () => {
    try {
   
      const res = await instance.get("/user/myCareServiceProperty");

      if (res.data) {
        console.log(res.data, "reeeeee");
    
      }
    } catch (error) {
      console.error("An error occurred:", error);
    
    }
  }
  myGetPropertyCare()
  }, [])
  
  return (
    <>
      <div className="mb-6">
          <h1 className="text-[22px] font-bold text-black mb-5">My Property Care</h1>

      <div className="space-y-5">
        
      </div>
      </div>
    </>
  );
};
myPropertyCare.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout Navbar={AgentNavbar}>
      {page}
      {/* <BuyersPageLayout>{page}</BuyersPageLayout> */}
    </DashBoardLayout>
  );
};

export default myPropertyCare;
