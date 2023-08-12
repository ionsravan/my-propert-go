import styles from "../../styles/interiordesigns.module.scss";
import React from "react";
import Layout from "@/pages/_layout";
import { CardSlider } from "@/components";
import * as Yup from "yup";
import { useFormik } from "formik";
import Image from "next/image";
import { Input } from "src/componets/shared/sharedInput";
// import { InteriorDesignsImages } from "@/assets/images/Home/Interiordesign";
import { Optionslist } from "@/constants/postproperty.constant";
// import BackgroundImage from "@/components/backgroundImage";
// import { InteriorSolutions } from "@/constants/interiordesign.constant";
const InteriorDesigns = () => {
//   const validationSchema = Yup.object().shape({});
//   const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
//     useFormik({
//       enableReinitialize: true,
//       validateOnChange: true,
//       validateOnBlur: true,
//       initialValues: {
//         name: "",
//         countrycode: "",
//         mobile: "",
//         email: "",
//         pincode: "",
//         agree: false,
//       },
//       validationSchema,
//       onSubmit: (values) => {
//         console.log(JSON.stringify(values, null, 2));
//       },
//     });
  return (
    <div>
    <div>
      {/* <Layout> */}
        {/* <div className={styles.postproperty}> */}
          {/* <div className={styles.CardSlider}>
            <CardSlider />
          </div> */}
          <div className="mt-6 container-fluid py-5 ">
            <div className={`row justify-content-center`}>
              <div className={`col-lg-6 col-md-8 col-sm-11`}>
                <div className={`text-center mb-60 ${styles.section_tittle}`}>
                  <h2>What We Do</h2>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 container-fluid py-5 ">
              <div className="row">
                <div
                  className={`col-md-6 mb-4 col-lg-4 ${styles.aos_animate}`}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className={` mb-40 ${styles.properties}`}>
                    <div className={styles.properties__card}>
                      <div className={styles.properties__img}>
                      <Image      width={200}
    height={200}  src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="" />
                      </div>
                      <div className={styles.properties__caption}>
                        <h3>
                          <a href="#">Starts the automated process.</a>
                        </h3>
                        <p>
                          The automated process starts as soon as your clothes
                          go into the machine.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-md-6 mb-4 col-lg-4 ${styles.aos_animate}`}
                  data-aos="fade-up"
                  data-aos-delay=""
                >
                  <div className={` mb-40 ${styles.properties}`}>
                    <div className={styles.properties__card}>
                      <div className={styles.properties__img}>
                        <Image     width={200}
    height={200} src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="" />
                      </div>
                      <div className={styles.properties__caption}>
                        <h3>
                          <a href="#">Starts the automated process.</a>
                        </h3>
                        <p>
                          The automated process starts as soon as your clothes
                          go into the machine.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`col-md-6 mb-4 col-lg-4 ${styles.aos_animate}`}>
                  <div className={` mb-40 ${styles.properties}`}>
                    <div className={styles.properties__card}>
                      <div className={styles.properties__img}>
                      <Image      width={200}
    height={200} src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="" />
                      </div>
                      <div className={styles.properties__caption}>
                        <h3>
                          <a href="#">Starts the automated process.</a>
                        </h3>
                        <p>
                          The automated process starts as soon as your clothes
                          go into the machine.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`row justify-content-center`}>
              <div className={`col-lg-6 col-md-8 col-sm-11`}>
                <div className={`text-center mb-60 ${styles.section_tittle}`}>
                  <h2>Working Process</h2>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className={`col-md-6 mb-4 col-lg-4 ${styles.aos_animate}`}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className={` ${styles.category_card_interior}`}>
                  {/* <BackgroundImage
               src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    className={styles.interiorWorkprocessimage}
                  >
                    <div className={styles.interiorWorkProcesscontent}>
                      <p>Connect Us Online From Your Place</p>
                    </div>
                  </BackgroundImage> */}
                </div>
              </div>
              <div
                className={`col-md-6 mb-4 col-lg-4 ${styles.aos_animate}`}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className={` ${styles.category_card_interior}`}>
                  {/* <BackgroundImage
               src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    className={styles.interiorWorkprocessimage}
                  >
                    <div className={styles.interiorWorkProcesscontent}>
                      <p>Get Your 3D designs Viewed from any device</p>
                    </div>
                  </BackgroundImage> */}
                </div>
              </div>
              <div
                className={`col-md-6 mb-4 col-lg-4 ${styles.aos_animate}`}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className={` ${styles.category_card_interior}`}>
                  {/* <BackgroundImage
      src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    className={styles.interiorWorkprocessimage}
                  >
                    <div className={styles.interiorWorkProcesscontent}>
                      <p>
                        Affordable pricing and unmatched pricing in the market
                      </p>
                    </div>
                  </BackgroundImage> */}
                </div>
              </div>
            </div>
            <div className={`row justify-content-center`}>
              <div className={`col-lg-6 col-md-8 col-sm-11`}>
                <div className={`text-center mb-60 ${styles.section_tittle}`}>
                  <h2>End-to-End Interior Solutions</h2>
                  <p>
                    We bring you carefully-curated interior design ideas, to
                    give your home a brand new look. Explore exclusive interior
                    designs and trends that are every bit inspirational as they
                    are practical. Our team of interior designers have put
                    together ideas across kitchen, bedroom, living room and
                    more, to help you pick a design that will best suit your
                    home interior requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="row g-4 g-lg-4 mt-2">
              {/* {InteriorSolutions.map((item) => {
                return (
                  <div className={`col-md-6 mb-4 col-lg-3`} key={item}>
                    <div className={` ${styles.category_card_interior}`}>
                      <Image
                        src={item.img}
                        alt={item.alt}
                        title=""
                        width={300}
                        height={300}
                      />
                      <div className="p-4">
                        <p className={styles.subtitle_large}>{item.name}</p>{" "}
                        <p className={`${styles.caption_default} `}>1545 Designs</p>
                      </div>
                    </div>
                  </div>
                );
              })} */}
            </div>
                <div className={`text-center mb-60 ${styles.section_tittle}`}>
                  <h2>Our collaborate partners</h2>
                  <p>Winning collaborations that produce winning designs.</p>
                </div>
              </div>
              <div className={`text-center mb-6`}>
                {/* <marquee width="60%" direction="left" height="100px">
                  <Image
                    src={InteriorDesignsImages.trustedpartner.src}
                    width={300}
                    height={150}
                  />
                </marquee> */}
              </div>
            </div>
            <div className={`row justify-content-center`}>
              <div className={`col-lg-6 col-md-8 col-sm-11`}>
                <div className={`text-center mb-60 ${styles.section_tittle}`}>
                  <h2>Book A FREE Design Sessions</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12 m-0 p-0">
                <div className={styles.Interior_form_images}>
                  <Image

src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                    alt=""
                    title=""
                    width={200}
                    height={200}
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 m-0 p-0">
                <div className={styles.syFormBox}>
                  <h2 className={styles.formHeading}>Meet a designer</h2>
                  <div className={styles.syFormBody}>
                    <form>
                      <div className={styles.expert_form}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter Your Name"
                          className={styles.expert_form_input}
                        //   onChange={handleChange}
                        //   value={values.name}
                        />
                      </div>
                      <div className={styles.expert_form_moblie}>
                        <select
                          className={styles.expert_form_input_select}
                          id="countrycode"
                          name="countrycode"
                        //   value={values.countrycode}
                        //   onChange={handleChange}
                        >
                          <option value="50" selected>
                            IND +91
                          </option>
                          {/* {Optionslist.countrycodes.map((item, index) => {
                            return (
                              <option key={index} value={item.value}>
                                {item.label}
                              </option>
                            );
                          })} */}
                        </select>
                        <Input
                          type="text"
                          id="mobile"
                          name="mobile"
                          placeholder="Enter Your Mobile"
                          className={styles.expert_form_input}
                        //   onChange={handleChange}
                        //   value={values.mobile}
                        />
                      </div>
                      <div className={styles.expert_form}>
                        <Input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Enter Your Email"
                          className={styles.expert_form_input}
                        //   onChange={handleChange}
                        //   value={values.email}
                        />
                      </div>
                      <div className={styles.expert_form}>
                        <Input
                          type="text"
                          id="pincode"
                          name="pincode"
                          placeholder="Enter Your Current Residence Pincode"
                          className={styles.expert_form_input}
                        //   onChange={handleChange}
                        //   value={values.pincode}
                        />
                      </div>
                      <div className={styles.expert_form_moblie}>
                        <Input
                          type="checkbox"
                          id="agree"
                          className={styles.custom_radio}
                          name="agree"
                        //   onChange={handleChange}
                        //   checked={values.agree}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="female"
                        >
                          You Can Reach Me On WhatsAPP
                        </label>
                      </div>
                      <p>
                        UnCheck to OutPut of UpComings Meetings and offers
                        Alerts
                      </p>
                      <button className={styles.btn} type="submit">
                        Book Free Design Sessions
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        // </div>
    //   </Layout>
    // </div>
  );
};
export default InteriorDesigns;