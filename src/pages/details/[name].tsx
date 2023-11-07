import { GrLocation, GrStar } from "react-icons/gr";
import { FaRegBookmark, FaRupeeSign } from "react-icons/fa";
import { GiLift, GiHandTruck } from "react-icons/gi";
// import {HiMiniBuildingOffice2 } from "react-icons/hi";
// import {BiSolidParking } from "react-icons/bi";
import { MdBathroom } from "react-icons/md";
// import {BsBuildingFillExclamation } from "react-icons/bs";
import { FaParking, FaBed, FaBath, FaCar, FaBuilding, FaUser, FaKey, FaHome, FaRuler, FaArrowAltCircleUp } from "react-icons/fa";
import { useEffect } from "react";
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
import Image from "next/image";
import { LoadImage } from "../../componets/shared/img";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RxDotFilled } from "react-icons/rx";
import React, { Fragment, ReactElement, useRef, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import Layout from "src/Layout/main";
import { useFetch } from "src/lib/hooks/useFetch";
import { useRouter } from "next/router";
import type { Propery, ProperyRes, ProperyResArr } from "src/@types";
import { useAxios } from "src/utills/axios";
import { Agent } from "src/componets/successToast";
import { useCookies } from "react-cookie";
import Link from "next/link";
import ImageSlider, { MyModal } from "src/componets/Sliders/ImageSlider";
import CardCarousel from "src/componets/Sliders/cardCaursel";
import { scrollLeft, scrollRight } from "..";
import { AiOutlineCloseCircle, AiOutlineShareAlt } from "react-icons/ai";
import { Transition, Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { AnyMxRecord } from "dns";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MediumHouseCard from "src/componets/HousCard/MediumHomeCard";
import axios from "axios";
import CustomLoader from "src/componets/shared/Loader";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { availableAmenities } from "src/@global/Data";
import PropertyCost from "src/componets/costFormat/PropertyCost";
import slugify from 'slugify';
import { ErrorDispaly } from "../admin/property";
// import { GiLift } from "react-icons/gi";
const reviewData = [
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
];

function MyMsg({
  data,
  text,
  onApiCall,
}: {
  data: any;
  text: string;
  onApiCall: () => void;
}) {
  let [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const instance = useAxios();
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(text);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" flex items-center justify-center w-full">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md b px-4 py-2 text-sm font-medium w-full text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {buttonText}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-36 inset-0 overflow-y-auto ">
            <div className="flex justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-white font-bold bg-primaryBlue p-4"
                  >
                    Talk To The Agent
                  </Dialog.Title>
                  <div className="mt-2 px-4">
                    <h1 className="text-black ">Message(Optional)</h1>
                    <textarea
                      id="description"
                      name="desccription"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required={true}
                      placeholder="writte your message"
                      className="focus:outline-none  w-full h-52 px-3 mt-5 py-2 border  my-4"
                    />
                  </div>

                  <div className="mt-4 p-4 w-full flex justify-end">
                    <div
                      className={
                        "cursor-pointer inline-flex justify-center rounded-md border border-transparent px-6 py-2 text-sm font-medium bg-primaryBlue text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" +
                        (loading ? " bg-opacity-50 " : "")
                      }
                      onClick={async () => {
                        try {
                          setLoading(true);
                          const res = await instance.post(
                            "/user/property/contactAgent",
                            {
                              propertyId: data?.result?._id,
                              message: message,
                              propertyType: data?.result?.propertyType,
                            }
                          );
                          if (res.data) {
                            toast("great", {
                              position: "bottom-center",
                              type: "success",
                            });
                            setLoading(false);
                            onApiCall();
                            setMessage("");
                            setButtonText("Already Contacted");
                            closeModal();
                          }
                        } catch (e) {
                          setLoading(false);
                          ErrorDispaly(e);
                        }
                      }}
                    >
                      {loading ? "Sending Message.." : "Send Message"}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div>
                <button>
                  <AiOutlineCloseCircle className="text-2xl text-white mx-2" />
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const ReviewCard = ({ text }: { text: string }) => {
  return (
    <div className="border py-8 px-3 min-w-[400px] space-y-4">
      <div className="flex space-x-4">
        <div className="h-16 w-16 relative rounded-full">
          <Image
            src={"/agent.png"}
            fill
            className="object-fill rounded-full"
            alt="villa4"
          />
        </div>
        <div className="grow flex justify-between items-center">
          <div>
            <p className="text-TitleColor text-xl">Dinne Russel</p>
            <p className="text-sm text-locColor">Menchestor Kenteky</p>
          </div>
          <p className="text-xs text-locColor">1 wk ago</p>
        </div>
      </div>
      <div>
        <p className="font-manrope1 text-sm">{text}</p>
      </div>
    </div>
  );
};

const SpecificationItem = ({ Icon, text, tagName }) => {
  return (
    <div style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "start", margin: "10px 0" }}>
      <div style={{ width: "200px", display: "flex", alignItems: "center", justifyContent: "start" }}>
        <Icon />
        <p style={{ margin: "0", marginLeft: "10px" }}>{tagName}:</p>
      </div>
      <p style={{ margin: "0", marginLeft: "40px" }}>{text}</p>
    </div>
  );
};


// const { slug } = router.query;
// // const slug = router.query["name"];


// export function getIDFromSlug(slug) {
//   const id = slug.substring(0, slug.indexOf('-'));
//   return id;
// }

export function getIDFromSlug(slug) {
  if (!slug || typeof slug !== 'string' || !slug.includes('-')) {
    return null; // Handle invalid slug format
  }

  const id = slug.substring(0, slug.indexOf('-'));
  return id;
}


const Details = () => {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useAxios();
  const router = useRouter();
  const slug = router.query["name"];

  // const id = router.query["name"];
  const [cookies, setCookes] = useCookies(["jwtToken"]);
  // const [data, setData] = useState([])





  const id = getIDFromSlug(slug);

  // const _id = slug ? extractIdFromSlug(slug) : null;


  //   async function getPropertyDetailsById() {
  //     try {
  //         const res = await instance.get(
  //             `/property/getPropertyById/${_id}`
  //         );
  //         if (res.data) {
  //           setData(res.data)
  //         }
  //     } catch (e) {
  //         console.log(e);
  //     }
  // }

  // useEffect(() => {

  //   const { data, error, status } = useFetch<ProperyRes>(
  //     `property/getPropertyById/${_id}`
  //   );
  // }, [_id]);


  // Function to extract id from the slug
  // function extractIdFromSlug(slug) {
  //   console.log(slug,"Slug:")
  //   const parts = slug.split('-');
  //   const id = parts[parts.length - 1];
  //   console.log("Extracted id:", id); // Print the extracted id
  //   return id;
  // }


  const { data, error, status } = useFetch<ProperyRes>(
    `property/getPropertyById/${id}`
  );

  // const { data, error, status } = useFetch<ProperyRes>(
  //   `property/getPropertyById/64c4bc373519d76ccc3e5ae8`
  // );

  // const { data, error, status } = _id ? useFetch<ProperyRes>(`property/getPropertyById/${_id}`) : {};



  const [isOpen, setIsOpen] = useState<boolean>(false);
  // console.log(data);

  const [buttonColor, setButtonColor] = useState(false);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [center, setCenter] = useState({});
  const [similarData, setSimilarData] = useState<Propery[] | null>([]);

  const { data: newData } = useFetch<ProperyResArr>(
    "property/getAllProperties"
  );








  useEffect(() => {
    if (newData?.data) {
      setSimilarData(newData?.data);
    }
  }, [newData]);

  if (data?.result) {
    console.log(data.result, "data");
  }

  if (newData?.result) {
    console.log(similarData, "sim");
  }

  // Google Map Api

  var apiKey = "AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) {
    return <h1> Loading...</h1>;
  }

  if (data?.result) {
    console.log(data?.result.amenities, "amenities");
  }

  if (status === "FETCHING") {
    return <CustomLoader />;
  }

  const fetchCoordinates = async (cityName: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: cityName,
            key: apiKey,
          },
        }
      );

      if (response.status === 200) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
      } else {
        console.error("Geocoding request failed.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  if (data?.result?.address) {
    fetchCoordinates(data.result.address);
  }

  if (lat) {
    console.log(lat, lng, "lat/lng");
  }

  const handleApiCall = () => {
    setButtonColor(true);
  };

  const handleShareClick = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('URL copied to clipboard');
    }).catch((error) => {
      toast.error('Failed to copy URL');
    });
  };

  const handleFavourite = async () => {
    try {
      if (cookies.jwtToken) {
        // const propertyId = data?.result?.agentId?.leads[0]?.propertyId;
        // const propertyId = data?.result?.agentId?._id;


        if (id) {
          console.log(id, "iddddd")
          const requestData = { propertyId: id };

          const res = await instance.post("/user/addInFavourite", requestData);

          if (res.data) {
            toast.success("Property added in Favourite");
          }
        }
      } else {
        toast("Please login in order to save");
        router.push("/login");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  // try {
  //   setLoading(true);
  //   const res = await instance.post(
  //     "/user/property/contactAgent",
  //     {
  //       propertyId: data?.result?._id,
  //       message: message,
  //       propertyType: data?.result?.propertyType,
  //     }
  //   );
  //   if (res.data) {
  //     toast("great", {
  //       position: "bottom-center",
  //       type: "success",
  //     });
  //     setLoading(false);
  //     onApiCall();
  //     setMessage("");
  //     setButtonText("Already Contacted");
  //     closeModal();
  //   }
  // }



  const handleAgentContact = async () => {
    try {
      if (cookies.jwtToken) {
        const resContactAgent = await instance.post(
          "/user/property/contactAgent",
          {
            propertyId: data?.result?._id,
            message: "",
            propertyType: data?.result?.propertyType,
          }
        );

        if (resContactAgent.data) {
          toast.success("The owner will get back to you soon..");

          const resAddLead = await instance.post(
            "/leads/addLead",
            {
              adminId: "64bbba044cd4c09fc77762e9",
              propertyId: id,
              agentId: data?.result?.agentId._id,
            }
          );

          if (resAddLead.data) {

          }
        }
      } else {
        toast("Please log in to continue");
        router.push("/login");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }




  return (
    <div className=" bg-white">
      <main className=" py-12 px-5 md:px-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* head section */}
        <div className="space-y-8 md:space-y-4 w-full">
          <div className="flex items-center justify-between ">
            {/* <small className="font-manrope">
              home / Appartment /{" "}
              <span className="text-primaryBlue pl-1">
                {data?.result.name || ""}

              </span>
            </small> */}
            <div style={{ borderRadius: "20px", color: "white", marginLeft: "10px" }} className="px-3 py-1 border bg-blue-500 shadow-sm">
              <p className="mt-1 mb-1">Property ID :{data?.result._id}</p>
              {/* <p className="mt-1 mb-1">Delhi</p> */}
            </div>
          </div>

          {/* header section */}
          <div className=" md:flex justify-between items-start space-y-4">
            {/* title */}

            {/* {availableFor === "Development"
                  ? `${availableFor} site`
                  : `${BHKconfig ? `${BHKconfig}Bhk ` : ''}${propertyType} for ${availableFor}`} */}


            <div className="space-y-2 ">
              <h1 className="text-4xl mb-5  font-semibold text-TitleColor">
                {/* {data?.result.name} */}
                {/* {data?.result?.toggle === "Project" ? data?.result.name : `${data?.result?.BHKconfig}Bhk ${data?.result.propertyType} for ${data?.result?.availableFor} in  ${data?.result?.location.name}  `} */}
                {/* {data?.result?.toggle === "Project" ? data?.result.name : data?.resutl?.availabelFor === "Development" ? `${availableFor} site in  ${data?.result?.location.name}`: `${data?.result?.BHKconfig}Bhk ${data?.result.propertyType} for ${data?.result?.availableFor} in  ${data?.result?.location.name}  `  } */}

                {data?.result?.toggle === "Project"
                  ? data?.result.name
                  : data?.result?.availableFor === "Development"
                    ? `${data?.result?.availableFor} site in ${data?.result?.location.name}`
                    : data?.result?.BHKconfig === ""
                      ? `${data?.result.propertyType} for ${data?.result?.availableFor} in ${data?.result?.location.name}`
                      : `${data?.result?.BHKconfig} Bhk ${data?.result.propertyType} for ${data?.result?.availableFor} in ${data?.result?.location.name}`}



              </h1>
              <div className="md:flex items-center  space-x-6 text-locColor">
                <div className="flex items-center justify-center space-x-4">
                  <GrLocation className="text-2xl" />
                  <p className="text-2xl m-0">{data?.result.location.name}</p>
                </div>
                <div className=" space-x-2">
                  <p className="flex items-center space-x-2">

                  </p>
                  <p className="text-xs md:text-xl">₹{data?.result.areaValue}/{data?.result.areaType}</p>

                </div>


              </div>

              <div className="m-0 p-0">
                <p style={{ margin: "0" }}>
                  <span style={{ fontSize: "20px", marginRight: "10px" }}>
                    Address:
                  </span>{" "}
                  {data?.result.address}
                </p>
              </div>

            </div>


            {/* save button */}
            <div className="flex flex-col ">
              <div
                style={{ marginTop: "45px", }}
                className="flex items-center justify-center md:justify-center space-x-8 "
              >
                <div className="flex items-center w-full md:w-auto">
                  <FaRupeeSign className="text-primaryBlue text-2xl font-manrope" />
                  <p className="text-2xl mt-2 font-manrope font-semibold text-primaryBlue">
                    <PropertyCost cost={data?.result.cost} />
                  </p>
                </div>
                <div onClick={handleFavourite} className="flex items-center space-x-1 border px-3 py-1 rounded-full bg-white/70 cursor-pointer shadow-sm active:scale-105 transition transform duration-200 active:bg-gray-100">
                  <FaRegBookmark className="text-red-400" />
                  <p className="mt-1">Save</p>
                </div>
                <div className="flex items-center space-x-1 border px-3 py-1 rounded-full bg-white/70 cursor-pointer shadow-sm active:scale-105 transition transform duration-200 active:bg-gray-100">
                  <AiOutlineShareAlt onClick={handleShareClick} style={{ fontSize: "25px" }} />
                </div>
              </div>
              <p className="text-lg font-medium mt-4 ">Area:{data?.result.size} {data?.result.areaType}</p>
            </div>

          </div>
        </div>




        {/* Tags */}
        {/* <div className="md:flex md:space-x-4 space-y-3 md:space-y-0 font-manrope ">
          <div style={{ borderRadius: "20px", color: "white" }} className="px-3 py-1 border bg-blue-500 shadow-sm">
            <p className="mt-1 mb-1">{data?.result.location.name}</p>
         
          </div>
          <div
            style={{
              borderRadius: "20px",
              color: "white",
              display: data?.result.BHKconfig ? "block" : "none"
            }}
            className="px-3 py-1 border bg-blue-500 shadow-sm"
          >
            <p className="mt-1 mb-1">{data?.result?.BHKconfig} bhk</p>
          </div>
          <div style={{ borderRadius: "20px", color: "white" }} className="px-3 py-1 border bg-blue-500 shadow-sm">
            <p className="mt-1 mb-1">{data?.result.availableFor}</p>
          </div>
          <div
            style={{
              borderRadius: "20px",
              color: "white",
              display: data?.result?.propertyType ? "block" : "none"
            }}
            className="px-3 py-1 border bg-blue-500 shadow-sm"
          >
            <p className="mt-1 mb-1">{data?.result?.propertyType}</p>
          </div>
        </div> */}


        {/* main details content */}
        <section className="space-y-10">
          <div className="relative w-full overflow-hidden flex justify-center items-center space-x-2">
            {data?.result?.propertyImages &&
              data.result.propertyImages.length > 0 ? (
              data.result.propertyImages.slice(0, 2).map((img) => (
                <LoadImage key={img} src={img || "/bighouse.png"}>
                  <Image
                    src={img || "/bighouse.png"}
                    fill
                    className="object-contain"
                    alt="villa4"
                  />
                </LoadImage>
              ))
            ) : (
              <Image
                src="/bighouse.png"
                fill
                className="object-contain"
                alt="villa4"
              />
            )}
            <div className="absolute z-10 bottom-0 right-5 md:right-14 bg-white px-4 py-2 rounded-full shadow-sm border hover:scale-105 active:scale-95 transition transform duration-200 ease-out">
              <button onClick={() => setIsOpen(true)}>More Images</button>
            </div>
          </div>


          {/* <button
                style={{ borderRadius: "20px" }}
                className={`bg-${buttonColor ? "current" : "primaryBlue"
                  } text-white  w-full py-2 rounded-sm shadow-sm  hover:opacity-95 active:opacity-80 transition transform duration-200 ease-out`}
              >
                <MyMsg
                  data={data}
                  text="Get in Contact"
                  onApiCall={handleApiCall}
                />
              </button> */}

          <div className="w-full">
            {cookies?.jwtToken ? (
              <button
                onClick={handleAgentContact}
                style={{ borderRadius: "20px" }}
                className={`bg-${buttonColor ? "current" : "primaryBlue"
                  } text-white  w-full py-2 rounded-sm shadow-sm  hover:opacity-95 active:opacity-80 transition transform duration-200 ease-out`}
              >
                Get in Contact
              </button>

            ) : (
              <Link href={"/login"}>
                <button className="  bg-primaryBlue text-white  w-full py-2 rounded-sm shadow-sm  hover:opacity-95 active:opacity-80 transition transform duration-200 ease-out  ">
                  Login to Get in Contact
                </button>
              </Link>
            )}
          </div>

          <div className="flex space-x-4 text-sm">
            {(data?.result.propertyTags && data.result.propertyTags.length > 0) ? (
              (data?.result.propertyTags).map((tag, index) => (
                <button
                  key={index}
                  className={`${index === 0 ? "bg-green-400 bg-opacity-50" : "bg-[#EBECF0]"
                    } px-4 p-2 ${index === 0 ? "text-xs" : "md:text-sm"} rounded-lg`}
                >
                  {tag}
                </button>
              ))
            ) : (
              null
            )}
          </div>

          {data?.result?.propertyImages && (
            <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
              <ImageSlider
                setIsOpen={setIsOpen}
                slides={data?.result.propertyImages}
              />
            </MyModal>
          )}

          <div
            style={{
              padding: "15px",
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
              paddingBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <p className="text-xl ">Specifications</p>

            <div className="md:flex md:space-x-4 space-y-3 md:space-y-0 font-manrope">
              <div className="flex w-full justify-between items-start flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 font-manrope">

                <div className="leftSideContainer">

                  <SpecificationItem Icon={FaHome} tagName={"Property Type"} text={data?.result.propertyType} />
                  <SpecificationItem Icon={FaBuilding} tagName={"Building Type"} text={data?.result.buildingType} />
                  <SpecificationItem Icon={FaUser} tagName={"User Type"} text={data?.result?.userType} />
                  <SpecificationItem Icon={FaRegBookmark} tagName={"Available for"} text={data?.result.availableFor} />
                  <SpecificationItem Icon={FaRegBookmark} tagName={"Age of the Property"} text={data?.result.ageOfProperty} />
                  <SpecificationItem Icon={FaRuler} tagName={"Area"} text={data?.result.size} />
                  <SpecificationItem Icon={GiLift} tagName={"Lift Facility"} text={data?.result.liftFacility} />
                  <SpecificationItem Icon={FaBuilding} tagName={"Toggle"} text={data?.result.toggle} />



                </div>
                <div style={{ marginRight: "300px" }} className="rightSideContainer">
                  <SpecificationItem Icon={FaRegBookmark} tagName={"Authority"} text={data?.result.authority} />
                  <SpecificationItem Icon={FaBed} tagName={"BHK Configure"} text={data?.result.BHKconfig} />
                  <SpecificationItem Icon={FaRegBookmark} tagName={"Additional Rooms"} text={data?.result.additionalRooms} />
                  <SpecificationItem Icon={FaRegBookmark} tagName={"Possession Status"} text={data?.result.possessionStatus} />
                  <SpecificationItem Icon={GiHandTruck} tagName={"Furnishing Status"} text={data?.result.furnishingStatus} />
                  <SpecificationItem Icon={FaBed} tagName={"Floor No."} text={data?.result.floorNo} />
                  <SpecificationItem Icon={MdBathroom} tagName={"No. of Bathroom"} text={data?.result.numOfBathroom} />
                  <SpecificationItem Icon={FaParking} tagName={"No. of Parking"} text={data?.result.numOfParking} />

                </div>
              </div>
            </div>
          </div>




          {data?.result?.toggle === "Project" ? <div style={{
            padding: "15px",
            boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
            paddingBottom: "20px",
            borderRadius: "8px",

          }}>
            <p style={{ fontSize: "20px" }}>Project Images</p>
            <div style={{ padding: "0 150px", marginBottom: "20px" }} className="flex p-4 md:space-x-4 md:flex-row md:items-stretch md:justify-start items-center justify-center flex-col  ">
              <div className=" md:w-[500px] w-56 h-36 md:mb-0 mb-4  md:h-80 bg-gray-200">
                {data?.result.propertyImages?.length > 0 && (
                  <img src={data.result.propertyImages[0]} alt="Image 1" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1 h-80 flex flex-col justify-between">
                {data?.result.propertyImages?.slice(1, 3).map((image, index) => (
                  <div className="md:w-full md:h-[150px] w-56  h-36 md:mb-0 mb-4" key={index}>
                    <img src={image} alt={`Image ${index + 2}`} className="h-full w-full object-cover mb-2" />
                  </div>
                ))}
                {data?.result.propertyImages?.length <= 2 && (
                  <div className="md:w-full md:h-[150px] w-56  h-36 md:mb-0 mb-4 flex justify-center items-center text-gray-600 border border-gray-600">
                    No more images
                  </div>
                )}
                {data?.result.propertyImages?.length === 1 && (
                  <div className="md:w-full md:h-[150px] w-56  h-36 md:mb-0 mb-4 flex justify-center items-center text-gray-600 border border-gray-600">
                    No more images
                  </div>
                )}
              </div>
            </div>
          </div> : null}




          <div
            style={{
              padding: "15px",
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
              paddingBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <p className="text-xl ">Top Facilities</p>

            <div className="md:flex md:space-x-4 space-y-3 md:space-y-0 font-manrope">
              {data?.result.amenities ? data.result.amenities.map((curElem: string) => {
                let Icon = availableAmenities?.find((ele: any) => {
                  let name = ele?.name;
                  return name === curElem;
                });
                const IconTag = Icon?.icon;
                console.log(IconTag, "Icon")
                return (
                  <div key={curElem} style={{ borderRadius: "20px", color: "white" }} className=" flex items-center justify-center space-x-2 px-3 py-1 border bg-blue-500 shadow-sm">
                    {IconTag ? <IconTag /> : null}
                    <p className="mt-1 mb-1">{curElem}</p>
                  </div>
                )
              }) : null}
            </div>
          </div>





          <div
            style={{
              padding: "15px",
              paddingBottom: "20px",
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: "normal" }}>
              Description
            </p>
            <p className=" text-gray-800 font-manrope">
              {data?.result?.description}
            </p>
          </div>
          {/* <div className=" flex flex-col items-center justify-center space-y-4  sm:flex-row sm:space-x-4 sm:justify-start sm:space-y-0 ">
            <div className="border rounded-md space-y-2  h-28 shadow-sm  w-32 flex flex-col justify-center items-center">
              <p className="text-4xl font-manrope font-semibold text-primaryBlue">
                {data?.result?.BHKconfig}
              </p>
              <p className="text-xl font-manrope font-light">Badroom</p>
            </div>
            <div className="border space-y-2 rounded-sm  h-28 shadow-sm  w-32 flex flex-col justify-center items-center">
              <p className="text-4xl font-manrope font-semibold text-primaryBlue">
                {1}
              </p>
              <p className="text-xl font-manrope font-light">Bathrooms</p>
            </div>
            <div className="border space-y-2  rounded-sm h-28 shadow-sm  w-32 flex flex-col justify-center items-center">
              <p className="text-4xl font-manrope font-semibold text-primaryBlue">
                1
              </p>
              <p className="text-xl font-manrope font-light">GuestRoom</p>
            </div>
          </div> */}
        </section>
        {/* maps */}
        <section className="md:flex space-y-5 md:space-y-0  md:space-x-8 justify-center items-center ">
          <div className="h-[300px] md:h-[500px] relative grow mr-6 mb-6">
            {/* <Image src={"/map.png"} fill className="object-fill" alt="villa4" /> */}
            <GoogleMap
              center={{ lat: lat, lng: lng }}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {lat && lng && <Marker position={{ lat: lat, lng: lng }} />}
            </GoogleMap>
          </div>
          <div
            style={{ margin: "0 auto" }}
            className="max-w-xs shadow-sm rounded-sm  bg-white grow border flex justify-center items-center "
          >
            <div className="flex flex-col items-center space-y-5 md:p-0 px-5">
              <div className="h-20 w-20 relative rounded-full">
                <Image
                  style={{ marginTop: "20px" }}
                  // src={data?.result?.agentId?.profilePhoto as string}
                  src="https://i.ibb.co/8MzgrNc/avatar.png"
                  fill
                  className="object-fill rounded-full"
                  alt="villa4"
                />
              </div>
              <div className="w-full text-center mt-2">
                {data?.result.agentId ? (
                  <>
                    <div className="flex items-center justify-center">
                      <p className="font-manrope text-lg font-medium pr-2 pl-3">
                        {data?.result.agentId.name}
                      </p>
                      <HiCheckCircle className="text-primaryBlue text-xl mb-2" />
                    </div>
                    {/* <p className="text-xs text-locColor font-manrope flex justify-center items-center">
                      {data?.result.agentId ? `Mob. No. - ${data?.result.agentId.mobileNumber}` : null}
                    </p> */}
                  </>
                ) : (
                  <p>No agent information available</p>
                )}
              </div>

              {/* <button style={{ marginBottom: "30px" }} className=" bg-green-500 px-7  text-white  py-1 rounded-lg shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  ">
                  <MyMsg
                    data={data}
                  
                    text={data?.result.userType !== undefined ? `Contact ${data?.result.userType}` : `Contact`}
                    onApiCall={handleApiCall}
                  />
                </button> */}

              {cookies?.jwtToken ? (
                <button onClick={handleAgentContact} style={{ marginBottom: "30px" }} className=" bg-green-500 px-7  text-white  py-1 rounded-lg shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  ">
                  {data?.result.userType !== undefined ? `Contact ${data?.result.userType}` : `Contact`}
                </button>
              ) : (
                <Link href={"/login"}>
                  <button style={{ marginBottom: "30px" }} className="  bg-green-500 px-7  text-white   py-2 rounded-full shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  ">
                    {/* Login to Contact Agent */}
                    {data?.result.userType !== undefined ? `Login to Contact ${data?.result.userType}` : `Login to Contact`}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* amenities */}
        {/*<Card sx={{ borderRadius: 2 }}>*/}
        {/*  <CardHeader title="Amenities" />*/}
        {/*  <CardContent>*/}
        {/*    <Box*/}
        {/*      rowGap={3}*/}
        {/*      columnGap={2}*/}
        {/*      display="grid"*/}
        {/*      gridTemplateColumns={{*/}
        {/*        xs: "repeat(1, 1fr)",*/}
        {/*        sm: "repeat(4, 1fr)",*/}
        {/*      }}*/}
        {/*      sx={{*/}
        {/*        alignItems: "end",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {data?.result?.amenities?.map((item, i) => {*/}
        {/*        let Icon = availableAmenities?.find((ele: any) => {*/}
        {/*          let name = ele?.name;*/}
        {/*          return name === item;*/}
        {/*        });*/}
        {/*        const IconTag = Icon?.icon;*/}

        {/*        return (*/}
        {/*          <div*/}
        {/*            className="flex justify-start items-center text-black cursor-pointer leading-[32px] "*/}
        {/*            key={i}*/}
        {/*          >*/}
        {/*            <GiLift className="w-[26px] h-[26px] " />*/}
        {/*            <p className="text-lg text-[1rem] px-3">{item}</p>*/}
        {/*          </div>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*      <div*/}
        {/*          className="flex justify-start items-center text-black cursor-pointer leading-[32px] "*/}
        {/*          // key={i}*/}
        {/*      >*/}
        {/*        <GiLift className="w-[26px] h-[26px] " />*/}
        {/*        <p className="text-lg text-[1rem] px-3">Lift</p>*/}
        {/*      </div>*/}
        {/*    </Box>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}

        {/* <p style={{ margin: "0" }}>
          <span style={{ fontSize: "20px", marginRight: "15px" }}>
            Address:
          </span>{" "}
          {data?.result.address}
        </p> */}

        <section>
          <div
            style={{
              padding: "15px",
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}
          >
            {/* <p style={{textAlign:"center",fontSize:"30px",fontWeight:"bold"}}>WE'VE FOUND SIMILAR PROPERTIES FOR YOU</p> */}
            <div className="max-w-7xl mx-auto  md:px-10 ">
              <div className="w-full flex items-center justify-between flex-col md:flex-row">
                <HomeSectionTitle text="WE'VE FOUND SIMILAR PROPERTIES FOR YOU" />
                <div className="flex space-x-4 mt-2 md:mt-0 ">
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
              {similarData && (
                <div id="feat" className="flex overflow-y-scroll scrollbar-hide w-full">
                  <CardCarousel
                    id="feat"
                    data={similarData}
                    Card={MediumHouseCard}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        {/* revies */}
        {/* <section className=" py-16">
          <div className="flex justify-between">
            <div>
              <h1 className="text-TitleColor font-manrope font-bold text-xl md:text-3xl">
                Reviews
              </h1>
              <p className="text-xs font-manrope text-locColor">
                How others rated this apartment
              </p>
            </div>
            <button className="  bg-primaryBlue px-4 md:px-7 text-sm md:text-lg  text-white   py-1 rounded-lg shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  ">
              Add Review
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => scrollRight("review")}
              className="absolute hidden -right-0 z-50 border top-1/2 h-[40px] text-center md:flex justify-center items-center min-w-[40px]  bg-primaryBlue rounded-full  text-white   shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  "
            >
              <SlArrowRight />
            </button>
            <button
              onClick={() => scrollLeft("review")}
              className="absolute hidden -left-0 z-50 border top-1/2 h-[40px] text-center md:flex justify-center items-center min-w-[40px]  bg-primaryBlue rounded-full  text-white   shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  "
            >
              <SlArrowLeft />
            </button>

            <CardCarousel id="review" data={reviewData} Card={ReviewCard} />
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default Details;

Details.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
