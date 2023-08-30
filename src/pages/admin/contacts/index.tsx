import {
    Card,
    Grid,
    LinearProgress,
    MenuItem,
    Select,
    Tooltip,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { ReactElement, useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
import {
    location,
    newResponse,
    Pagination,
    response,
    ticketUpdate,
    User,
} from "src/@types";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import { useAxios } from "src/utills/axios";
import { tableStyles } from "../tickets";
import { ErrorDispaly } from "../property";

// give main area a max widht
const ContactsManagement = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [pageState, setPageState] = useState({
        page: 1,
        pageSize: 10,
    });

    const instance = useAxios();
    const [contacts, setContacts] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination | undefined | null>(
        null
    );

    async function getAllContactDetails() {
        try {
            setLoading(true);
            const res = await instance.get(`/admin/getAllContactDetails`);
            if (res.data) {
                setContacts(res?.data?.data);
                setPagination(res?.data?.pagination);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            ErrorDispaly(e);
        }
    }

    useEffect(() => {
        getAllContactDetails();
    }, []);


    const all_customer_columns: GridColDef[] = [
        {
            flex: 0.2,
            minWidth: 120,

            field: "name",
            headerName: "Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography textTransform='capitalize' variant="body1" fontWeight={500}>
                    {row?.name}
                </Typography>
            ),
        },
        {
            flex: 0.4,
            minWidth: 150,

            field: "message",
            headerName: "Message",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            flex: 0.2,
            minWidth: 120,

            field: "email",
            headerName: "Email",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            flex: 0.2,
            minWidth: 120,

            field: "service",
            headerName: "Service",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
    ];

    return (
        <div className=" w-full bg-[#F6F6F6] ">
            <div className="flex justify-between items-center">
                <div className="mb-5">
                    <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
                    <h2 className="text-TitleColor font-bold text-3xl">Contacts Management</h2>
                </div>
                <div className="max-w-[140px] text-sm  w-full"></div>
            </div>
            {/* dashboard caerd */}

            <Grid container spacing={6} sx={{ pb: 4 }}>
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2 }}>
                        <DataGrid
                            rows={contacts || []}
                            columns={all_customer_columns}
                            getRowId={(row) => row._id}
                            autoHeight
                            components={{
                                LoadingOverlay: LinearProgress,
                            }}
                            loading={loading}
                            getRowHeight={() => "auto"}
                            pageSizeOptions={[25, 50, 75, 100]}

                            // pagination
                            // pageSize={pageState.pageSize || 10}
                            // rowCount={pagination?.totalUsers || 0}
                            // page={pageState.page - 1}
                            // paginationMode="server"
                            // rowsPerPageOptions={[5, 10, 25]}
                            // onPageChange={(newPage: number) => {
                            //   setPageState((old) => ({ ...old, page: newPage + 1 }));
                            // }}
                            // onPageSizeChange={(newPageSize: number) =>
                            //   setPageState((old) => ({ ...old, pageSize: newPageSize }))
                            // }
                            sx={tableStyles}
                        />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

ContactsManagement.getLayout = function getLayout(page: ReactElement) {
    return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default ContactsManagement;
  // /admin/getAllContactDetails