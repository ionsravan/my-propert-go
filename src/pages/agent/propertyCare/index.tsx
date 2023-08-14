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
  const [propertyCare, setPropertyCare] = useState([])


  useEffect(() => {
  const myGetPropertyCare = async () => {
    try {
   
      const res = await instance.get("/user/myCareServiceProperty");

      if (res.data) {
        console.log(res.data.data, "reeeeee");
        setPropertyCare(res.data.data)
    
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

          {propertyCare !== undefined &&
            <div
            className="bg-white text-black rounded-lg shadow-lg p-6 mt-5 w-full sm:w-1/2"
            // ^-- Use full width on small screens, half width on larger screens
          >
      {propertyCare.map((currentProperty) => {
        return (
          <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="text-xl font-bold mb-2">Name: {currentProperty.name}</p>
            {/* <p className="text-lg font-bold text-blue-600">Plan Name: {currentProperty.planName}</p> */}
          </div>

          <p className="text-lg font-bold mb-2">Images:</p>
          {/* <p className="text-lg font-bold mb-2">Lead Count: {currentProperty.leadCount}</p>
          <p className="text-lg font-bold mb-2 text-blue-600">Price: {currentProperty.price}</p> */}
        </div>
        )
      })}
          </div>
          }
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
