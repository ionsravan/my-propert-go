import Image from 'next/image';
import React from 'react';
import { Footer, Navbar } from 'src/componets';
import { Input } from 'src/componets/shared/sharedInput';
import ContactForm from '../contact';
import Layout from "src/Layout/main";


const EarnWithUs = () => {


  return <>
    {/* <Navbar /> */}

    <div style={{marginTop:"30px"}} className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            {/* Left Section with Random Text and Title */}
            <h1 style={{ fontSize: "30px" }} className="text-2xl text-center font-bold mb-4">Earn With Us</h1>
            <p className=' text-gray-600 leading-relaxed text-justify mt-10' >
              Hello There, Young Freelancers, Day without a phone is not there. So why waste your time when you
              can earn with basic skills? You heard right !!
            </p>
            <p className=' text-gray-600 leading-relaxed text-justify mt-10' >
              We are Hiring young talent with skills in this Digital world, like Video/ Photo shoots or Drone
              Operators, content writers or digital marketers. Any skill you think can make a change in our
              Company can get you enrolled for this.
            </p>
            <p className=' text-gray-600 leading-relaxed text-justify mt-10' >
              For Example, if you still be a Rider or delivery guy, you can do this as a part-time earning. Your phone
              has a Camera then; you can make Just Video shoot for required property in your desired area.
              Whenever a property video shoot request comes in, our Team will notify you to do the required
              shoot. You need to edit the basic editing like a voice-over for the Video, insert titles/descriptions for
              the required property in the Video, and send us back as a Drive link. Once our Team approves, you
              get paid to your account instantly.
            </p>
            <p className=' text-gray-600 leading-relaxed text-justify mt-10' >
              Let’s get started without any further ado. Fill in the Below form completely and mention your
              interests. If you are eligible, you can expect a call from our Team immediately.
            </p>
            <p className=' text-center text-gray-600 leading-relaxed  mt-10' >
              Together for Prosperity with Wonderplots Tribe. Peace Out
            </p>
            <p className=' text-gray-600 leading-relaxed text-center mt-10' >
              -Team Wonderplots
            </p>


          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Right Section with Random Images */}
            <div className=" h-[720px]  mb-4 md:mb-0 md:mr-4">
              <img
                src="/earnWithUs.png"
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>


      {/* <h1 style={{ fontSize: "30px", marginTop: "30px" }} className='text-center  '>Book A FREE Design Session</h1> */}
      {/* <h1 style={{ fontSize: "30px" }} className='text-center  '>Meet a designer</h1> */}
      {/* <h2>Meet a designer</h2> */}

      <div style={{ marginTop: "0px" }}>
        <ContactForm navFooter={true}/>
      </div>

    </div>






    {/* <Footer /> */}

  </>
};
export default EarnWithUs;



EarnWithUs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

