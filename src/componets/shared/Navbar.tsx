import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from 'next/image';

const Nav = () => {
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["jwtToken"]);
  const NavItems = [
    {
      name: "Development Sites",
      link: "/",
    },
    {
      name: "Pricing Plans",
      link: "/Pricing",
    },
    // {
    //   name: "Blogs",
    //   link: "/blogs",
    // },
    {
      name: "Trending Properties",
      link: "/",
    },
    {
      name: "Interior Designing",
      link: "/",
    },
    {
      name: "Post Property",
      link: "/addProperty",
    },
 
  ];


  const handleLogout = () => {
    setTimeout(() => {
      toast("Logout Succesfully", {
        position: "bottom-center",
        type: "success",
      });
      removeCookie("jwtToken");
      router.push("/")
    }, 1000);

  }
  return (
    <nav className="flex-grow md:space-x-6 flex flex-col md:flex-row md:justify-end md:items-center space-y-1 md:space-y-0">
      {NavItems.map(({ link, name }, index) => {
        return (
          <Link className="font-manrope font-medium " href={link} key={index}>
            {name}
          </Link>
        );
      })}
      {cookies?.jwtToken === undefined ? (
        <button
          onClick={() => router.push("/login")}
          style={{border:"2px solid black"}}
          className={`${router?.pathname == "/"
              ? "bg-white text-black"
              : "bg-white text-black"
            } px-6 rounded-full py-2 font-manrope`}
        >
          Login
        </button>
      ) : (
        <button
        
          onClick={() => router.push("/agent")}
          className={`${router?.pathname == "/"
              ? "bg-white text-black"
              : "bg-white text-black"
            } px-2 rounded-full py-2 font-manrope`}
        >
          <FaUserAlt />
        </button>
      )}
    </nav>
  );
};

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  // box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  return (
    <>
      <header
           style={{boxShadow:"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}}
           className={`flex justify-between overflow-hidden z-[1200] sticky  top-0 ${
            router?.pathname == "/"
              ? "bg-white text-black  "
              : "bg-white"
          } items-center px-6 py-5 ${
            router?.pathname == "/"
              ? "overflow-hidden " 
              : "shadow-md overflow-hidden "
          } `}
    // className={`flex justify-between relative overflow-hidden ${router?.pathname == "/" ? "bg-primaryBlue text-white sticky top-0" : "bg-white"
    //       } items-center px-6 py-5 ${router?.pathname == "/"
    //         ? " overflow-hidden sticky top-0 "
    //         : "shadow-md overflow-hidden sticky top-0 z-30"
    //       } `}
      >
        {/* <div style={{border:"2px solid red",width:"200px",height:"30px"}} onClick={() => router.push("/")} className="md:pl-6 pl-4 cursor-pointer ">
          <h1 className="text-2xl font-manrope font-extrabold">
            My Property Go
          </h1>
          <img style={{width:"100%",objectFit:"cover" }} src="https://i.ibb.co/w7z9Wn2/Artboard-1100.png" alt="" />
        </div> */}


        {/* <div style={{ width: "200px", height: "30px", position: "relative" }} onClick={() => router.push("/")} className="md:pl-6 pl-4 cursor-pointer">
          <img style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 1 }} src="https://i.ibb.co/w7z9Wn2/Artboard-1100.png" alt="" />
        </div> */}

<div style={{ width: "45px", height: "45px", position: "relative" }} onClick={() => router.push("/")} className="md:pl-6 pl-4 cursor-pointer">
  <Image
   style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 1 }} 
    src="/logoW2.png" // Replace with your logo file path in the public folder
    alt="Logo"
    width={45}
    height={45}

    // layout="fill" 
    // objectFit="cover"
    // priority 
  />
</div>

        <div className="md:block hidden   ">
          <Nav />
        </div>
        <button
          className="text-xl md:hidden block"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </header>
      {open ? (
        <div className="absolute top-20 z-50 bg-white w-full p-5 ">
          <Nav  />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
