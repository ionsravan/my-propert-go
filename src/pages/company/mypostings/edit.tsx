import { ReactElement } from "react";
import SideNav from "src/componets/company/companyNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { PostingCard } from ".";

interface InputProps {
  name?: string;
  placholder?: string;
  value?: string;
}
const Input = ({ placholder }: InputProps) => {
  return (
    <input
      placeholder={placholder}
      className="bg-white placeholder:text-[#657795] text-sm w-full outline-none focus:outline-none rounded-xl px-7 py-4 mb-4"
      type="text"
    />
  );
};

const Edit = () => {
  return (
    <>
      <div className="flex justify-between mb-8 ">
        <h1 className="text-black font-bold text-[22px]">Edit Property</h1>
        <button className=" max-w-[120px] text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200  ">
          Submit
        </button>
      </div>
      <PostingCard />
      <div
        className={
          "mt-11 flex space-x-6 text-[#0066FF] font-semibold text-lg  "
        }
      >
        <p className="border-b py-3 border-[#0066FF]">Step 1: Genreral Info</p>
      </div>
      <div className="mt-9">
        <Input placholder="Property Name" />
        <Input placholder="Company Name" />
        <Input placholder="Cost" />
        <Input placholder="Benifits" />
        <textarea
          placeholder="Description"
          className="h-[300px] px-7 py-4  placeholder:text-[#657795] text-sm bg-white outline-none focus:outline-none w-full"
        ></textarea>
      </div>
    </>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={SideNav}>{page}</DashBoardLayout>;
};
