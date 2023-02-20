import OngoinPropertyConvo from "src/componets/userDashboard/PropertyConversestion";
import UserDasBoardNav from "src/componets/userDashboard/sideNav";

// give main area a max widht
const DashBoard = () => {
  return (
    <div className="flex min-h-screen space-x-14 bg-[#F6F6F6]">
      <div className="bg-white min-h-screen h-full pt-16 ">
        <UserDasBoardNav />
      </div>
      <div className=" p-8 w-full">
        <OngoinPropertyConvo />
      </div>
    </div>
  );
};

export default DashBoard;
