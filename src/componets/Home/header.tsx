import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { AiFillHome, AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineApartment, MdVilla } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { useFetch } from "src/lib/hooks/useFetch";
import { response, location } from "src/@types/index";
import Link from "next/link";
import { useAppContext } from "src/Context/AppContext";
import { Combobox, Transition } from "@headlessui/react";
import { IconType } from "react-icons";

function Search() {
  const [selected, setSelected] = useState<any>(null);
  const [query, setQuery] = useState("");
  const { location, setLocation } = useAppContext();
  const { data } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );

  useEffect(() => {
    if (data?.result) {
      setSelected(data?.result[0]);
    }
  }, [data]);

  const filteredPeople =
    query === ""
      ? data?.result
      : data?.result.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full max-w-xl">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 rounded-full  ">
          <div className="flex items-center  relative w-full cursor-default overflow-hidden rounded-full bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <div className="relative h-4 w-4 md:h-6 md:w-6 pl-10 ">
              <Image
                src={"/loc.svg"}
                fill
                alt="home"
                className="object-fill rounded-lg"
              />
            </div>
            <Combobox.Input
              value={query}
              placeholder="Search for the location you want"
              className="w-full border-none py-3 md:py-4 rounded-full pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none focus:outline-none"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="">
              <div className="rounded-full  md:min-w-[120px]  py-2  md:py-3 md:flex border justify-center items-center space-x-1 active:scale-95 transition transform duration-200 active:bg-green-700 cursor-pointer bg-green-500">
                <Link href={`/search/${location?._id}`}>
                  <div className="font-manrope text-sm md:text-lg text-white">
                    <span className="hidden md:block">search</span>
                    <span className="md:hidden block">
                      <AiOutlineSearch className="w-10" />
                    </span>
                  </div>
                </Link>
                <div className="hidden md:blo">
                  <SlArrowRight />
                </div>
              </div>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : filteredPeople ? (
                filteredPeople.map((loc) => (
                  <Combobox.Option
                    onClick={() => {
                      setQuery(loc.name);
                      setLocation(loc);
                    }}
                    key={loc._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primaryBlue text-white" : "text-gray-900"
                      }`
                    }
                    value={loc}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {loc.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <AiOutlineCheck
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <p className="p-2 text-lg">loading ...</p>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

interface ChipProps {
  Icon: React.ElementType;
  text: string;
  bg: string;
  textColor: string;
  isActive?: boolean;
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

type chipData = {
  name: string;
  value: string;
  Icon: IconType;
};

export const homeChipsData: chipData[] = [
  {
    name: "Home",
    value: "all",
    Icon: AiFillHome,
  },
  {
    name: "Villa",
    value: "villa",
    Icon: MdVilla,
  },
  {
    name: "Appartment",
    value: "appartment",
    Icon: MdOutlineApartment,
  },
];

const Header = () => {
  const { searchFilter, setsearcheFilter } = useAppContext();

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
        {homeChipsData.map(({ Icon, name, value }) => {
          return (
            <div
              key={name}
              onClick={() => {
                setsearcheFilter(value);
              }}
            >
              <HomeChip
                Icon={AiFillHome}
                text={name}
                textColor={
                  searchFilter == value ? "text-primaryBlue" : "text-white"
                }
                bg={searchFilter == value ? "bg-white" : "bg-transparent"}
              />
            </div>
          );
        })}
      </div>
      <Search />
    </div>
  );
};

export default Header;
