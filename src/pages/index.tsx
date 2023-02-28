import Image from "next/image";
import { AiFillHome, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { MdVilla, MdOutlineApartment, MdLocationCity } from "react-icons/md";
import imgs from "public.json";
import {
  CatagoryCard,
  Header,
  HomeSectionTitle,
  HouseCard,
  MediumHouse,
  PopularCity,
  Process,
  Stats,
  TestiMonials,
} from "src/componets";
import { HomeChip } from "src/componets/Home/header";
import Tour from "src/componets/Home/Tour";
import { useFetch } from "src/lib/hooks/useFetch";
import { Propery, ProperyRes, ProperyResArr } from "src/@types";
import Layout from "src/Layout/main";
import { ReactElement, useEffect, useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import Carousel from "src/componets/shared/carusal";
import CardCarousel from "src/componets/Sliders/cardCaursel";
import { useAppContext } from "src/Context/AppContext";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default function Home() {
  const { data, error, status } = useFetch<ProperyResArr>(
    "property/getAllProperties"
  );
  const { data: featured } = useFetch<ProperyResArr>(
    "/property/getPropertiesByFeature"
  );
  console.log(data);
  const ref = useRef<HTMLDivElement>(null);
  const [Filtred, setFiltred] = useState<Propery[] | null>([]);
  const [propertyTypeFilter, setPropertyFilter] = useState<string>("all");

  useEffect(() => {
    if (data?.result) {
      setFiltred(data?.result);
    }
  }, [data]);

  useEffect(() => {
    if (propertyTypeFilter == "all") {
      if (data?.result) {
        setFiltred(data?.result);
      }
    } else {
      setFiltred((prev) => {
        const data = prev;
        const arr = data?.filter((p) => {
          return p.propertyType == propertyTypeFilter;
        });
        return arr as Propery[];
      });
    }
  }, [propertyTypeFilter]);

  return (
    <>
      <div className="min-h-[70vh] bg relative py-32 px-5 md:px-10">
        <div className="absolute bottom-0 right-0">
          <div className="h-96 relative w-80 ">
            <Image
              src={"/bars.png"}
              fill
              className="object-fill "
              alt="villa4"
            />
          </div>
        </div>
        <Header />
      </div>
      <section className=" py-10 px-10 w-full max-w-7xl mx-auto overflow-hidden">
        <HomeSectionTitle text="Getting Started" />
        <div className="md:flex space-y-4 md:space-y-0 md:space-x-8 py-10 overflow-x-scroll">
          <CatagoryCard text="Buying House" img="/v.png" />
          <CatagoryCard text="Lease Spaces" img="/v.png" />
          <CatagoryCard text="Pg & Co-living" img="/v.png" />
        </div>
      </section>
      <section className="pb-16 px-5 md:px-10 max-w-7xl mx-auto">
        <HomeSectionTitle text="Featured House" />
        <div>
          <div className="flex space-x-4 pt-10">
            <div
              onClick={() => {
                setPropertyFilter("all");
              }}
            >
              <HomeChip
                bg={propertyTypeFilter == "all" ? "bg-green-500" : ""}
                textColor={
                  propertyTypeFilter == "all" ? "text-white" : "text-[#888B97]"
                }
                Icon={AiFillHome}
                text="House"
              />
            </div>
            <div
              onClick={() => {
                setPropertyFilter("villa");
              }}
            >
              <HomeChip
                bg={propertyTypeFilter == "villa" ? "bg-green-500" : ""}
                textColor={
                  propertyTypeFilter == "villa"
                    ? "text-white"
                    : "text-[#888B97]"
                }
                Icon={MdVilla}
                text="Villa"
              />
            </div>
            <div
              onClick={() => {
                setPropertyFilter("appartment");
              }}
            >
              <HomeChip
                bg={propertyTypeFilter == "appartment" ? "bg-green-500" : ""}
                textColor={
                  propertyTypeFilter == "appartment"
                    ? "text-white"
                    : "text-[#888B97]"
                }
                Icon={MdOutlineApartment}
                text="Appartment"
              />
            </div>
          </div>
          {/* buttons */}
          <div></div>
        </div>

        <div>
          {Filtred?.length ? (
            <CardCarousel data={Filtred} Card={HouseCard} />
          ) : (
            <p className="text-lg py-4">
              No Property Found with PropertyType {propertyTypeFilter}
            </p>
          )}
        </div>
      </section>

      {/* cittes */}

      <section className="bg-cityBg py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <HomeSectionTitle
            text="Explore Real State in Popular Indian Cities"
            color="text-white"
          />
          <div className="flex overflow-scroll space-x-6 scrollbar-hide py-10">
            <PopularCity img={imgs["Rectangle 583(1)"]} />
            <PopularCity img={imgs["Rectangle 583(2)"]} />
            <PopularCity img={imgs["Rectangle 583(3)"]} />
            <PopularCity img={imgs["Rectangle 583(4)"]} />
            <PopularCity img={imgs["Rectangle 583(5)"]} />
          </div>
        </div>
      </section>
      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Featured House" />
            <div className="hidden md:flex space-x-4 ">
              <button
                onClick={() => {
                  if (ref.current) {
                    ref.current.scrollLeft = ref.current.scrollLeft + 400;
                  }
                }}
                className=" border  h-[40px] text-center flex justify-center items-center min-w-[40px]  bg-primaryBlue bg-opacity-50 active:bg-opacity-100 rounded-full  text-white   shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  "
              >
                <SlArrowLeft />
              </button>
              <button
                onClick={() => {
                  if (ref.current) {
                    ref.current.scrollLeft = ref.current.scrollLeft - 400;
                  }
                }}
                className=" border top-1/2 h-[40px] text-center flex justify-center items-center min-w-[40px]  bg-primaryBlue bg-opacity-50 active:bg-opacity-100 rounded-full  text-white   shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  "
              >
                <SlArrowRight />
              </button>
            </div>
          </div>
          <div ref={ref} className="flex overflow-scroll space-x-6 py-10">
            {featured?.result &&
              featured?.result.map((property) => {
                return (
                  <>
                    <MediumHouse {...property} key={property._id} />
                  </>
                );
              })}
          </div>
        </div>
      </section>
      <Tour />
      <Stats />
      <Process />
      <TestiMonials />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
