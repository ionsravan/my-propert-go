import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { MdArrowBack } from "react-icons/md";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import AdminsideNav from "../../../componets/user/adminDasboardnav";

import AddEditCustomer from "../../../componets/user/AddEditCustomer";

const AddOrders = () => {
  const router = useRouter();
  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h2 className="text-TitleColor font-bold text-3xl">Add Orders</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full">
          <button
            onClick={() => router.push("/user/customers")}
            className=" text-black font-medium justify-center w-full bg-white rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            <span>
              <MdArrowBack className="w-5 h-6" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <AddEditCustomer type="add" />
    </div>
  );
};

AddOrders.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default AddOrders;