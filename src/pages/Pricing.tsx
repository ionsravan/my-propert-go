

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
// import { Plans, Tickets, response } from "src/@types";
import Modal from "src/componets/shared/modal";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { useCookies } from "react-cookie";
import CircularSpinner from "src/componets/circularLoader";
import { Footer, Navbar } from "src/componets";
import CustomLoader from "src/componets/shared/Loader";
import { useRouter } from "next/router";
import Image from 'next/image';


const subscriptionPacks = [
  {
    title: "Starter",
    price: 0,
    duration: "month",
    features: [
      { available: true, text: "Properties: 5" },
      { available: true, text: "Lead Count: Upto 10" },
      { available: true, text: "Reach: Limited" },
      { available: true, text: "Leads Validity: 180 days" },
      { available: true, text: "Tags Applied: No tags" },
      { available: false, text: "Video Shoot: -" },
      { available: false, text: "Priority Placement: -" },
      { available: false, text: "Appear in Trending Properties: -" },
      { available: false, text: "Search Areas Appear: -" },
      { available: false, text: "Notify Builders about Development property: -" },
      { available: false, text: "Assigned by Owner/Agent: -" },
      { available: false, text: "Social Promotion: -" },
    ],
  },
  {
    title: "Pro",
    price: 299,
    duration: "month",
    features: [
      { available: true, text: "Properties: Unlimited" },
      { available: true, text: "Lead Count: 20" },
      { available: true, text: "Reach: Upto 2x buyers" },
      {
        available: true,
        text:
          "Leads Validity: 180 days"
      },
      { available: true, text: "Tags Applied: User verified Tag" },
      { available: false, text: "Video Shoot: -" },
      { available: false, text: "Priority Placement: -" },
      { available: false, text: "Appear in Trending Properties: -" },
      { available: false, text: "Search Areas Appear: -" },
      { available: false, text: "Notify Builders about Development property: -" },
      { available: false, text: "Assigned by Owner/Agent: -" },
      { available: false, text: "Social Promotion: -" },
    ],
  },
  {
    title: "Elite",
    price: 799,
    duration: "month",
    features: [
      { available: true, text: "Properties: Unlimited" },
      { available: true, text: "Lead Count: 40 leads " },
      { available: true, text: "Reach: Upto 4x buyers" },
      {
        available: true,
        text:
          "Leads Validity: 180 days",
      },
      { available: true, text: "Tags Applied: Elite User Tag" },
      { available: true, text: "Video Shoot: Property Video Shoot from WP team" },
      { available: true, text: "Priority Placement: Random Push to trending property Section" },
      { available: true, text: "Appear in Trending Properties: Appear in nearby Searches Areas" },
      { available: true, text: "Search Areas Appear: Promotion to them about Development property in priority" },
      { available: true, text: "Notify Builders about Development property: Get assigned by Owner/Agent - Wonderplots will notify you if any Owner/Agent is willing to deal property with the Property Lister" },
      { available: true, text: "Assigned by Owner/Agent: Social Promotion on Lets Talk property Category" },
      { available: false, text: "Social Promotion: -" },
    ],
  },
  {
    title: "Enterprise",
    price: 1999,
    duration: "month",
    features: [
      { available: true, text: "Properties: Unlimited" },
      { available: true, text: "Lead Count: 100 leads" },
      { available: true, text: "Reach: Upto 6x buyers" },
      {
        available: true,
        text:
          "Leads Validity: 360 days",
      },
      { available: true, text: "Tags Applied: Featured Tag" },
      { available: true, text: "Video Shoot: Video Shoot Included, Stand out from other listings" },
      { available: true, text: "Priority Placement: Random Push to trending property Section" },
      { available: true, text: "Appear in Trending Properties: Appear in nearby Searches Areas" },
      { available: true, text: "Search Areas Appear: Promotion to them about Development property in priority" },
      { available: true, text: "Notify Builders about Development property: Get assigned by Owner/Agent - Wonderplots will notify you if any Owner/Agent is willing to deal property with the Property Lister" },
      { available: true, text: "Assigned by Owner/Agent: Social Promotion on Lets Talk property Category" },
      { available: false, text: "Social Promotion: -" },
    ],
  },
  {
    title: "Ultimate",
    price: "Get Quote",
    duration: "month",
    features: [
      { available: true, text: "Sell your property faster and easier than ever." },
      { available: true, text: "Guaranteed and ongoing leads" },
      { available: true, text: "A stunning video to showcase your property" },
      // { available: true, text: "Leads Validity: A personal assistant and cold calling, A custom digital marketing campaign, A project listing option" },
      { available: true, text: "A personal assistant and cold calling" },
      { available: true, text: "A custom digital marketing campaign" },
      { available: true, text: "A Project listing option" },
      { available: true, text: "Call Wonderplots now and get the ultimate deal!" },
      // { available: false, text: "Search Areas Appear: -" },
      // { available: false, text: "Notify Builders about Development property: -" },
      // { available: false, text: "Assigned by Owner/Agent: -" },
      // { available: false, text: "Social Promotion: -" },
    ],
  },
];


