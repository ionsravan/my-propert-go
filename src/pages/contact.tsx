import { useRouter } from "next/router";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Input } from "src/componets/shared/sharedInput";
const ContactForm = () => {
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

    // const handleChange = (e) => {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [e.target.name]: e.target.value,
    //   }));
    // };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        //   const bodyFormData = new FormData();
        //   bodyFormData.append("name", formData.name);
        //   bodyFormData.append("email", formData.email);
        //   bodyFormData.append("message", formData.message);
        //   bodyFormData.append("service", formData.service);
        const formData = {
            name: name,
            email: email,
            message: message,
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

    
  const servicesNames = ["Interior Designing","Property Care", "Shipping Container Homes", "Others"]


    const handleService = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedService = event.target.value;
        setService(selectedService);
      };

    return (
        <div style={{ height: "100vh" }} className="flex items-center flex-col justify-center">
            <p className="text-3xl">Contact Us</p>
            {/* <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md w-1/2"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primaryBlue"
            placeholder="Your Name"
            required
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primaryBlue"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Service
          </label>
          <input
            type="service"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primaryBlue"
            placeholder="Service"
            required
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primaryBlue resize-none"
            placeholder="Your Message"
            required
          />
        </div> */}
            <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md w-1/2">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Name
                    </label>
                    <Input
                        placeholder="Enter Name"
                        value={name}
                        // value={name}
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
                        // value={name}
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
                        // value={name}
                        setValue={setMessage}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Service
                    </label>
                    <select
                        // style={{ margin: "20px 0" }}
                        className={` py-3 group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
                        // style={{ width: "80%", margin: "0 0", height: "50px", paddingLeft: "10px", borderRadius: "15px", border: "none" }}
                        value={service}
                        onChange={handleService}
                    >
                        {servicesNames.map((serviceName, index) => (
                            <option style={{ border: "none", margin: "10px 0", padding: "10px 0" }} key={index} value={serviceName}>
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

            {/* <div className="mb-4">
          <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primaryBlue resize-none"
            placeholder="Service"
            required
          />
        </div> */}


            {/* </form> */}
        </div>
    );
};

export default ContactForm;