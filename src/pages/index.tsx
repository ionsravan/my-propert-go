import Image from "next/image";
import { AiFillHome, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { MdVilla, MdOutlineApartment, MdLocationCity } from "react-icons/md";
import imgs from "public.json";
import {
  CatagoryCard,
  Header,
  HomeSectionTitle,
  HouseCard,
  // MediumHomeCard,
  PopularCity,
  Process,
  Stats,
  TestiMonials,
} from "src/componets";
import { HomeChip, homeChipsData } from "src/componets/Home/header";
import MediumHouseCard from "src/componets/HousCard/MediumHomeCard";
import Tour from "src/componets/Home/Tour";
import { useFetch } from "src/lib/hooks/useFetch";
import { Propery, ProperyRes, ProperyResArr } from "src/@types";
import Layout from "src/Layout/main";
import { ReactElement, useEffect, useRef } from "react";
import { useState } from "react";
import CardCarousel from "src/componets/Sliders/cardCaursel";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { area, location, response } from "src/@types";

export const scrollLeft = (id: string) => {
  const ele = document.getElementById(id);
  if (ele) {
    ele.scrollLeft -= 310;
  }
};
export const scrollRight = (id: string) => {
  const ele = document.getElementById(id);
  if (ele) {
    ele.scrollLeft += 310;
  }
};





export default function Home() {
  const { data, error, status } = useFetch<ProperyResArr>(
    "property/getAllProperties"
  );
  const { data: featured } = useFetch<ProperyResArr>(
    "/property/getPropertiesByFeature"
  );
  const { data: loc } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );

  // {loc?.result.map((location) => {
  //   console.log("Location Name:", location.name); 
  // })}

  // if (loc && loc.result && loc.result.length > 0) {
  //   console.log(loc.result, "lllllllllllllllllll");
  // }



  console.log(featured, "featured");
  const [Filtred, setFiltred] = useState<Propery[] | null>([]);
  const [costFiltred, setCostFiltred] = useState<Propery[] | null>([]);
  const [featuredData, setFeaturedData] = useState<Propery[] | null>([]);
  const [toggleData, setToggleData] = useState<Propery[] | null>([]);
  const [propertyTypeFilter, setPropertyFilter] = useState<string>("all");
  const [featuredFiltred, setFeaturedFiltred] = useState<Propery[] | null>(null);



  useEffect(() => {
    console.log(data?.result, "result")
    if (data && data.result) {
      setFiltred(data.result)
    }
  }, [data]);


  useEffect(() => {
    if (featured?.result) {
      setFeaturedData(featured?.result);
    }
  }, [featured]);



  useEffect(() => {
    if (propertyTypeFilter == "all") {
      if (featured?.result) {
        setFiltred(featured?.result);
      }
    } else {
      setFiltred((prev) => {
        const arr = featured?.result?.filter((p) => {
          return p.propertyType == propertyTypeFilter;
        });
        return arr as Propery[];
      });
    }
  }, [propertyTypeFilter]);


  // Filter functions
  useEffect(() => {
    const filterProperties = () => {
      const filteredProperties = Filtred?.filter(property => property.cost < 500000) ?? [];
      setCostFiltred(filteredProperties);

      const featuredProperties = Filtred?.filter(property => property.featured) ?? [];
      setFeaturedFiltred(featuredProperties);

      const toggleProperties = Filtred?.filter(property => property.toggle === "project") ?? [];
      setToggleData(toggleProperties);
    };

    filterProperties();
  }, [Filtred]);


  useEffect(() => {
    console.log('costFiltred:', costFiltred);
    console.log('featuredFiltred:', featuredFiltred);
    console.log('toggleData:', toggleData);
  }, [costFiltred]);



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
      {/* <section className=" py-10 px-10 w-full  mx-auto overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <HomeSectionTitle text="Getting Started" />
          <div className="md:flex space-y-4 md:space-y-0 md:space-x-8 py-10 overflow-x-scroll">
            <CatagoryCard text="Buying House" img="/v.png" />
            <CatagoryCard text="Lease Spaces" img="/v.png" />
            <CatagoryCard text="Pg & Co-living" img="/v.png" />
          </div>
        </div>
      </section> */}
      <section className="pb-16 px-5 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4] pt-12">
        <HomeSectionTitle text="Featured House" />
        <div className="relative ">
          <div className="flex space-x-4 pt-10 items-center">
            {homeChipsData.map(({ name, value, Icon }) => {
              return (
                <div
                  key={name}
                  onClick={() => {
                    setPropertyFilter(value);
                  }}
                >
                  <HomeChip
                    bg={propertyTypeFilter == value ? "bg-green-500" : ""}
                    textColor={
                      propertyTypeFilter == value
                        ? "text-white"
                        : "text-[#888B97]"
                    }
                    Icon={AiFillHome}
                    text={name}
                  />
                </div>
              );
            })}
          </div>

          {/* buttons */}
          <div className="md:block hidden">
            <div className="absolute right-0 top-8 ">
              <button
                onClick={() => scrollLeft("house")}
                className="p-2 m-2 rounded-full bg-primaryBlue/50 text-white active:bg-primaryBlue hover:bg-primaryBlue"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("house")}
                className="p-2 m-2 rounded-full bg-primaryBlue/50 text-white active:bg-primaryBlue hover:bgpri"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div >
          {Filtred?.length ? (
            <CardCarousel id="house" data={featuredData} Card={HouseCard} />
          ) : (
            <p className="text-lg py-4">
              No Property Found with PropertyType {propertyTypeFilter}
            </p>
          )}
        </div>
      </section>
      <section className="bg-cityBg py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <HomeSectionTitle
            text="Explore Real State in Popular Indian Cities"
            color="text-white"
          />
          <div className="flex overflow-scroll space-x-6 scrollbar-hide py-10">
            {loc?.result.map((location) => (
              <PopularCity key={location._id} img={location?.locationImages[0]} name={location.name} />
            ))}

            {/* <PopularCity img={imgs["Rectangle 583(1)"]} />
            <PopularCity img={imgs["Rectangle 583(2)"]} />
            <PopularCity img={imgs["Rectangle 583(3)"]} />
            <PopularCity img={imgs["Rectangle 583(4)"]} />
            <PopularCity img={imgs["Rectangle 583(5)"]} /> */}
          </div>
        </div>
      </section>
      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Trending / Newly listed" />
            <div className="hidden md:flex space-x-4 ">
              <button
                onClick={() => scrollLeft("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          {data && (
            <div
              id="feat"
              className="flex overflow-hidden space-x-6 py-10"
            >
              <CardCarousel
                id="feat"
                data={Filtred}
                Card={MediumHouseCard}
              />
            </div>
          )}
        </div>
      </section>


      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Budget Properties for you" />
            <div className="hidden md:flex space-x-4 ">
              <button
                onClick={() => scrollLeft("cost")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("cost")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          {data && (
            <div
              id="cost"
              className="flex overflow-hidden space-x-6 py-10"
            >
              <CardCarousel
                id="cost"
                data={costFiltred}
                Card={MediumHouseCard}
              />
            </div>
          )}
        </div>
      </section>



      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Featured Properties" />
            <div className="hidden md:flex space-x-4 ">
              <button
                onClick={() => scrollLeft("featured")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("featured")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          {data && (
            <div
              id="featured"
              className="flex overflow-hidden space-x-6 py-10"
            >
              <CardCarousel
                id="featured"
                data={featuredFiltred}
                Card={MediumHouseCard}
              />
            </div>
          )}
        </div>
      </section>


      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Projects" />
            <div className="hidden md:flex space-x-4 ">
              <button
                onClick={() => scrollLeft("toggle")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("toggle")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          {data && (
            <div
              id="toggle"
              className="flex overflow-hidden space-x-6 py-10"
            >
              <CardCarousel
                id="toggle"
                data={toggleData}
                Card={MediumHouseCard}
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-2">
        <p className="max-w-7xl mx-auto px-5 md:px-10 text-xl">Why Wonderplots ?</p>
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <table className="border-collapse w-full ">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 font-bold">Connect+</th>
                <th className="py-2 px-4 border border-gray-300 font-bold">Reach more</th>
                <th className="py-2 px-4 border border-gray-300 font-bold">Lead Transfers</th>
                <th className="py-2 px-4 border border-gray-300 font-bold">Property Care</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  <ul className="list-disc list-inside decore">
                    <li>Get assigned by owners for agents</li>
                    <li>Connect with owners directly for your projects</li>
                  </ul>
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <ul className="list-disc list-inside">
                    <li>Be visible to buyers for &quot;x&quot; times more</li>
                    <li>Explore wide reach of properties in all categories</li>
                  </ul>
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <ul className="list-disc list-inside">
                    <li>Agents can transfer leads to other agents</li>
                    <li>Track the leads on your dashboard</li>
                  </ul>
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <ul className="list-disc list-inside">
                    <li>Secure your property now</li>
                    <li>Sell faster in the market</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>




      {/* <h1>{loc?.[0].name}</h1> */}
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