const PricingPopup: React.FC = ({ planId, closeModal, planName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonHide, setButtonHide] = useState(false);
  const [cookies] = useCookies(["jwtToken"]);


  // const openPopup = () => {
  //   setIsOpen(true);
  // };

  // const closePopup = () => {
  //   setIsOpen(false);
  // };



  // Primaty Image Upload FUnction

  const [primaryFilesToUpload, setPrimaryFilesToUpload] = useState<any>([]);

  useEffect(() => {
    console.log(primaryFilesToUpload, "primaryImage")
  }, [primaryFilesToUpload])

  const handlePrimaryImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setPrimaryFilesToUpload([selectedFile]);
    }
    e.target.value = null;
  };

  const dletePrimaryImage = (file: any) => {
    setPrimaryFilesToUpload((prev: any) => {
      let imgs: Array<any> = [...primaryFilesToUpload];
      const index = imgs.indexOf(file);
      if (index > -1) {
        imgs.splice(index, 1);
      }
      return imgs;
    });
  };

  const renderPrimaryPhotos = (source: any) => {
    return source.map((photo: any, index: any) => {
      return (
        <div
          className="w-max h-40 flex justify-center items-center  relative max-w-[200px]"
          key={index}
        >
          <button
            onClick={() => {
              dletePrimaryImage(photo);
            }}
            className="text-white bg-red-500 h-6 w-6 flex rounded-full items-center justify-center absolute top-1 right-0"
          >
            <AiOutlineClose />
          </button>
          <img
            className=" h-full object-cover"
            src={URL.createObjectURL(photo)}
            alt=""
            key={photo}
          />
        </div>
      );
    });
  };


  // buy plan
  // router.post(
  //   "/user/plan/buyPlan",
  //   userAuthMiddleware,
  //   mediaFiles.array("photos", 30),
  //   buyPlan
  // );
  // pass data- { planId, photos }

  const handleSubmit = async () => {

    setButtonHide(true)

    let bodyFormData = new FormData();
    bodyFormData.append('planId', planId);

    for (let i of primaryFilesToUpload) {
      bodyFormData.append('photos', i);
    }

    try {
      const response = await axios.post(
        "https://my-property-go-backend.onrender.com/api/user/plan/buyPlan",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "authorization": `Bearer ${cookies.jwtToken}`,
          },
        }
      );

      // setIsLoading(false)
      // router.push("/agent")
      toast("Your Subscription is Submitted")
      closeModal();
      setButtonHide(false)

    } catch (error) {
      console.error("Error while adding property:", error);
    }
  }


  return <>

    <div>
      <div>
        <p className="text-center text-xl">Plan Name - {planName?.toUpperCase()}</p>
      </div>
      <div>
        <div className="m-4 flex flex-col items-center">
          <label className="inline-block mb-2 text-gray-500">
            Select Payment Image (jpg,png,svg,jpeg)
          </label>
          <div className="flex items-center  w-full">
            <div className="w-full flex max-w-md ">
              {renderPrimaryPhotos(primaryFilesToUpload)}
            </div>
            <label className=" max-w-[150px] flex flex-col w-full h-40 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  Select a photo
                </p>
              </div>
              <input
                onChange={handlePrimaryImageChange}
                type="file"
                className="opacity-0"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <Image
            src="/qr.jpg"
            alt="Qr code"
            width={500}
            height={400} />
        </div>
        <div>
          <p>Upi id : 9494574368@ybl</p>
        </div>
      </div>
      {buttonHide === false ? <button
        style={{ borderRadius: "20px" }}
        onClick={handleSubmit}
        // style={{position:"absolute",bottom:"20px",left:"130px",padding:"10px 35px",borderRadius:"20px"}}
        className="mt-3 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

      >
        Submit
      </button> : <p>Loading...</p>}
    </div>




  </>

}

