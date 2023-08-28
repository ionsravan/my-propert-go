import { useRouter } from "next/router";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Input } from "src/componets/shared/sharedInput";
import { Footer, Navbar } from "src/componets";
const ContactForm = ({navFooter}) => {
    const router = useRouter();
    const [cookies] = useCookies(["jwtToken"]);
    // const [formData, setFormData] = useState({
    //   name: "",
    //   email: "",
    //   message: "",
    //   service: "",
    // });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [service, setService] = useState("");
    const [mobile, setMobilie] = useState("");

    // const handleChange = (e) => {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [e.target.name]: e.target.value,
    //   }));
    // };

    const handleSubmit = async (e) => {
    
        const formData = {
            name: name,
            email: email,
            message: message,
            mobile: mobile,
            service: service
        }

        try {
            const response = await axios.post(
                "https://my-property-go-backend.onrender.com/api/user/contactDetails",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${cookies.jwtToken}`,
                    },
                }
            );
            // setIsLoading(false)
            router.push("/")
            toast("Message sent succesfully")

        } catch (error) {
            console.error("Error while adding property:", error);
        }
        console.log(formData);
        //   setFormData({
        //     name: "",
        //     email: "",
        //     message: "",
        //     service: "",
        //   });

        //   closeModal()
    };

    
  const servicesNames = ["Interior Designing","Property Care", "Earn With Us", "Others"]


    const handleService = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedService = event.target.value;
        setService(selectedService);
      };

    return <>
  {navFooter === true ? null :  <Navbar/>}
      <div className="flex items-center flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <p className="text-3xl">Contact Our Team</p>
      <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md w-full sm:w-1/2 mt-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <Input
            placeholder="Enter Name"
            value={name}
            setValue={setName}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <Input
            placeholder="Enter Email"
            value={email}
            setValue={setEmail}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <Input
            placeholder="Enter Message"
            value={message}
            setValue={setMessage}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Mobile No.
          </label>
          <Input
            placeholder="Enter Your Mobile No."
            value={mobile}
            setValue={setMobilie}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Service
          </label>
          <select
            className="py-3 group bg-white focus:ring-primaryBlue border w-full"
            value={service}
            onChange={handleService}
          >
            {servicesNames.map((serviceName, index) => (
              <option key={index} value={serviceName}>
                {serviceName}
              </option>
            ))}
          </select>
        </div>
    
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-primaryBlue text-white py-2 rounded-lg hover:bg-primaryBlueDark transition duration-300"
        >
          Send Message
        </button>
      </div>
    </div>
  
    {navFooter === true ? null :   <Footer/>}
 </>
};

export default ContactForm;