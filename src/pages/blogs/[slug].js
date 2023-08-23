import { useRouter } from "next/router";
import react, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useAxios } from "src/utills/axios";
import { Footer, Navbar } from "src/componets";
// Dummy function to fetch blog content based on the slug
// const getBlogContent = async (slug) => {
//     // Simulating an API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Dummy blog content
//     const blogContent = {
//         title: `Blog ${slug.slice(4)}`,
//         content: `This is the content of Blog ${slug.slice(4)}.`,
//     };

//     return blogContent;
// };]\

const BlogPage = () => {
  const router = useRouter();
  const id = router.query["slug"];
  const { slug } = router.query;
  const instance = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState([]);

  async function getAllBlogs() {
    try {
      //   setLoading(true);

      const res = await instance.get(`/user/blog/getAllBlogs`);
      if (res.data) {
        setBlogs(res?.data?.blogs);
        // setPagination(res?.data?.pagination);
        // setLoading(false);
      }
    } catch (e) {
      //   setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    const filterBlogs = () => {
      const filterBlog = blogs?.filter((blog) => blog._id === id) ?? [];
      setBlog(filterBlog);
    };

    filterBlogs();
  }, [blogs]);

  return (
    <>
      <div>
        <div style={{ marginBottom: "30px" }}>
          <Navbar />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          className="slugContainer"
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="containers"
          >
            <div style={{ margin: "0 0" }}>
              {blog[0]?.tags.map((curTag) => (
                <span
                  style={{
                    margin: "15px 0",
                    color: "blue",
                    marginLeft: "20px",
                  }}
                >
                  {curTag}
                </span>
              ))}
            </div>

            <p
              style={{
                margin: "15px 0",
                fontSize: "35px",
                fontWeight: "bold",
                textAlign: "center",
                width: "80%",
                lineHeight: "40px",
              }}
            >
              {blog[0]?.tittle}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 0",
                marginBottom: "30px",
              }}
              className="autohorContainer"
            >
              {/* <div style={{ width: "45px", height: "45px", borderRadius: "50%",marginRight:"15px" }} className="authorImageDiv">
                        <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                    </div> */}
              {/* <div style={{padding:"10px 0"}} className="authorInfoDiv">
                    <p style={{ color: "grey", marginRight: "15px" }}>Mario Sanchez</p>
                    <p style={{ color: "grey", marginBottom: "5px" }}>October 21, 2022  8min read</p>
                    </div> */}
            </div>
            <div
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "600px",
                marginTop: "15px",
              }}
              className="imageContainers"
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src={blog[0]?.blogImage}
                alt=""
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: blog[0]?.description,
              }}
              style={{ width: "80%", margin: "15px 0" }}
            ></div>
            <p
              onClick={() => router.push("/blogs")}
              style={{
                display: "flex",
                alignItems: "center",
                color: "blue",
                cursor: "pointer",
              }}
            >
              <BsArrowLeft style={{ color: "blue" }} />
              View all posts
            </p>
          </div>

          <p style={{ marginTop: "70px" }}>
            Copyright © 2023 Stablo. All rights reserved.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