const PricingPage = () => {
  const instance = useAxios();
  const router = useRouter();
  const [plans, setPlans] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["jwtToken"]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/user/plan/getAllPlans");
        if (res?.data.plans) {
          setIsLoading(false)
          setPlans(res.data.plans)

        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [])



  // const handleSubscribe = (id) => {
  //   console.log(id, "iddd")
  // }



  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  

  const handleSubscribeClick = (pack) => {
    if (cookies.jwtToken) {
      openModal(pack);
    } else {
      toast("Please login in order to subscribe the plan")
      router.push("/login");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  // useEffect(() => {
  //   if (cookies?.jwtToken === undefined) {
  //     toast("Please login to post the property")
  //     router.push("/login")
  //   }
  // }, [])






  return <>

    <div>
      {isLoading ?
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* <CircularSpinner /> */}
          <CustomLoader />
        </div> : null}


      <div>
        <Navbar />
        <h1 className="text-3xl font-semibold mb-6 text-center mt-6">Pricing and Subscription</h1>
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap justify-center">
            {plans.map((pack, index) => (
              <div style={{ width: "400px" }} key={pack.id} className="mb-10 mx-4">
                <div style={{ height: "100%", position: "relative", paddingBottom: "60px" }} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                  <h1 className="text-2xl text-center text-gray-800 font-semibold mb-4">{pack.name.toUpperCase()}</h1>
                  {/* <h1 className="text-2xl text-center text-gray-800 font-semibold mb-4">{pack.name === "ultimate" ? null : pack.name.toUpperCase()}</h1> */}
                  {/* <h1 className="text-2xl text-center text-gray-800 font-semibold mb-4">{pack.name === "ultimate" ? null : pack.name.toUpperCase()}</h1> */}
                  <h2 className="text-3xl text-center text-primaryBlue font-bold">{pack.price === 2999 ? null : `₹ ${pack.price}`}</h2>

                  <div className="custom-separator my-4 mx-auto bg-primary h-px"></div>

                  <ul className="my-5 text-sm text-left">
                    {subscriptionPacks[index].features.map((feature, i) => (
                      <li key={i} className={feature.available ? "mb-3" : "mb-3 text-gray-400 line-through"} style={{ display: 'flex', alignItems: 'center' }}>
                        {feature.available ? <i className="fa fa-check mr-2 text-primary"></i> : <i className="fa fa-times mr-2"></i>}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    style={{ position: "absolute", bottom: "20px", left: "130px", padding: "10px 35px", borderRadius: "20px" }}
                    // onClick={() => handleSubscribeClick(pack)}
                    onClick={() => {
                      if (pack.name === 'starter') {
                        router.push('/login');
                      } else if (pack.name === 'ultimate') {
                        router.push('/contact');
                      } else {
                        handleSubscribeClick(pack)
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {pack?.name === 'starter' ? 'Explore' : pack?.name === 'ultimate' ? 'Get Quote' : 'Buy Now'}
                  </button>
                  <Modal
                    open={isModalOpen && selectedPlan === pack}
                    closeDialog={closeModal}
                    title="Buy Plan"
                    size="sm"
                  >
                    <PricingPopup planId={selectedPlan ? selectedPlan._id : null} planName={selectedPlan ? selectedPlan.name : null} closeModal={closeModal} />
                  </Modal>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center mb-2">
          <div className="w-[75%] flex flex-col items-center justify-center text-center">
            <p className="text-lg md:text-xl mb-4">
              Your land is precious. But is it safe and legal? Do you have the right to sell it?
              Find out with our value-added services. We offer Legal Verification and Encumbrance
              Certificate for landowners. We check your land's history, ownership, and status, and give
              you a certificate that proves your land is clear and ready to sell. Our services are fast,
              reliable, and affordable. Contact us today to secure your land and your future. We are the best in the business!
            </p>
            <p className="text-sm md:text-base mb-4">Contact Wonderplots for more details and to get a quotation.</p>
          </div>
        </div>


        <Footer />
      </div>


    </div>

    {/* <h1 className="text-3xl font-semibold mb-6 text-center">Pricing and Subscription</h1>
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap justify-center">
        {plans.map((pack, index) => (
          <div style={{ width: "400px" }} key={pack.id} className="mb-10 mx-4">
            <div style={{ height: "100%", position: "relative", paddingBottom: "60px" }} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h1 className="text-2xl text-center text-gray-800 font-semibold mb-4">{pack.name.toUpperCase()}</h1>
              <h2 className="text-3xl text-center text-primaryBlue font-bold">${pack.price}</h2>

              <div className="custom-separator my-4 mx-auto bg-primary h-px"></div>

              <ul className="my-5 text-sm text-left">
                {subscriptionPacks[index].features.map((feature, i) => (
                  <li key={i} className={feature.available ? "mb-3" : "mb-3 text-gray-400 line-through"}>
                    {feature.available ? <i className="fa fa-check mr-2 text-primary"></i> : <i className="fa fa-times mr-2"></i>}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button
                style={{ position: "absolute", bottom: "20px", left: "130px", padding: "10px 35px", borderRadius: "20px" }}
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Subscribe
              </button>
              <Modal
                open={isModalOpen}
                closeDialog={closeModal}
                title="Add Tickets"
                size="sm"
              >

                <PricingPopup planId={pack._id} closeModal={closeModal} />
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </div> */}


  </>
};

export default PricingPage;
