import { useRouter } from "next/router";
import Image from "next/image";
import { Footer, Header, HomeSectionTitle, HouseCard, OwnerCta, PopularCity, Process, Stats, TestiMonials } from "../../componets"
import { HomeChip, homeChipsData } from "../../componets/Home/header";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CardCarousel from "../../componets/Sliders/cardCaursel";
import MediumHouseCard from "../../componets/HousCard/MediumHomeCard";
import Tour from "../../componets/Home/Tour";
import Carousel from "react-multi-carousel";
import Slider from "../../componets/Home/Slider";
import Home, { scrollLeft, scrollRight } from "../index";
import { ReactElement, useEffect, useState } from "react";
import { location, Propery, ProperyResArr, response } from "../../@types";
import { useFetch } from "../../lib/hooks/useFetch";
import Layout from "../../Layout/main";
import Navbar from "../../componets/shared/Navbar";
import { FaHome } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


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

// export const scrollLeft = (id: string) => {
//     const ele = document.getElementById(id);
//     if (ele) {
//         ele.scrollLeft -= 310;
//     }
// };
// export const scrollRight = (id: string) => {
//     const ele = document.getElementById(id);
//     if (ele) {
//         ele.scrollLeft += 310;
//     }
// };

const CityPage = () => {

  const { data, error, status } = useFetch<ProperyResArr>(
    "/property/getAllProperties"
  );
  const { data: featured } = useFetch<ProperyResArr>(
    "/property/getPropertiesByFeature"
  );
  const { data: loc } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );


  const router = useRouter()
  const { city } = router.query




  const [Filtred, setFiltred] = useState<Propery[] | null>([]);
  const [trending, setTrending] = useState<Propery[] | null>([]);
  const [costFiltred, setCostFiltred] = useState<Propery[] | null>([]);
  const [featuredData, setFeaturedData] = useState<Propery[] | null>([]);
  const [toggleData, setToggleData] = useState<Propery[] | null>([]);
  const [propertyTypeFilter, setPropertyFilter] = useState<string>("all");
  const [featuredFiltred, setFeaturedFiltred] = useState<Propery[] | null>(null);



  useEffect(() => {
    console.log(data?.data, "result")
    if (data && data.data) {
      setFiltred(data.data)
    }
  }, [data]);


  // useEffect(() => {
  //     if (featured?.result) {
  //         setFeaturedData(featured?.result);
  //     }
  // }, [featured]);


  useEffect(() => {
    if (featured?.result) {
      const filteredData = featured.result.filter(
        (item) => item.location.name === city
      );
      setFeaturedData(filteredData);
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
      const filteredProperties = Filtred?.filter(property => property.cost < 500000 && property.location.name === city) ?? [];
      setCostFiltred(filteredProperties);

      const featuredProperties = Filtred?.filter(property => property.featured && property.location.name === city) ?? [];
      setFeaturedFiltred(featuredProperties);

      const toggleProperties = Filtred?.filter(property => property.toggle === "Project" && property.location.name === city) ?? [];
      setToggleData(toggleProperties);

      const trendingProperties = Filtred?.filter(property => property.location.name === city) ?? [];
      setTrending(() => trendingProperties);
    };

    filterProperties();
  }, [Filtred, city]);


  // useEffect(() => {
  //     console.log('costFiltred:', costFiltred);
  //     console.log('featuredFiltred:', featuredFiltred);
  //     console.log('toggleData:', toggleData);
  // }, [costFiltred]);
  useEffect(() => {
    console.log('trneding', trending);

  }, [Filtred]);


  const handleCardClick = () => {
    window.open('', '_blank');
  };


  return <>
    {/*<h1>{city}</h1>*/}

    <Navbar />
    <div style={{ backgroundImage: 'url("https://i.ibb.co/ZY28n97/Homepage-Background-Image.webp")' }} className="min-h-[70vh] bg-no-repeat bg-cover relative py-32 px-5 md:px-10">
      <div className="absolute bottom-0 right-0">
        <div className="h-96 relative w-80">
          {/* <Image
              style={{ border: "2px solid red" }}
              src={"/bars.png"}
              fill
              className="object-fill"
              alt="villa4"
            /> */}
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
    {/* <section className="pb-16 px-5 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4] pt-12">
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



    <section className="pt-16">
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
            className="flex overflow-hidden space-x-6"
          >
            <CardCarousel
              id="feat"
              data={trending}
              Card={MediumHouseCard}
            />
          </div>
        )}
      </div>
    </section>


    <section className="py-4">
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
            className="flex overflow-hidden space-x-6"
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
            className="flex overflow-hidden space-x-6"
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


    <section className="pb-16 px-5 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4]v py-4 ">
      <HomeSectionTitle text="Projects" />
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
          {toggleData ? (
            toggleData.map((property, i) => <Slider key={i} property={property} />)
          ) : (
            <p>Loading...</p>
          )}
        </Carousel>
      </div>
    </section>






    <section className="py-4">
      <p className="max-w-7xl mx-auto px-5 md:px-10 text-4xl font-bold font-manrope text-center py-4">
        Why Wonderplots?
      </p>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
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
          <p className="text-4xl font-bold font-manrope">Services from Wonderplots</p>
          {/* <p className="text-2xl font-semibold">Why Us?</p> */}
          {/* <div className="flex justify-center items-center">
            <FaHome className="text-4xl text-blue-500" />
          </div> */}
        </div>
        <div className="flex flex-wrap justify-center">
          {/* Card 1 */}
          <div onClick={handleCardClick} className="w-full sm:w-1/2 md:w-1/3 p-4 transform transition duration-300 hover:scale-105">
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
          <div onClick={handleCardClick} className="w-full sm:w-1/2 md:w-1/3 p-4 transform transition duration-300 hover:scale-105">
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
          <div onClick={handleCardClick} className="w-full sm:w-1/2 md:w-1/3 p-4 transform transition duration-300 hover:scale-105">
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col items-center justify-center p-6">
              <div className="text-4xl text-blue-500">
                {/* Icon here */}
                <FaHome />
              </div>
              <h3 className="text-xl font-semibold mt-4">
                Shipping Container Homes
              </h3>
              <p className="text-gray-600 mt-2 text-center">
                Experience unique, versatile living with sustainable shipping container homes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    {/* <h1>{loc?.[0].name}</h1> */}
    {/* <Tour /> */}
    {/* <Stats /> */}
    <Process />
    {/* <TestiMonials /> */}
    {/* <section className="pb-16 px-5 md:px-10 max-w-7xl mx-auto bg-[#F4F4F4] pt-12">
            <HomeSectionTitle text="Projects" />
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
                    {toggleData ? (
                        toggleData.map((property, i) => <Slider key={i} property={property} />)
                    ) : (
                        <p>Loading...</p>
                    )}
                </Carousel>
            </div>
        </section> */}
    {/* <OwnerCta/> */}
    <Footer />

  </>
};

export default CityPage;

// CityPage.getLayout = function getLayout(page: ReactElement) {
//     return <Layout>{page}</Layout>;
// };