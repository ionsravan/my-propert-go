import { AxiosInstance } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { Agent, location, response, area, AvailableFor, Propery, Buyer, Tickets } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import CircularSpinner from "src/componets/circularLoader";
import { useAppContext } from "src/Context/AppContext";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { ErrorDispaly } from "../admin/property";

const Card = ({ name, Value }: { name: string; Value: number | string }) => {
  return (
    <div className="bg-white w-full rounded-lg flex space-x-3 items-center px-[15px] py-5 max-w-[140px]">
      <div>
        <p className="text-TitleColor text-xl font-bold">{Value}</p>
        <p className="text-[#A3AED0] text-xs font-medium">{name}</p>
      </div>
    </div>
  );
};


interface SuggestionCardProps {
  propertiesData: Agent;
}

const SuggestionCard = ({ propertiesData }: SuggestionCardProps) => {
  // console.log("PropertiesData inside SuggestionCard:", propertiesData);
  return (
    <div className="flex flex-col items-center space-y-3 p-5 relative">
      <div className="p-1 border-2 border-primaryBlue rounded-full w-max flex justify-center">
        <div className="h-[86px] w-[86px] relative rounded-full">
          <Image
            src={"/home.png"}
            fill
            className="object-fill rounded-full"
            alt="villa4"
          />
        </div>
        <div className="bg-[#2E5CA0] flex justify-center items-center absolute p-1 px-2 z-20 top-2">
          <p className="text-white text-xs">9</p>
        </div>
      </div>
      <div className="text-TitleColor">
        <h1 className="text-sm font-normal">{propertiesData.name}</h1>
        <p className="text-[11px] opacity-60 text-[#8993A4]">
          {/* {propertiesData.location} */}
        </p>
      </div>
    </div>
  );
};


