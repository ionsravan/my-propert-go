
import {
  Header,
  HomeSectionTitle,
  HouseCard,
  Process,
} from "src/componets";
import { HomeChip, homeChipsData } from "src/componets/Home/header";
import MediumHouseCard from "src/componets/HousCard/MediumHomeCard";
import { useFetch } from "src/lib/hooks/useFetch";
import { Propery, ProperyResArr, response } from "src/@types";
import Layout from "src/Layout/main";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import CardCarousel from "src/componets/Sliders/cardCaursel";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import Slider from "src/componets/Home/Slider";
import { FaHome } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useRouter } from "next/router";
import { useAxios } from "src/utills/axios";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 3,
    paritialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 672 },
    items: 2,
    paritialVisibilityGutter: 15,
  },
  mobile: {
    breakpoint: { max: 672, min: 420 },
    items: 1,
    paritialVisibilityGutter: 10,
  },
  smallMobile: {
    breakpoint: { max: 420, min: 0 },
    items: 1,
    paritialVisibilityGutter: 0,
  },
  // default: {
  //   breakpoint: { max: 3000, min: 0 },
  //   items: 2,
  //   paritialVisibilityGutter: 80,
  // },
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
  const router = useRouter();
  const instance = useAxios();
  const [data, setData] = useState([])

  // const { data, error, status } = useFetch<ProperyResArr>(
  //   "/property/getAllProperties"
  // );




