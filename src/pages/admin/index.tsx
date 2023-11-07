import React, {
  ReactElement,
  useEffect,
  useState,
} from "react";
import {
  AiOutlineShopping,
} from "react-icons/ai";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useAxios } from "src/utills/axios";
import CustomLoader from "src/componets/shared/Loader";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { BiBuilding, BiSupport, BiUser } from "react-icons/bi";
import { toast } from "react-toastify";
import { ErrorDispaly } from "./property";

const Card = ({
  name,
  Value,
  Icon,
}: {
  name: string;
  Value: number;
  Icon: any;
}) => {
  return (
    <div className="bg-white w-full rounded-lg flex space-x-3 items-center px-[15px] py-5 max-w-[180px]">
      {Icon}

      <div>
        <p className="text-primaryBlue text-[19.05px] font-bold">{Value}</p>
        <p className="text-[#A3AED0] text-xs">{name}</p>
      </div>
    </div>
  );
};

const DashBoard = () => {
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["jwtToken"]);
  const [loading, setLoading] = useState<boolean>(false);

  // /admin/getCountOfAll

  useEffect(() => {
    if (cookies.jwtToken === undefined) {
      router.push(`/admin/login`)
    }
  }, [])

  const instance = useAxios();
  const [dashboardData, setDashboardData] = useState<any>({});

  async function getDashboardData() {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/getCountOfAll`);
      if (res.data) {
        setDashboardData(res?.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getDashboardData();
  }, []);



  
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
      router.push('/admin/login');
      toast.error("Please Login as a Admin");
    }
  }, []);
  
  if (loading) {
    return <CustomLoader />
  }

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div>
          <h1 className="text-[#707EAE] text-[10.94px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-[26px]">Dasboard</h2>
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card Icon={<BiUser />} name="Total Users" Value={dashboardData?.userCount || 0} />
        <Card Icon={<BiBuilding />} name="Property" Value={dashboardData?.propertyCount || 0} />
        <Card Icon={<AiOutlineShopping />} name="Orders" Value={dashboardData?.ordersCount || 0} />
        <Card Icon={<BiSupport />} name="Tickets" Value={dashboardData?.ticketCount || 0} />
      </div>
    </>
  );
};

DashBoard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default DashBoard;
