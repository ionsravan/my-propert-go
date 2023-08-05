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
import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
import {
    location,
    newResponse,
    Pagination,
    response,
    serviceUpdate,
    ticketUpdate,
    User,
} from "src/@types";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import { useAxios } from "src/utills/axios";

export const tableStyles = {
    "& .MuiDataGrid-cellContent": {
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
        paddingY: 1.5,
    },
    "& .MuiDataGrid-columnHeaders": {
        bgcolor: "#0078DB",
        borderRadius: 2,
        color: "white",
    },
    "& .MuiDataGrid-iconSeparator": {
        display: "none",
    },
    "& .MuiDataGrid-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter":
    {
        display: "none",
    },
    "& .MuiDataGrid-cell": {
        borderBottom: "none",
        paddingY: 1.5,
    },
    "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus":
    {
        outline: "none !important",
    },
};


// give main area a max widht
const CareServiceManagement = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [pageState, setPageState] = useState({
        page: 1,
        pageSize: 10,
    });

    const instance = useAxios();
    const [careData, setCareData] = useState<any[]>([]);
    const [pagination, setPagination] = useState<Pagination | undefined | null>(
        null
    );

    async function getAllTickets() {
        try {
            setLoading(true);
            const res = await instance.get(`/admin/getAllCareServiceRequests`);
            if (res.data) {
                setCareData(res?.data?.data);
                setPagination(res?.data?.pagination);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    useEffect(() => {
        getAllTickets();
    }, []);

    function handleChange(value: string, id: any) {
        setCareData((prev) =>
            prev.map((selectedExercise) => {
                if (selectedExercise._id === id?._id) {
                    return {
                        ...selectedExercise,
                        ['propertyId']: {
                            ...selectedExercise['propertyId'],
                            ["careService"]: value,
                        }
                    };
                }

                return selectedExercise;
            })
        );

        onSubmit({ status: value, propertyId: id?.propertyId?._id });
    }

    const all_customer_columns: GridColDef[] = [
        {
            flex: 0.12,
            field: "primaryImage",
            headerName: "Image",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) =>
                row?.propertyId?.propertyImages ? (
                    <Image alt="" width={200} height={90} style={{ objectFit: "contain", height: '90px' }} src={row?.propertyId?.propertyImages[0]} />
                ) : null,
        },
        {
            flex: 0.18,
            field: "name",
            headerName: "Peoperty Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.propertyId?.name}
                </Typography>
            ),
        }, {
            flex: 0.15,
            field: "location",
            headerName: "Location",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.propertyId?.location?.name}
                </Typography>
            ),
        },

        {
            flex: 0.1,
            field: "userName",
            headerName: "User Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.userId?.name}
                </Typography>
            ),
        },
        {
            flex: 0.2,
            field: "userEmail",
            headerName: "User Email",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.userId?.email}
                </Typography>
            ),
        },
        {
            flex: 0.2,
            field: "action",
            headerName: "Status",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Select
                    fullWidth
                    size="small"
                    onChange={(e) => handleChange(e.target.value, row)}
                    value={row?.propertyId?.careService}
                >
                    <MenuItem value={true}>Open</MenuItem>
                    <MenuItem value={false}>Closed</MenuItem>
                </Select>
            ),
        },
    ];

    async function onSubmit(data: serviceUpdate) {
        try {
            setLoading(true);
            const res = await instance.post("/admin/changeCareServiceStatus", data);
            if (res.data) {
                toast.success("Care Service request updated Successfully");
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return (
        <div className=" w-full bg-[#F6F6F6] ">
            <div className="flex justify-between items-center">
                <div className="mb-5">
                    <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
                    <h2 className="text-TitleColor font-bold text-3xl">Care Service Management</h2>
                </div>
                <div className="max-w-[140px] text-sm  w-full"></div>
            </div>
            {/* dashboard caerd */}

            <Grid container spacing={6} sx={{ pb: 4 }}>
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2 }}>
                        <DataGrid
                            rows={careData || []}
                            columns={all_customer_columns}
                            getRowId={(row) => row._id}
                            autoHeight
                            components={{
                                LoadingOverlay: LinearProgress,
                            }}
                            loading={loading}
                            getRowHeight={() => "auto"}
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

CareServiceManagement.getLayout = function getLayout(page: ReactElement) {
    return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default CareServiceManagement;
