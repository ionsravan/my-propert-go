import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineApartment, MdVilla } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { useFetch } from "src/lib/hooks/useFetch";
import { response, location } from "src/@types/index";
import Link from "next/link";
import { useAppContext } from "src/Context/AppContext";

interface ChipProps {
  Icon: React.ElementType;
  text: string;
  bg: string;
  textColor: string;
}
export const HomeChip = ({ Icon, text, textColor, bg }: ChipProps) => {
  return (
    <div
      className={
        "rounded-full px-3 py-1 md:px-4 md:py-2 border  flex items-center space-x-2 active:scale-95 transition transform duration-200 -50 cursor-pointer " +
        (bg ? bg : " bg-transparent ")
      }
    >
      <Icon
        className={
          (textColor ? textColor : "text-primaryBlue") + " text-sm md:text-lg"
        }
      />
      <button className={textColor + " text-sm md:text-lg "}>{text}</button>
    </div>
  );
};

const Header = () => {
  const { location, setLocation } = useAppContext();
  const [show, setShow] = useState<boolean>(false);
  const [locId, setLocId] = useState<string | undefined>("");

  const { data: loc } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );
  const [results, setResults] = useState<location[] | null>(null);

  useEffect(() => {
    if (loc?.result.length == 0) return;
    if (loc?.result !== undefined) {
      setResults(loc?.result);
    }
  }, [loc?.result]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-1">
        <p className=" font-manrope text-white/70">PROPERTY</p>
        <div className="w-32 border-t border-white/60"></div>
      </div>
      <div className="max-w-4xl mb-4">
        <h1 className="text-[#A3C2FF] text-2xl md:text-6xl font-bold font-manrope">
          find the place to live your
        </h1>
        <h1 className="text-white font-manrope font-bold text-2xl md:text-6xl">
          dreams eaisly here
        </h1>
      </div>
      <div>
        <p className="text-xs md:text-lg max-w-2xl mb-8 font-medium text-white/60 font-manrope">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore non
          voluptatem nihil nisi impedit. Iure numquam qui explicabo dicta?
          Maiores?
        </p>
      </div>
      <div className="flex space-x-4 mb-8 ">
        <HomeChip
          Icon={AiFillHome}
          text="home"
          textColor="text-primaryBlue"
          bg="bg-white"
        />
        <HomeChip
          bg="bg-transparent"
          textColor="text-white"
          Icon={MdVilla}
          text="Villa"
        />
        <HomeChip
          bg="bg-transparent"
          textColor="text-white"
          Icon={MdOutlineApartment}
          text="Apartments"
        />
      </div>
      <div className="mt-2">
        <div className="flex md:px-1 items-center bg-white text-green-300 w-full md:max-w-xl  rounded-full ">
          <div className="relative h-4 w-4 md:h-6 md:w-6 pl-10 ">
            <Image
              src={"/loc.svg"}
              fill
              alt="home"
              className="object-fill rounded-lg"
            />
          </div>
          <input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (e.target.value.length > 0) {
                setShow(true);
                setResults((prev) => {
                  const filtred = loc?.result?.filter((str) => {
                    return str.name.includes(location);
                  });
                  if (filtred !== undefined) {
                    return filtred;
                  } else {
                    return null;
                  }
                });
              } else {
                setShow(false);
                if (loc?.result !== undefined) {
                  setResults(loc?.result);
                }
              }
            }}
            placeholder="search for the location you want"
            type="text"
            className="md:px-2 md:p-4 p-2 grow text-black text-xs md:text-lg rounded-full outline-none"
          />
          <div className="rounded-full min-w-[120px]  py-2  md:py-3 flex border justify-center items-center space-x-1 active:scale-95 transition transform duration-200 active:bg-green-700 cursor-pointer bg-green-500">
            <Link href={`/search/${locId}`}>
              <button className="font-manrope text-sm md:text-lg text-white">
                search
              </button>
            </Link>
            <div className="hidden md:blo">
              <SlArrowRight />
            </div>
          </div>
        </div>
        {show && (
          <div className="max-h-20 overflow-scroll w-full px-5 bg-white max-w-xs mx-10 my-2 rounded-sm">
            {results?.map((l) => {
              return (
                <p
                  key={l._id}
                  onClick={() => {
                    setLocation(l.name);
                    setLocId(l._id);
                  }}
                  className="py-3 hover:bg-white/30 cursor-pointer"
                >
                  {l.name}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