useEffect(() => {

 
  async function searchAllProperty() {
    try {
      const modifiedData = {
        maxPrice: 200000000000000000
    
      }
      const data = await instance.post(
        "/property/getPropertiesByAllFilters",
        modifiedData
      );
      if (data.data) {
        console.log(data.data,"dattttttt")
  
        setData(data.data.result)
        setFiltred(data.data.result)
      }
    } catch (e) {
      // setLoading(false);
      // ErrorDispal(e);
      console.log(e)
    }
  }

  searchAllProperty()
}, [])




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



  // useEffect(() => {
  //   console.log(data?.data, "result")
  //   if (data && data.data) {
  //     setFiltred(data.data)
  //   }
  // }, [data]);


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

      const toggleProperties = Filtred?.filter(property => property.toggle === "Project") ?? [];
      setToggleData(toggleProperties);
    };

    filterProperties();
  }, [Filtred]);


  if (toggleData) {
    console.log(toggleData, "toggle")
  }

  useEffect(() => {
    console.log('costFiltred:', costFiltred);
    console.log('featuredFiltred:', featuredFiltred);
    console.log('toggleData:', toggleData);
  }, [Filtred]);


  // const handleCardClick = () => {
  //   rout
  // };

  return (
    <>
      <div style={{ backgroundImage: 'url("https://i.ibb.co/ZY28n97/Homepage-Background-Image.webp")', margin: "40px 40px", borderRadius: "20px" }} className="min-h-[70vh] bg-no-repeat bg-cover relative py-32 px-5 md:px-10">
        <div className="absolute bottom-0 right-0">
          <div className="h-96 relative w-80">
     
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
      <section className="pb-16 px-5 md:px-10  bg-[#F4F4F4] pt-12 w-full">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <HomeSectionTitle text="Featured House" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-10">
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

        <div className="max-w-7xl mx-auto px-5 md:px-10" >
          {Filtred?.length ? (
            <CardCarousel id="house" data={featuredData} Card={HouseCard} />
          ) : (
            <p className="text-lg py-4">
              No Property Found with PropertyType {propertyTypeFilter}
            </p>
          )}
        </div>
      </section>
      {/* <section className="bg-cityBg py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <HomeSectionTitle
            text="Explore Properties in Popular Indian Cities"
            color="text-white"
          />
          <div className="flex overflow-scroll space-x-6 scrollbar-hide py-10">
            {loc?.result.map((location) => (
              <PopularCity key={location._id} img={location?.locationImages[0]} name={location.name} />
            ))}

          
          </div>
        </div>
      </section> */}


      <section className="pt-16">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Trending / Newly listed" />
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0">
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
            <div id="feat" className="flex overflow-x-scroll space-x-6 overflow-y-hidden scrollbar-hide">
              <CardCarousel id="feat" data={Filtred} Card={MediumHouseCard} />
            </div>
          )}
        </div>
      </section>



      <section className="py-4">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">

            <HomeSectionTitle text="Budget Properties for you" />
            <div className="flex space-x-4 mt-2 md:mt-0">
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
              className="flex overflow-x-scroll space-x-6 overflow-y-hidden scrollbar-hide"
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



      <section className="py-4">
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
              className="flex overflow-x-scroll space-x-6 overflow-y-hidden scrollbar-hide"
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


      {/*<section className=" py-16">*/}
      {/*  <div className="max-w-7xl mx-auto px-5 md:px-10 ">*/}
      {/*    <div className="w-full flex items-center justify-between">*/}
      {/*      <HomeSectionTitle text="Projects" />*/}
      {/*      <div className="hidden md:flex space-x-4 ">*/}
      {/*        <button*/}
      {/*          onClick={() => scrollLeft("toggle")}*/}
      {/*          className="p-2 m-2 rounded-full bg-white"*/}
      {/*        >*/}
      {/*          <FiChevronLeft />*/}
      {/*        </button>*/}
      {/*        <button*/}
      {/*          onClick={() => scrollRight("toggle")}*/}
      {/*          className="p-2 m-2 rounded-full bg-white"*/}
      {/*        >*/}
      {/*          <FiChevronRight />*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    {data && (*/}
      {/*      <div*/}
      {/*        id="toggle"*/}
      {/*        className="flex overflow-hidden space-x-6 py-10"*/}
      {/*      >*/}
      {/*        <CardCarousel*/}
      {/*          id="toggle"*/}
      {/*          data={toggleData}*/}
      {/*          Card={MediumHouseCard}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className="pb-16 px-2 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4]v py-4 ">
        <HomeSectionTitle text="Projects" />
        <div className="relative pt-10   ">
          <Carousel
            ssr
            // partialVisbile
            itemClass="image-item"
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            infinite={true}
            transitionDuration={4000}
          >
            {toggleData ? (
              toggleData.map((property, i) => <Slider key={i} property={property} />)
            ) : (
              <p>Loading...</p>
            )}
          </Carousel>
        </div>
      </section>





      {/*<section className="pb-16 px-5 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4] pt-12">*/}
      {/*  <HomeSectionTitle text="Our Products" />*/}
      {/*  <div className="relative space-x-4 pt-10 ">*/}
      {/*    <Carousel*/}
      {/*        ssr*/}
      {/*        partialVisbile*/}
      {/*        itemClass="image-item"*/}
      {/*        responsive={responsive}*/}
      {/*        autoPlay={true}*/}
      {/*        swipeable={true}*/}
      {/*        draggable={true}*/}
      {/*        infinite={true}*/}
      {/*        transitionDuration={4000}*/}
      {/*    >*/}
      {/*      {costFiltred ? (*/}
      {/*          costFiltred.map((property, i) => <Slider key={i} property={property} />)*/}
      {/*      ) : (*/}
      {/*          <p>Loading...</p>*/}
      {/*      )}*/}
      {/*    </Carousel>*/}
      {/*  </div>*/}
      {/*</section>*/}









      <section className="py-4">
        <h1 className="max-w-7xl mx-auto px-5 md:px-10 text-4xl font-bold text-center py-4">
          Why Wonderplots?
        </h1>
        <div className="max-w-7xl mx-auto px-5 md:px-10 font-sans">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold w-1/4 max-w-64 overflow-hidden">Connect+</TableCell>
                  <TableCell className="font-bold w-1/4 max-w-64 overflow-hidden">Reach more</TableCell>
                  <TableCell className="font-bold w-1/4 max-w-64 overflow-hidden">Lead Transfers</TableCell>
                  <TableCell className="font-bold w-1/4 max-w-64 overflow-hidden">Property Care</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <ul className="list-disc">
                      <li>Get assigned by owners for agents</li>
                      <li>Connect with owners directly for your projects</li>
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc">
                      <li>Be visible to buyers for "x" times more</li>
                      <li>Explore wide reach of properties in all categories</li>
                    </ul>
                  </TableCell>
                  <TableCell style={{ paddingBottom: "35px" }}>
                    <ul className="list-disc">
                      <li>Agents can transfer leads to other agents</li>
                      <li>Track the leads on your dashboard</li>
                    </ul>
                  </TableCell>
                  <TableCell style={{ paddingBottom: "35px" }}>
                    <ul className="list-disc">
                      <li>Secure your property now</li>
                      <li>Sell faster in the market</li>
                    </ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>




      <section className="py-4">
        <div className="container mx-auto py-12">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold ">Services from Wonderplots</h1>
            {/* <p className="text-2xl font-semibold">Why Us?</p> */}
            {/* <div className="flex justify-center items-center">
            <FaHome className="text-4xl text-blue-500" />
          </div> */}
          </div>
          <div className="flex flex-wrap justify-center">
            {/* Card 1 */}
            <div onClick={() => router.push("/services/interiorDesigning")} className="w-full sm:w-1/2 md:w-1/3 p-4 transform transition duration-300 hover:scale-105">
              <div className="bg-white rounded-lg shadow-md h-full flex flex-col items-center justify-center p-6">
                <div className="text-4xl text-blue-500">
                  {/* Icon here (You can use an icon library or an SVG) */}
                  <FaHome />
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  Interior Designing
                </h3>
                <p className="text-gray-600 mt-2 text-center">
                  Transform your space. Create beautiful, functional interiors.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div onClick={() => router.push("/services/propertyCare")} className="w-full sm:w-1/2 md:w-1/3 p-4 transform transition duration-300 hover:scale-105">
              <div className="bg-white rounded-lg shadow-md h-full flex flex-col items-center justify-center p-6">
                <div className="text-4xl text-blue-500">
                  {/* Icon here */}
                  <FaHome />
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  Property Care
                </h3>
                <p className="text-gray-600 mt-2 text-center">
                  Experience hassle-free property ownership with our essential management services - a must for every property owner.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div onClick={() => router.push("/services/earnWithUs")} className="w-full sm:w-1/2 md:w-1/3 p-4 transform transition duration-300 hover:scale-105">
              <div className="bg-white rounded-lg shadow-md h-full flex flex-col items-center justify-center p-6">
                <div className="text-4xl text-blue-500">
                  {/* Icon here */}
                  <FaHome />
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  Earn With Us
                </h3>
                <p className="text-gray-600 mt-2 text-center">
                Where Earning Meets Excellence: Join Our Team Today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* <Tour /> */}
      {/* <Stats /> */}
      <Process />
      {/* <TestiMonials /> */}


      {/*<section style={{border:"2px solid red"}} className="pb-16 px-5 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4] pt-12">*/}
      {/*  <HomeSectionTitle text="Our Products" />*/}
      {/*  <div className="relative space-x-4 pt-10 ">*/}
      {/*    <Carousel*/}
      {/*      ssr*/}
      {/*      partialVisbile*/}
      {/*      itemClass="image-item"*/}
      {/*      responsive={responsive}*/}
      {/*      autoPlay={true}*/}
      {/*      swipeable={true}*/}
      {/*      draggable={true}*/}
      {/*      infinite={true}*/}
      {/*      transitionDuration={4000}*/}
      {/*    >*/}
      {/*      {images?.map((image,i) => {*/}
      {/*        return <Slider key={i} images={image.images} />;*/}
      {/*      })}*/}
      {/*    </Carousel>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

