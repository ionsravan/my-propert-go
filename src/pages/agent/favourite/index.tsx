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



const Favourites = () => {


  const instance = useAxios();
  const router = useRouter();
 
  const [favourites, setFavourites] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/user/getAllFavProperties");
        if (res?.data) {
          // setIsLoading(false)
          console.log(favourites,"fav")
        //   setFavourites(res.data)
          // console.log(res.data.myPlan,"sssss")

        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [])



  return <>
      <div className="mb-6">
          <h1 className="text-[22px] font-bold text-black mb-5">Favourite Properties</h1>
{/* 
          {myPlan !== undefined &&
            <div
            className="bg-white text-black rounded-lg shadow-lg p-6 mt-5 w-full sm:w-1/2"
            // ^-- Use full width on small screens, half width on larger screens
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between">
                <p className="text-xl font-bold mb-2">Name: {myPlan.userName}</p>
                <p className="text-lg font-bold text-blue-600">Plan Name: {myPlan.planName}</p>
              </div>

              <p className="text-lg font-bold mb-2">Email: {myPlan.userEmail}</p>
              <p className="text-lg font-bold mb-2">Lead Count: {myPlan.leadCount}</p>
              <p className="text-lg font-bold mb-2 text-blue-600">Price: {myPlan.price}</p>
            </div>
          </div>
          } */}

      </div>
    </>

};
Favourites.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout Navbar={AgentNavbar}>
      {page}
      {/* <BuyersPageLayout>{page}</BuyersPageLayout> */}
    </DashBoardLayout>
  );
};

export default Favourites;
