import { ReactElement } from "react";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import { Conversation } from "src/componets/userDashboard/PropertyConversestion";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { BuyersPageLayout } from ".";

const Buyers = () => {
  return (
    <>
      <div className="sapce-y-6">
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </>
  );
};
Buyers.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashBoardLayout Navbar={AgentNavbar}>
      <BuyersPageLayout>{page}</BuyersPageLayout>
    </DashBoardLayout>
  );
};

export default Buyers;
