import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPencil, BsPencilFill } from "react-icons/bs";
import { MdDeleteForever, MdDescription, MdTitle } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { Pagination, User } from "src/@types";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import ConfirmBox from "src/componets/shared/ConfirmDialog";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { tableStyles } from "../tickets";
import Modal from "src/componets/shared/modal";
import FormProvider from "src/componets/shared/RHF/FormProvider";
import RHFTextField from "src/componets/shared/RHF/RHFTextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addForm, iconClass } from "../customers/edit/[id]";
import { RHFUpload } from "src/componets/shared/RHF/RHFUpload";
import { GiMetalDisc } from "react-icons/gi";
// import Image from "src/componets/shared/Image";
import { CustomFile } from "src/componets/shared/upload";
import Image from "next/image";
import TextEditor, { convertToRawEditorState } from "src/componets/shared/TextEditor";

import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'
import { ErrorDispaly } from "../property";

interface NewBlogTypes {
  photos?: CustomFile | string | null;
  title: string;
  description: string;
  metaDescription: string;
}

const NewCompanyValidationSchema = Yup.object().shape({
  photos: Yup.mixed().required("Photo is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  metaDescription: Yup.string().required("Meta Description is required"),
});

const defaultValues = {
  metaDescription: "",
  description: "",
  title: "",
  photos: "",
};


const styleMt = {
  mt: 2,
};
// give main area a max widht
const Blogs = () => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editorValue, setEditorValue] = useState('')

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  const instance = useAxios();
  const [blogs, setBlogs] = useState<User[] | undefined | null>([]);
  const [pagination, setPagination] = useState<Pagination | undefined | null>(
    null
  );
  const router = useRouter();

  const methods = useForm<NewBlogTypes>({
    mode: "onChange",
    resolver: yupResolver(NewCompanyValidationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    resetField,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  async function getAllBlogs() {
    try {
      setLoading(true);

      const res = await instance.get(`/user/blog/getAllBlogs`);
      if (res.data) {
        setBlogs(res?.data?.blogs);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  async function onSubmit(data: NewBlogTypes) {
    try {
      setDeleteLoading(true);
      var bodyFormData = new FormData();
      if (data?.photos instanceof File) {
        bodyFormData.append("photos", data.photos);
      }
      bodyFormData.append("tittle", data?.title);
      bodyFormData.append("description", data?.description);
      bodyFormData.append("metaDescription", data?.metaDescription);
      let res;
      if (edit) {
        let bD = {
          tittle: data?.title,
          description: data?.description,
          id: deleteId,
          metaDescription: data?.metaDescription,
        };
        res = await instance.put("/admin/blog/editBlog", bD);
      } else {
        res = await instance.post("/admin/blog/postBlog", bodyFormData);
      }
      if (res.data) {
        toast.success("Blogs Updated Successfully");
        setDeleteLoading(false);
        setDialogOpen(false);
        getAllBlogs();
      }
    } catch (e) {
      setDeleteLoading(false);
      ErrorDispaly(e);
    }
  }

  function openEdit(data: any) {
    reset({
      metaDescription: data?.metaDescription || "",
      description: data?.description || "",
      title: data?.tittle || "",
      photos: data?.blogImage[0] || "",
    });
    setEditorValue(convertToRawEditorState(data?.description))


    setDeleteId(data?._id);
    setDialogOpen(true);
    setEdit(true);
  }

  function closeDialog() {
    reset(defaultValues);
    setDialogOpen(false);
  }

  const all_customer_columns: GridColDef[] = [
    {
      minWidth: 120,

      flex: 0.2,
      field: "tittle",
      headerName: "Title",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography variant="body1" fontWeight={500}>
          {row?.tittle}
        </Typography>
      ),
    },
    {
      minWidth: 120,

      flex: 0.3,
      field: "description",
      headerName: "Description",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography dangerouslySetInnerHTML={{ __html: row?.description }}
        >

        </Typography>
      ),
    },
    {
      minWidth: 120,

      field: "metaDescription",
      headerName: "Meta Description",
      flex: 0.15,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      field: "blogImage",
      headerName: "Image",
      flex: 0.25,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box sx={{ maxHeight: 200 }} >
          {row?.blogImage?.length > 0 ? (
            <Image width={150} height={80} src={row?.blogImage[0]} alt="" />
          ) : null}
        </Box>
      ),
    },
    {
      minWidth: 120,

      field: "action",
      headerName: "ACTION",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Edit">
            <IconButton onClick={() => openEdit(row)} color="primary">
              <BsPencilFill />
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

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("photos", newFile, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [setValue]
  );

  async function deleteBlog() {
    try {
      setDeleteLoading(true);
      const res = await instance.delete("/admin/blog/deleteBlog/" + deleteId);
      if (res.data) {
        toast.success("Blog Deleted Successfully");
        setDeleteLoading(false);
        setDeleteOpen(false);
        getAllBlogs();
      }
    } catch (err: any) {
      setDeleteLoading(false);
      console.log(err);
      toast.error(
        err.response?.data?.message || "Something went wrong on our side"
      );
    }
  }

  const handleTemplateChange = (data: any) => {
    setEditorValue(data)
    let htmVal = draftToHtml(convertToRaw(data.getCurrentContent()))
    setValue('description', htmVal)
  }


  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Blogs</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full">
          <button
            onClick={() => {
              setDialogOpen(true);
              setEdit(false);
            }}
            className=" text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            <span>
              <TbEdit />
            </span>
            <span>Add New</span>
          </button>
        </div>
      </div>

      <Grid container spacing={6} sx={{ pb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <DataGrid
              rows={blogs || []}
              columns={all_customer_columns}
              getRowId={(row) => row._id}
              autoHeight
              components={{
                LoadingOverlay: LinearProgress,
              }}
              pageSizeOptions={[25, 50, 75, 100]}

              loading={loading}
              getRowHeight={() => "auto"}
              // pagination
              // rowsPerPageOptions={[5, 10, 25]}
              // rowCount={pagination?.totalblogs || 0}
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

      <Modal
        title={edit ? "Update Blog" : "Add Blog"}
        open={dialogOpen}
        closeDialog={closeDialog}
        size="md"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            placeholder="Title"
            InputProps={{
              startAdornment: <MdTitle className={iconClass} />,
            }}
            sx={addForm}
            name="title"
          />
          <RHFTextField
            placeholder="Meta Description"
            InputProps={{
              startAdornment: <GiMetalDisc className={iconClass} />,
            }}
            sx={{ ...addForm, ...styleMt }}
            name="metaDescription"
          />

          <TextEditor
            value={editorValue}
            handleChange={handleTemplateChange}


          />

          {/* <RHFTextField
            placeholder="Description"
            InputProps={{
              startAdornment: <MdDescription className={iconClass} />,
            }}
            sx={{
              ...addForm,
              ...styleMt,

              "& .MuiOutlinedInput-root": { alignItems: "baseline" },
            }}
            name="description"
            multiline
            minRows={2}
          /> */}

          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            {watch("photos") && (
              <button
                // size="small"
                // variant="contained"
                onClick={() => resetField("photos")}
              // color="error"
              // startIcon={<Iconify icon="gg:trash" width={18} />}
              >
                Remove Image
              </button>
            )}
          </Grid>

          <RHFUpload
            name="photos"
            maxSize={3000000}
            onDrop={handleDrop}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={deleteLoading}
            className={`${deleteLoading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
              } flex justify-center w-[100%] p-4 rounded-xl text-white text-center  transform transition active:scale-95 duration-200 ease-out mt-4`}
          >
            {deleteLoading ? (
              <CircularProgress size={25} sx={{ mr: 2 }} color="inherit" />
            ) : edit ? (
              "Update Blog"
            ) : (
              "Add Blog"
            )}
          </button>
        </FormProvider>
      </Modal>

      <ConfirmBox
        title="Blog"
        name="blog"
        open={deleteOpen}
        closeDialog={() => setDeleteOpen(false)}
        toDoFunction={deleteBlog}
        loading={deleteLoading}
      />
    </div>
  );
};

Blogs.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Blogs;
