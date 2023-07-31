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



const Notifications = () => {
  // const { data, status } = useFetch<response<Buyer[]>>(
  //   "/agent/property/buyers/getAllBuyers"
  // );
//   const [userId, setUserId] = useState<string | null>(null);
//   const { data, status } = useFetch<response<Buyer[]>>(
//     `/user/getLeadsByUserId/${userId}`
//   );

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   setUserId(storedUserId);
  // }, []);


  return (
    <>
      <div className="mb-6">
          <h1 className="text-[22px] font-bold text-black mb-5">Notifications</h1>

      <div className="space-y-5">
        
      </div>
      </div>
    </>
  );
};
Notifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout Navbar={AgentNavbar}>
      {page}
      {/* <BuyersPageLayout>{page}</BuyersPageLayout> */}
    </DashBoardLayout>
  );
};

export default Notifications;
