import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { toast } from "react-toastify";

const Nav = () => {
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["jwtToken"]);
  const NavItems = [
    {
      name: "Development Sites",
      link: "/",
    },
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
    {
      name: "Sign up",
      link: "/signup",
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
    <nav className="flex-grow md:space-x-6 flex flex-col md:flex-row md:justify-end md:items-center space-y-3 md:space-y-0">
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
          className={`${
            router?.pathname == "/"
              ? "bg-white text-primaryBlue"
              : "bg-primaryBlue text-white"
          } px-6 rounded-full py-2 font-manrope`}
        >
          Login
        </button>
      ) : (
        <button
        onClick={handleLogout}
          className={`${
            router?.pathname == "/"
              ? "bg-white text-primaryBlue"
              : "bg-primaryBlue text-white"
          } px-6 rounded-full py-2 font-manrope`}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <header
        className={`flex justify-between relative overflow-hidden ${
          router?.pathname == "/" ? "bg text-white" : "bg-white"
        } items-center px-6 py-5 ${
          router?.pathname == "/"
            ? " overflow-hidden "
            : "shadow-md overflow-hidden sticky top-0 z-30"
        } `}
      >
        <div className="md:pl-6 pl-4">
          <h1 className="text-2xl font-manrope font-extrabold">
            My Property Go
          </h1>
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
          <Nav />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
