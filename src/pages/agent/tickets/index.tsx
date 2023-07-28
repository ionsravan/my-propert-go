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
// import Modal from 'react-modal';
import axios from "axios";
import { useCookies } from "react-cookie";
import Modal from "src/componets/shared/modal";


// let userId: string = "649ac09732b08547ed03b09a"



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

  return <>

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
          style={{ fontWeight: "normal" }}
          onClick={handleFormSubmit}
          className="px-4 py-2 bg-[#0066FF] rounded-full text-white  shadow"
        >
          Submit
        </button>
      </div>
    </form>

  </>
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

  const [userId, setUserId] = useState<string | null>(null);

  const { data, status } = useFetch<response<Tickets[]>>(
    `/user/ticket/getTicketByUserId/${userId}`
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

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
          {/* <div>
            <CustomPopup/>
          </div> */}
          <button className="text-white font-medium justify-center bg-[#0066FF] rounded-full py-0 px-5 flex space-x-2 items-center transition transform active:scale-95 duration-200" onClick={openModal}>
            <span style={{ marginRight: "5px", fontSize: "1.5rem" }}>+</span> Add
          </button>
          <Modal
            open={isModalOpen}
            closeDialog={closeModal}
            title="Add Tickets"
            size="sm"
          >

            <CustomPopup closePopup={closeModal} />
          </Modal>

        </div>

        <div className="space-y-5">
          {data?.ticket.length > 0 ? (
            data.ticket.map((buyer) => <TicketCard {...buyer} key={buyer._id} />)
          ) : (
            <p>No Tickets Available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Ticket;

Ticket.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};
