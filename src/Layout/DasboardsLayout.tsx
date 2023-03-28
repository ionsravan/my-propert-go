import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClose, AiOutlineLink, AiOutlineMenu } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { MyModal } from "src/componets/Sliders/ImageSlider";
import { useAppContext } from "src/Context/AppContext";
import AddPropertyForm from "src/pages/agent/addProperty";

interface Props {
  children: ReactNode;
  Navbar: React.ElementType;
}

const DashBoardLayout = ({ children, Navbar }: Props) => {
  const { showModal, setShowModal } = useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies(["jwtToken"]);
  const router = useRouter();

  useEffect(() => {
    if (cookies.jwtToken == undefined) {
      router.push(`${router.pathname}/login`);
    }
  }, [cookies.jwtToken, router.pathname]);

  return (
    <>
      <div className="flex h-screen overflow-x-hidden font-manrope bg-[#F6F6F6] overflow-y-scroll relative">
        <div className="justify-between hidden bg-white min-h-screen h-full pt-10 pr-4 md:flex flex-col w-full max-w-[300px] sticky top-0 ">
          <Navbar />
          <div className="p-3 py-6">
            <button
              onClick={() => {
                setShowModal(!showModal);
              }}
              className=" text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
            >
              <span>
                <TbEdit />
              </span>
              <span>Add New</span>
            </button>
          </div>
        </div>

        <div className="flex px-6 md:px-[50px] relative flex-col w-full overflow-scroll pt-10 h-screen">
          <div className=" w-full justify-end  md:hidden flex">
            <button
              className="text-2xl top-8 "
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
          {children}
        </div>
        <MyModal setIsOpen={setShowModal} isOpen={showModal}>
          <AddPropertyForm />
        </MyModal>
      </div>
      <div
        className={`justify-between absolute top-0 z-50 p-5 transition-all ease-in duration-200 ${
          open ? "-translate-x-8" : "-translate-x-full"
        }    bg-white min-h-screen h-full pt-10 pr-4 flex flex-col w-full max-w-[300px] p `}
      >
        <Navbar />
        <div className="p-3 py-6">
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
            className=" text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            <span>
              <TbEdit />
            </span>
            <span>Add New</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