interface PostingByDeveloperProps {
  propertiesData: Agent[];
  isLoading: Agent[];
}
export const PostingByDeveloper = ({ propertiesData, isLoading }: PostingByDeveloperProps) => {
  console.log("PropertiesData inside SuggestionCard:", propertiesData);
  return (
    <>
      {" "}
      <div className="">
        <div className="bg-white rounded-sm mb-9 p-6 relative ">
          <div className="flex justify-between">
            <div>
              <h1 className="text-sm md:text-[19px] font-bold text-TitleColor ">
                My Postings by Developers
              </h1>
              <p className="text-xs md:text-sm text-[#888888] font-normal ">
                Inspired by your search preferences
              </p>
            </div>
            <button className="text-primaryBlue text-xs md:text-lg font-normal">
              view All
            </button>
          </div>

          <div>
            {isLoading ? (
              <CircularSpinner />
            ) : (
              <div className="flex mt-8 space-x-5 overflow-hidden">
                {propertiesData?.length > 0 ? (
                  propertiesData.map((curElem) => {
                    return <SuggestionCard key={curElem._id} propertiesData={curElem} />;
                  })
                ) : (
                  <p> No Data Available</p>
                )}

              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export const addProperty = async (
  instance: AxiosInstance,
  name: string,
  cost: string,
  desccription: string,
  size: string,
  availableFor: AvailableFor,
  BHKconfig: string,
  amenities: string[],
  location: location | null,
  area: area | null,
  adress: string,
  propertyType: AvailableFor,
  files: any,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const data = new FormData();
  if (location?.name && location._id && area?.name && area?._id) {
    data.append("name", name);
    data.append("cost", cost);
    data.append("description", desccription);
    data.append("size", size);
    data.append("availableFor", availableFor.name);
    data.append("BHKconfig", BHKconfig);
    data.append("amenities", JSON.stringify(amenities));
    data.append("location", location?.name);
    data.append("locationId", location?._id);
    data.append("area", area?.name);
    data.append("areaId", area?._id);
    data.append("address", adress);
    data.append("propertyType", propertyType?.name);
    Array.from(files).forEach((file: any) => {
      data.append("photos", file);
    });
  }
  try {
    setLoading(true);
    const res = await instance.post("/agent/property/addProperty", data);
    setLoading(false);
    return res;
  } catch (e) {
    toast("Error while adding property", {
      position: "bottom-center",
      type: "error",
    });
    console.log(e);
    setLoading(false);
    return null;
  }
};

const AgentDashBoard = () => {
  const { data, error } = useFetch<response<Agent>>("/user/property");
  const instance = useAxios();
  const [propertiesData, setPropertiesData] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["jwtToken"]);
  const [myPlan, setMyPlan] = useState({})

  const [userId, setUserId] = useState<string | null>(null);
  const { data: leads } = useFetch<response<Buyer[]>>(
    `/user/getLeadsByUserId/${userId}`
  );

  const { data: tickets } = useFetch<response<Tickets[]>>(
    `/user/ticket/getTicketByUserId/${userId}`
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const { setAgentId } = useAppContext();



  useEffect(() => {
    if (cookies.jwtToken === undefined) {
      router.push(`/login`)
    }
  }, [])


useEffect(() => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (isAdmin) {
    router.push('/login');
    toast("Please Login as a User")
  }
}, []);





useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await instance.get("/user/getPlansByUserId");
      if (res?.data) {
        // setIsLoading(false)
        setMyPlan(res.data.myPlan)
        // console.log(res.data.myPlan,"sssss")

      }
    } catch (e) {
      ErrorDispaly(e);
    }
  };
  fetchData();
}, [])


  useEffect(() => {
    if (data?.result && data.result.length > 0) {
      const firstAgent = data.result[0];
      const userId = firstAgent.agentId;
      setAgentId(firstAgent._id);
      setPropertiesData(data.result);
      localStorage.setItem("userId", userId);
      console.log(userId, "userId");
      setIsLoading(false)
    } else {
      // const defaultUserId = "649ac09732b08547ed03b09a";
      // localStorage.setItem("userId", defaultUserId);
      // toast(" No Data Available")
      // console.log(defaultUserId, "userId (default)");
    }
  }, [data]);


  if (data) {
    console.log(propertiesData, "res")
  }

  // if (!data) {
  //   setPropertiesData([]);
  // }''




  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = () => {
    setTimeout(() => {
      // removeCookie("jwtToken");
      deleteCookie('jwtToken');
      localStorage.removeItem('userId');
      router.push("/")

      toast("Logout Succesfully", {
        position: "bottom-center",
        type: "success",
      });
     
     
    }, 1000);

  }

  return (
    <>
      <div  className="flex justify-between w-full items-center font-manrope">
        <div>
          <h1 className="text-[#707EAE] text-[10.94px]">user</h1>
          <h2 className="text-TitleColor font-bold text-[26px]">
            {/* Hello {data?.result?.name} */}
            Hello
          </h2>
        </div>
        <div>
        <button onClick={handleLogout} className="text-white font-medium  bg-[#0066FF] rounded-full px-5 py-1  transition transform active:scale-95 duration-200">Logout</button>
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card name="Properties" Value={propertiesData ? propertiesData.length : 0} />
        <Card name="Leads" Value={leads ? leads.result.length : 0} />
        <Card name="Tickets" Value={tickets ? tickets.ticket.length : 0} />
      </div>
      <h2 className="text-TitleColor font-bold text-[26px]">
            {/* Hello {data?.result?.name} */}
            {/* The current plan is {myPlan !== undefined  ? null : "Starter"} */}
            {myPlan !== undefined ? "The current plan is" : "No plans"}
          </h2>
      {myPlan !== undefined &&
            <div
            className="bg-white text-black rounded-lg shadow-lg p-6 mt-5 w-full sm:w-1/2"
            // ^-- Use full width on small screens, half width on larger screens
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between">
                <p className="text-xl font-bold mb-2">Name: {myPlan.userName}</p>
                <p className="text-lg font-bold text-blue-600">Plan Name: {myPlan.planName}</p>
              </div>

              <p className="text-lg font-bold mb-2">Email: {myPlan.userEmail}</p>
              <p className="text-lg font-bold mb-2">Lead Count: {myPlan.leadCount}</p>
              <p className="text-lg font-bold mb-2 text-blue-600">Price: {myPlan.price}</p>
            </div>
          </div>
          }


      {/* <div className="mb-8">
        <h1 className="text-black text-lg">Leads</h1>
        <div className="flex space-x-[17px] mt-5">
          <Card name="Properties" Value={18} />
          <Card name="On Discussion" Value={8} />
          <Card name="Views" Value={"130k"} />
        </div>
      </div> */}
      {/* <PostingByDeveloper isLoading={isLoading} propertiesData={propertiesData} /> */}
    </>
  );
};

AgentDashBoard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};

export default AgentDashBoard;
