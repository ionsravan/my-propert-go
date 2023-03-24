import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const NavItems = [
    {
      name: "Appartment",
      link: "/",
    },
    {
      name: "Corpers Trade",
      link: "/",
    },
    {
      name: "Help",
      link: "/",
    },
    {
      name: "Sing up",
      link: "/signup",
    },
  ];
  return (
    <nav className="flex-grow space-x-4 flex justify-end items-center text-sm">
      {NavItems.map(({ link, name }, index) => {
        return (
          <Link className="font-manrope font-medium " href={link} key={index}>
            {name}
          </Link>
        );
      })}
      <Link href={"/login"}>
        <button
          className={`${
            router?.pathname == "/"
              ? "bg-white text-primaryBlue"
              : "bg-primaryBlue text-white"
          } px-6 rounded-full py-2 font-manrope`}
        >
          Login
        </button>
      </Link>
    </nav>
  );
};

export const Navbar = () => {
  const router = useRouter();
  return (
    <header
      className={`flex justify-between ${
        router?.pathname == "/" ? "bg text-white" : ""
      } items-center px-6 py-5 ${
        router?.pathname == "/"
          ? " overflow-hidden "
          : "overflow-hidden sticky top-0 z-50"
      } `}
    >
      <div className="hidden md:block w-full">
        <Nav />
      </div>
      <div className="w-full md:hidden flex justify-end">
        <Link href={"/login"}>
          <button
            className={`${
              router?.pathname == "/"
                ? "bg-white text-primaryBlue"
                : "bg-primaryBlue text-white"
            } px-6 rounded-full py-2 font-manrope`}
          >
            Login
          </button>
        </Link>
      </div>
    </header>
  );
};
