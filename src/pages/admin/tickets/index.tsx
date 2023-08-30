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
import { ErrorDispaly } from "../property";

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

// give main area a max widht
const TIcketsManagement = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  const instance = useAxios();
  const [tickets, setTickets] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | undefined | null>(
    null
  );

  async function getAllTickets() {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/ticket/getAllTickets`);
      if (res.data) {
        setTickets(res?.data?.tickets);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getAllTickets();
  }, []);

  function handleChange(value: string, id: string) {
    setTickets((prev) =>
      prev.map((selectedExercise) => {
        if (selectedExercise._id === id) {
          return {
            ...selectedExercise,
            ["ticketStatus"]: value,
          };
        }

        return selectedExercise;
      })
    );

    onSubmit({ ticketStatus: value, ticketId: id });
  }

  const all_customer_columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 120,

      field: "tittle",
      headerName: "Ticket Detail",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography textTransform='capitalize' variant="body1" fontWeight={500}>
          {row?.tittle}
        </Typography>
      ),
    },
    {
      minWidth: 160,

      flex: 0.4,
      field: "message",
      headerName: "Message",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      flex: 0.1,
      minWidth: 120,

      field: "userName",
      headerName: "User Name",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      flex: 0.2,
      field: "userEmail",
      headerName: "User Email",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 150,

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
          onChange={(e) => handleChange(e.target.value, row?._id)}
          value={row?.ticketStatus}
        >
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="close">Closed</MenuItem>
        </Select>
      ),
    },
  ];
  // router.post("/user/ticket/changeTicketStatus", adminAuthMiddleware,changeTicketStatus);

  async function onSubmit(data: ticketUpdate) {
    try {
      setLoading(true);
      const res = await instance.post("/admin/ticket/changeTicketStatus", data);
      if (res.data) {
        toast.success("Ticket updated Successfully");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Tickets</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full"></div>
      </div>
      {/* dashboard caerd */}

      <Grid container spacing={6} sx={{ pb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <DataGrid
              rows={tickets || []}
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

TIcketsManagement.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default TIcketsManagement;
