import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
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
import { HomeChip, homeChipsData } from "src/componets/Home/header";
import Tour from "src/componets/Home/Tour";
import { useFetch } from "src/lib/hooks/useFetch";
import { Propery, ProperyRes, ProperyResArr } from "src/@types";
import Layout from "src/Layout/main";
import { ReactElement, useEffect, useRef } from "react";
import { useState } from "react";
import CardCarousel from "src/componets/Sliders/cardCaursel";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import Slider from "src/componets/Home/Slider";

const images = [
  {
    images: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    images: "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  default: {
    breakpoint: { max: 3000, min: 0 },
    items: 2,
    paritialVisibilityGutter: 80,
  },
};

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
    "/property/getAllProperties"
  );
  const { data: featured } = useFetch<ProperyResArr>(
    "/property/getPropertiesByFeature"
  );
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
        const arr = data?.result?.filter((p) => {
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
      <section className=" py-10 px-10 w-full  mx-auto overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <HomeSectionTitle text="Getting Started" />
          <div className="md:flex space-y-4 md:space-y-0 md:space-x-8 py-10 overflow-x-scroll">
            <CatagoryCard text="Buying House" img="/v.png" />
            <CatagoryCard text="Lease Spaces" img="/v.png" />
            <CatagoryCard text="Pg & Co-living" img="/v.png" />
          </div>
        </div>
      </section>
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
                    Icon={Icon}
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

        <div>
          {Filtred?.length ? (
            <CardCarousel id="house" data={Filtred} Card={HouseCard} />
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
                onClick={() => scrollLeft("house")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("house")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          <div id="feat" className="flex overflow-scroll space-x-6 py-10">
            <CardCarousel
              id="feat"
              data={featured?.result}
              Card={MediumHouse}
            />
          </div>
        </div>
      </section>
      <Tour />
      <Stats />
      <Process />
      <TestiMonials />
      <section className="pb-16 px-5 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4] pt-12">
        <HomeSectionTitle text="Our Products" />
        <div className="relative space-x-4 pt-10 ">
          <Carousel
            ssr
            partialVisbile
            itemClass="image-item"
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            infinite={true}
            transitionDuration={4000}
          >
            {images?.map((image,i) => {
              return <Slider key={i} images={image.images} />;
            })}
          </Carousel>
        </div>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
