import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAxios } from "src/utills/axios";
import { useRouter } from "next/router";
import { Footer, Navbar } from "src/componets";
import CircularSpinner from "src/componets/circularLoader";
import { toast } from "react-toastify";

// Dummy blog data
const blogs = [
  { slug: "blog1", title: "Blog 1", content: "This is the content of Blog 1." },
  { slug: "blog2", title: "Blog 2", content: "This is the content of Blog 2." },
  // Add more blogs as needed
];

const BlogList = () => {
  const router = useRouter();
  const { slug } = router.query;
  const instance = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllBlogs() {
    try {
      //   setLoading(true);

      const res = await instance.get(`/user/blog/getAllBlogs`);
      if (res.data) {
        setBlogs(res?.data?.blogs);
        setIsLoading(false);
        // setPagination(res?.data?.pagination);
        // setLoading(false);
      }
    } catch (e) {
      //   setLoading(false);
      console.log(e);
      toast.error(e?.response?.data?.message || "Something Went Wrong");
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (blogs.length > 0) {
    console.log(blogs, "blogs");
  }

  return (
    <>
      {/* <div>
            {blogs.map((blog) => (
                <Link href={`/blogs/${blog.slug}`} key={blog.slug}>
                    <h2>{blog.title}</h2>
                </Link>
            ))}
        </div> */}

      <div>
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularSpinner />
          </div>
        ) : (
          <div>
            <Navbar />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "40px 0",
              }}
              className="blogContainer"
            >
              <div className="container">
                <h1 className="text-center my-8 text-2xl font-bold">Blogs</h1>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                  className="mainCardContainer"
                >
                  {blogs.length > 0 ? (
                    blogs.map((curElem) => (
                      <div
                        key={curElem._id}
                        style={{ width: "48%", padding: "10px 0" }}
                        className="mainCard"
                      >
                        <Link href={`/blogs/${curElem._id}`}>
                          <div>
                            <div
                              style={{
                                borderRadius: "10px",
                                width: "100%",
                                height: "300px",
                                overflow: "hidden",
                              }}
                              className="imageContainer"
                            >
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                                src={curElem.blogImage[0] || "/bighouse.png"}
                                alt=""
                              />
                            </div>
                            <p style={{ margin: "15px 0", color: "blue" }}>
                              {curElem.tittle}
                            </p>

                            <p
                              dangerouslySetInnerHTML={{
                                __html: curElem?.description,
                              }}
                            ></p>
                            {/* <div style={{ display: "flex", alignItems: "center" }} className="autohorContainer">
                                        <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                            <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src={curElem.authorImage} alt="" />
                                        </div>
                                        <span style={{ color: "grey", marginLeft: "15px", marginBottom: "5px", marginRight: "15px" }}>Mario Sanchez</span>
                                        <span style={{ color: "grey", marginBottom: "5px" }}>October 21, 2022</span>
                                    </div> */}
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>

            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
{
  /* <div style={{ width: "48%", padding: "10px 0" }} className="mainCard">
                        <Link href="/blogs/blog1"> 
                            <a>
                                <div style={{ borderRadius: "10px" }} className="imageContainer">
                                    <img style={{ width: "100%", objectFit: "cover", borderRadius: "10px" }} src="https://images.unsplash.com/photo-1687579520892-5160c0df4b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                                </div>
                                <p style={{ margin: "15px 0", color: "blue" }}>TECHNOLOGY</p>
                                <p style={{ margin: "15px 0", fontSize: "20px", fontWeight: "bold" }}>Architectural Engineering Wonders of the modern era for your Inspiration</p>
                                <div style={{ display: "flex", alignItems: "center" }} className="autohorContainer">
                                    <div style={{ width: "22px", height: "22px", borderRadius: "50%" }} className="authorImageDiv">
                                        <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" />
                                    </div>
                                    <span style={{ color: "grey", marginLeft: "15px", marginBottom: "5px", marginRight: "15px" }}>Mario Sanchez</span>
                                    <span style={{ color: "grey", marginBottom: "5px" }}>October 21, 2022</span>
                                </div>
                            </a>
                        </Link>
                    </div> */
}
