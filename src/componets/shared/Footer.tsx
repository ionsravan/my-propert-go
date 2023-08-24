import { useRouter } from "next/router";
import { useState } from "react";
import { GrFacebookOption, GrInstagram, GrTwitter, GrYoutube } from "react-icons/gr";
import Modal from "src/componets/shared/modal";
import axios from 'axios';
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { TextField } from "@mui/material";
import { addForm } from "src/pages/admin/customers/edit/[id]";
import { Input } from "./sharedInput";



const opts = [
  {
    title: "Services",
    items: [

      "Interior Designing",
      "Earn with Us",
      "Shipping Container Homes",
      "Property Care",
      "Investors",
    ],
  },
  {
    title: "Company",
    items: [
      "About us",
      "Contact us",
      "Blogs",
      "Terms and Conditions",
      "Privacy Policy",
      "Disclaimer",
      "Robots.txt",
      "Sitemap",

    ],
  },
];

interface Props {
  title: string;
  items: string[];
}
const Seciont = ({ title, items }: Props) => {

  return (
    <div className="space-y-4 text-sm">
      <h1 className="font-semibold text-white">{title}</h1>
      {items?.map((item, index) => {
        return (
          <p
            key={index}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
};



const Footer = () => {
  const router = useRouter();
  const [cookies] = useCookies(["jwtToken"]);
  const [newsEmail, setNewsEmail] = useState("")

  const handleContact = () => {
    router.push("/contact")
  }
  const handleBlogs = () => {
    router.push("/blogs")
  }
  const handlePrivacy = () => {
    router.push("/privacyPolicy")
  }

  const handleNewsletter = async () => {

    const formData = {
      email: newsEmail
    }

    try {
      const response = await axios.post(
        "https://my-property-go-backend.onrender.com/api/user/addNewsLetter",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookies.jwtToken}`,
          },
        }
      );
      // setIsLoading(false)
      // router.push("/agent")
      toast("You are now subscribed to Newsletter")
      setNewsEmail("")

    } catch (error) {
      console.error("Error while adding property:", error);
    }


  }
  const handleNewsChange = (e) => {
    setNewsEmail(e.target.value)

  }

  return (
    <div>
      <footer className="grid grid-cols-1 md:grid-cols-4 gap-y-16 px-32 pt-16 pb-16 bg-primaryDark">
        <div className="space-y-8">
          <p className="font-semibold text-white max-w-xs leading-normal pl-2">
            {/* We provide information about properties such as houses, villas and
          apartments to help people find their dream home */}
            Check our Social
          </p>
          {/* <div className="flex text-2xl space-x-4 items-center">
            <GrFacebookOption onClick={()} className="text-primaryBlue" />
            <GrTwitter onClick={()} className="text-primaryBlue" />
            <GrInstagram onClick={()} className="text-primaryBlue" />
            <GrYoutube onClick={()} className="text-primaryBlue" />
          </div> */}
          <div className="flex text-2xl space-x-4 items-center">
            <GrFacebookOption
              onClick={() => window.open("https://www.facebook.com/WonderPlots", "_blank")}
              className="text-primaryBlue cursor-pointer"
            />
            <GrTwitter
              onClick={() => window.open("https://twitter.com/WonderPlotsReal", "_blank")}
              className="text-primaryBlue cursor-pointer"
            />
            <GrInstagram
              onClick={() => window.open("https://www.instagram.com/wonderplots/", "_blank")}
              className="text-primaryBlue cursor-pointer"
            />
            <GrYoutube
              onClick={() => window.open("https://www.youtube.com/@WonderPlots", "_blank")}
              className="text-primaryBlue cursor-pointer"
            />
          </div>

        </div>
        {/* {opts?.map((item, index) => {
        return <Seciont key={index} items={item?.items} title={item.title} />;
      })} */}


        <div className="space-y-4 text-sm">
          <h1 className="font-semibold text-white">Services</h1>
          {[
            "Interior Designing",
            "Earn with Us",    
            "Property Care",       
          ].map((item, index) => (
            <p
              key={index}
              className={`text-white/70 cursor-pointer`}
              onClick={() =>
                item === "Interior Designing"
                  ? router.push("/services/interiorDesigning")
                  : item === "Earn with Us"
                    ? router.push("/services/earnWithUs")
                    : item === "Property Care"
                      ? router.push("/services/propertyCare")
                      : null
              }
            >
              {item}
            </p>
          ))}
        </div>

        <div className="space-y-4 text-sm">
          <h1 className="font-semibold text-white">Company</h1>
          {[
            "About us",
            "Contact us",
            "Blogs",
            "Terms and Conditions",
            "Privacy Policy",
            "Disclaimer",
            "Robots.txt",
            "Sitemap",
          ].map((item, index) => (
            <p
              key={index}
              className={`text-white/70 cursor-pointer `}
              onClick={() => item === "Contact us"
                ? router.push("/contact")
                : item === "Blogs"
                  ? router.push("/blogs")
                  : item === "Terms and Conditions"
                    ? router.push("/termsAndCondition")
                    : item === "Privacy Policy"
                      ? router.push("/privacyPolicy")
                      : null

              }
            >
              {item}
            </p>
          ))}
        </div>
        <div className="space-y-5">
          <h1 className="font-semibold text-white">Contact Us</h1>
          <div>
            <p className="text-xs text-white/75 max-w-xs leading-normal">
              Contact - 08712287222
            </p>
            {/* <p className="text-xs text-white/75 max-w-xs leading-normal">
            Monday - Saturday (9:00AM to 11:00PM IST)
          </p> */}
          </div>
          <div>
            <p className="text-xs text-white/75 max-w-xs leading-normal">
              Email us-
            </p>
            <p className="text-xs text-white/75 max-w-xs leading-normal">
              contact@wonderplots.com
            </p>
          </div>

          <div>
            <h2 className="text-white text-lg mb-2">Subscribe to Newsletter</h2>
            <div >
              {/* <p className="text-white">Email:</p> */}
              {/* <p className="text-xs text-white/75 max-w-xs leading-normal">
              Usage of 99acres.com to upload content showing area in non
              standard units or which enables targeting by
              religion/community/caste/race is prohibited. Please report
              inappropriate content by writing to us at
            </p> */}
              {/* <input style={{ padding: "5px 5px", marginBottom: "10px" }}   value={newsEmail}  onChange={handleNewsChange} placeholder="Enter your Email" type="text" /> */}
              {/* <TextField hx={addForm} placeholder="Enter Email"/> */}
              <Input
                // Icon={AiOutlineUser}
                placeholder="Enter Email"
                value={newsEmail}
                // value={name}
                setValue={setNewsEmail}

              />
              {/* <button style={{ display: "block", padding: "5px 10px", color: "blue", backgroundColor: "white", borderRadius: "5px" }}>Submit</button> */}
              <button
                style={{ borderRadius: "20px" }}
                onClick={handleNewsletter}
                // style={{position:"absolute",bottom:"20px",left:"130px",padding:"10px 35px",borderRadius:"20px"}}
                className="mt-3 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

              >
                Submit
              </button>
            </div>
          </div>
          <div>
            <p className="text-white/90">
              {/* All rights reserved - info Edge (india) */}
              Wonderplots.com
            </p>

            <div className="text-white/90">A Wonderplots Reality Private Limited Venture</div>
            {/* <p className="text-white/90">A naukari.com venture</p> */}
          </div>
        </div>
      </footer>
      {/* <Modal
        open={isModalOpen}
        closeDialog={closeModal}
        title="Contact Us"
        size="sm"
      >

        <ContactForm closeModal={closeModal}  />
      </Modal> */}
      <p style={{ padding: "0", margin: "0" }} className="text-center text-white bg-primaryDark pb-4">All rights reserved 2023-2024</p>
    </div>
  );
};

export default Footer;
