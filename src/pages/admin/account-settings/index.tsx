import { Grid, } from "@mui/material";
import React, { ReactElement, } from "react";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import TabSecurity from "src/componets/account/TabSecurity";


// give main area a max widht
const AccountSettings = () => {


    return (
        <div className=" w-full bg-[#F6F6F6] ">
            <div className="flex justify-between items-center">
                <div className="mb-5">
                    <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
                    <h2 className="text-TitleColor font-bold text-3xl">Account Settings</h2>
                </div>
            </div>

            <Grid container spacing={6} sx={{ pb: 4 }}>
                <Grid item xs={12}>
                    <TabSecurity />
                </Grid>
            </Grid>

        </div>
    );
};

AccountSettings.getLayout = function getLayout(page: ReactElement) {
    return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default AccountSettings;


