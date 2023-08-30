import {
  Box,
  Card,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
import {
  location,
  newResponse,
  Pagination,
  propertyStatus,
  response,
  ticketUpdate,
  User,
} from "src/@types";
import { AdminCustomers } from "../../../componets/user/adminCustomer";
import AdminsideNav from "../../../componets/admin/adminDasboardnav";
import ConfirmBox from "src/componets/shared/ConfirmDialog";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { tableStyles } from "../tickets";
import Image from "src/componets/shared/Image";
import { formatCost } from "src/componets/costFormat/PropertyCost";

export const Button = ({
  name,
  Icon,
  Color,
}: {
  name: string;
  Icon: React.ElementType;
  Color: string;
}) => {
  return (
    <div
      className={
        Color +
        " bg-white font-bold w-full rounded-sm shadow-sm flex space-x-1 items-center justify-center px-4 p-1 max-w-max border border-[#DEDEDE]"
      }
    >
      <div className="text-xs">{<Icon />}</div>
      <div>
        <p className=" text-[10px]">{name}</p>
      </div>
    </div>
  );
};

export const ErrorDispaly = (e: any) => {
  toast.error(e?.response?.data?.message || "Something Went Wrong");

}

const userTypes = ["All", "Project"];

// give main area a max widht
const Property = () => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  const instance = useAxios();
  const [users, setUsers] = useState<User[] | undefined | null>([]);
  const [pagination, setPagination] = useState<Pagination | undefined | null>(
    null
  );
  const [name, setName] = useState<string>("");
  const [selected, setSelected] = useState("All");
  const router = useRouter();

  async function getAllUsers() {
    let pr = selected === "All" ? false : true;
    try {
      setLoading(true);
      const res = await instance.get(
        `/property/getAllProperties?search=${name || ""}&toggle=${selected}`
      );
      if (res.data) {
        setUsers(res?.data?.data);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [selected, name]);

  async function deleteCustomer() {
    try {
      setDeleteLoading(true);
      const res = await instance.delete("/admin/user/deleteUser/" + deleteId);
      if (res.data) {
        toast.success("Customer Deleted Successfully");
        setDeleteLoading(false);
        setDeleteOpen(false);
        getAllUsers();
      }
    } catch (e) {
      setDeleteLoading(false);
      ErrorDispaly(e);
    }
  }

  function handleChange(value: string, id: string) {
    setUsers((prev) =>
      prev.map((selectedExercise) => {
        if (selectedExercise._id === id) {
          return {
            ...selectedExercise,
            ["status"]: value,
          };
        }

        return selectedExercise;
      })
    );

    onSubmit({ status: value, propertyId: id });
  }

  async function onSubmit(data: propertyStatus) {
    try {
      setLoading(true);
      const res = await instance.put(
        "/admin/property/changePropertyStatus",
        data
      );
      if (res.data) {
        toast.success("Property updated Successfully");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  const all_customer_columns: GridColDef[] = [

    {
      minWidth: 150,
      flex: 0.1,
      field: "_id",
      headerName: "Id",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    }, {
      minWidth: 140,
      flex: 0.1,
      field: "primaryImage",
      headerName: "Image",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) =>
        row?.primaryImage ? (
          <Image src={row?.primaryImage} border={true} zoom={true}></Image>
        ) : null,
    },

    {
      minWidth: 100,
      flex: 0.15,
      field: "name",
      headerName: "Name",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography variant="body1" fontWeight={500}>
          {row?.name}
        </Typography>
      ),
    },
    {
      minWidth: 50,

      flex: 0.05,
      field: "BHKconfig",
      headerName: "BHK",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 130,

      flex: 0.12,
      field: "propertyType",
      headerName: "Property Type",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 100,

      field: "location",
      headerName: "Location",
      flex: 0.13,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Tooltip title={row?.location?.name}>
          <Typography
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            variant="body1" fontWeight={500}>
            {row?.location?.name}
          </Typography>
        </Tooltip>
      ),
    },
    {
      minWidth: 80,

      field: "size",
      headerName: "Size",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      field: "cost",
      headerName: "Price",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography>{formatCost(row?.cost)}</Typography>
      ),
    },
    {
      minWidth: 100,

      field: "agentId",
      headerName: "User Name",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography>{row?.agentId?.name}</Typography>
      ),
    },
    {
      minWidth: 100,

      field: "mobileNumber",
      headerName: "Mobile",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography>{row?.agentId?.mobileNumber}</Typography>
      ),
    },
    {
      minWidth: 150,

      flex: 0.15,
      field: "status",
      headerName: "Status",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Select
          fullWidth
          size="small"
          onChange={(e) => handleChange(e.target.value, row?._id)}
          value={row?.status ? row?.status : "active"}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">InActive</MenuItem>
        </Select>
      ),
    },
    {
      minWidth: 100,

      field: "action",
      headerName: "ACTION",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => router.push(`/admin/property/edit/${row._id}`)}
              color="primary"
            >
              <BsPencil />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setDeleteId(row?._id);
                setDeleteOpen(true);
              }}
              color="error"
            >
              <MdDeleteForever />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Properties</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full">
          <button
            onClick={() => router.push("/admin/property/add")}
            className=" text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            <span>
              <TbEdit />
            </span>
            <span>Add New</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-8">
        <div className="space-x-5">
          {userTypes.map((u) => {
            return (
              <button
                onClick={() => {
                  setSelected(u);
                }}
                key={u}
                className={` p-2 ${selected == u
                  ? "text-primaryBlue  border-b border-primaryBlue"
                  : "text-[#616161]"
                  }`}
              >
                {u}
              </button>
            );
          })}
        </div>

        {/* <div className="flex space-x-[12px]">
          <div className="flex items-center bg-white p-2 space-x-3">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              name=""
              id=""
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="search"
              className="outline-none"
            />
          </div>
        </div> */}
      </div>
      {/* dashboard caerd */}

      <Grid container spacing={6} sx={{ pb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <DataGrid
              rows={users || []}
              columns={all_customer_columns}
              getRowId={(row) => row._id}
              autoHeight
              components={{
                LoadingOverlay: LinearProgress,
              }}
              loading={loading}
              getRowHeight={() => "auto"}
              pagination
              pageSizeOptions={[25, 50, 75, 100]}
              // rowCount={pagination?.totalUsers || 0}
              // page={pageState.page - 1}
              // pageSize={pageState.pageSize}
              // paginationMode="server"
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

      {/* {users && <AdminCustomers users={users} />} */}

      <ConfirmBox
        title="Property"
        name="property"
        open={deleteOpen}
        closeDialog={() => setDeleteOpen(false)}
        toDoFunction={deleteCustomer}
        loading={deleteLoading}
      />
    </div>
  );
};

Property.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Property;
