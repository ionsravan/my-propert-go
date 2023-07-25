import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineInfo,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FaEdit, FaLocationArrow, FaRupeeSign } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { toast } from "react-toastify";
import { Agent, response, Tickets } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { FetchState } from "src/lib/hooks/useFetch";
import Modal from 'react-modal';
import axios from "axios";
import { useCookies } from "react-cookie";


let userId: string = "649ac09732b08547ed03b09a"

interface FormData {
  tittle: string;
  message: string;
}



const CustomPopup: React.FC = () => {
  const [cookies] = useCookies(["jwtToken"]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tittle: '',
    message: '',
  });

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    try {
      const response = await axios.post(
        "https://my-property-go-backend.onrender.com/api//user/ticket/addTicket",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "authorization": `Bearer ${cookies.jwtToken}`,
          },
        }
      );
      toast.success('Ticket added successfully!', {
        position: 'top-right',
        autoClose: 3000, // Duration for which the toast will be displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error while adding property:", error);
    }
 
    setFormData({
      tittle: '',
      message: '',
    });
    closePopup();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <>
      {/* <button  className="popup-trigger">
        Open Popup
      </button> */}
    <button
        onClick={openPopup}
        className="flex items-center justify-center px-4 py-2 bg-gray-200 text-white rounded-lg shadow hover:bg-gray-300"
      >
        <span className="text-2xl font-bold mr-2">+</span> Add
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-80">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closePopup}
            >
              close
            </button>
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Add Ticket</h2>
              <button  onClick={closePopup}>
                x
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="tittle" className="block font-bold mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  id="tittle"
                  name="tittle"
                  value={formData.tittle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div> */}
              <div className="mb-4">
                <label htmlFor="message" className="block font-bold mb-1">
                  Message:
                </label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};






const TicketCard = ({ tittle, userEmail, userName, message, ticketStatus }) => {
  // console.log(buyer,"ticket")
  return (

    <div className="bg-white text-black rounded-lg shadow-lg p-6 mt-5">
      <div className="mb-6">
        <div className="flex justify-between">
        <p className="text-xl font-bold mb-2">Title: {tittle}</p>
        <p className="text-lg font-bold">Ticket Status: {ticketStatus}</p>
        </div>

        <p className="text-lg font-bold mb-2">Name: {userName}</p>
        <p className="text-lg font-bold mb-2">Message: {message}</p>
      
      </div>
    </div>


  );
};
const Ticket = () => {

  const { data, status } = useFetch<response<Tickets[]>>(
    `/user/ticket/getTicketByUserId/${userId}`
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data?.result) {
      console.log(data.result, "datta")
    }
  }, [data])


  return (
    <>
      {/* <h1>Ticket Page</h1> */}
      <div className="mb-6">
        <div className="flex justify-between">
          <h1 className="text-[22px] font-bold text-black mb-5">Tickets</h1>
          <div>
            <CustomPopup/>
          </div>


        </div>

        <div className="space-y-5">
          {data?.ticket.map((buyer) => {
            return <TicketCard {...buyer} key={buyer._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Ticket;

Ticket.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};
