import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, CircularProgress, Grid, Tab, Theme, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { AiOutlineHome, AiOutlineInfo, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { FaBuilding, FaLocationArrow } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { SiGoogleads } from 'react-icons/si';
import { Pagination, User } from 'src/@types';
import DashBoardLayout from 'src/Layout/DasboardsLayout';
import AdminsideNav from 'src/componets/admin/adminDasboardnav';
import CustomLoader from 'src/componets/shared/Loader';
import { PostingCard } from 'src/pages/agent/mypostings';
import { ProfileItem } from 'src/pages/agent/profile';

import { useAxios } from 'src/utills/axios';
import { ErrorDispaly } from '../property';

const CustomerDetail = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const instance = useAxios();
    const [users, setUsers] = useState<User[] | any | undefined | null>([]);
    const [property, setProperty] = useState<any | undefined | null>([]);
    const hideText = false
    const [activeTab, setActiveTab] = useState<string>('account')
    const router = useRouter();

    const { id } = router.query

    async function getAllUsers() {
        try {
            setLoading(true);
            const res = await instance.get(
                `/admin/user/getUserById/${id}`
            );
            if (res.data) {
                setUsers(res?.data?.data);
                setProperty(res?.data?.property);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            ErrorDispaly(e);
        }
    }
    const handleChange = (event: SyntheticEvent, value: string) => {
        setActiveTab(value)
    }

    useEffect(() => {
        if (id) {
            getAllUsers();
        }
    }, [id]);

    if (loading) {
        return <CustomLoader />
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TabContext value={activeTab}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <TabList
                                variant='scrollable'
                                scrollButtons='auto'
                                onChange={handleChange}
                                aria-label='customized tabs example'
                            >
                                <Tab
                                    value='account'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <MdPeople />
                                            {!hideText && 'Account'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value='property'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <FaBuilding />
                                            {!hideText && 'Property'}
                                        </Box>
                                    }
                                />
                                <Tab
                                    value='billing'
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                            <BiBookmark />
                                            {!hideText && 'Plan'}
                                        </Box>
                                    }
                                />

                            </TabList>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel sx={{ p: 0 }} value={'account'}>
                                <>
                                    <div className="my-5 space-y-5">
                                        <h2 className="text-xl text-TitleColor font-bold ">
                                            {users?.name}
                                        </h2>

                                    </div>
                                    <div className="text-[#4A4A4A] space-y-5 mt-10">
                                        <ProfileItem
                                            name="MOBILE NUMBER"
                                            value={`${users?.mobileNumber} `}
                                            Icon={AiOutlinePhone}
                                        />
                                        <ProfileItem
                                            name="EMAIL"
                                            value={users?.email}
                                            Icon={AiOutlineMail}
                                        />
                                        <ProfileItem
                                            name="PROPERTY COUNT"
                                            value={property?.length}
                                            Icon={AiOutlineHome}
                                        />
                                        <ProfileItem
                                            name="Lead COUNT"
                                            value={users?.leadCount}
                                            Icon={SiGoogleads}
                                        />
                                    </div>
                                </>
                            </TabPanel>
                            <TabPanel sx={{ p: 0 }} value={'property'}>


                                <div className="w-full space-y-5 scrollbar-hide mb-8">
                                    {property?.length > 0 ? (
                                        property.map((curElem: any) => {
                                            return <PostingCard key={curElem._id} {...curElem} />;
                                        })
                                    ) : (
                                        <p> No Data Available</p>
                                    )}
                                </div>

                            </TabPanel>
                            <TabPanel sx={{ p: 0 }} value={'billing'}>
                                <div className="mb-6">
                                    <h1 className="text-[22px] font-bold text-black mb-5">My Plans</h1>

                                    {users?.plan &&
                                        <div
                                            className="bg-white text-black rounded-lg shadow-lg p-6 mt-5 w-full sm:w-1/2"
                                        // ^-- Use full width on small screens, half width on larger screens
                                        >
                                            <div className="mb-6">
                                                <div className="flex flex-col sm:flex-row justify-between">
                                                    <p className="text-lg font-bold text-blue-600">Plan Name: {users.plan.name}</p>
                                                </div>

                                                <p className="text-lg font-bold mb-2 text-blue-600">Price: {users.plan.price}</p>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </TabContext>
            </Grid>
        </Grid>
    )
}

CustomerDetail.getLayout = function getLayout(page: ReactElement) {
    return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default CustomerDetail
