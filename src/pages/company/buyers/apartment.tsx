import { ReactElement, ReactNode } from "react";
import SideNav from "src/componets/company/companyNavbar";
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
    <DashBoardLayout Navbar={SideNav}>
      <BuyersPageLayout>{page}</BuyersPageLayout>
    </DashBoardLayout>
  );
};

export default Buyers;
