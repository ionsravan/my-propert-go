import React, { ReactElement } from "react";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import AddProperty from "src/pages/addProperty";

const AddProperties = () => {
  return <AddProperty />;
};

AddProperties.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default AddProperties;
