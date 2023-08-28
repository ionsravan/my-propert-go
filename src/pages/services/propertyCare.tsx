import Image from 'next/image';
import React from 'react';
import { Footer, Navbar } from 'src/componets';
import { Input } from 'src/componets/shared/sharedInput';
import ContactForm from '../contact';
import Layout from "src/Layout/main";

const PropertyCare = () => {


  return <>
    {/* <Navbar /> */}

    <div style={{ marginTop: "30px" }} className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            {/* Left Section with Random Text and Title */}
            <h1 style={{ fontSize: "30px" }} className=" text-pink-500 text-2xl font-bold mb-4">Property Care</h1>
            <p className=" text-gray-600 leading-relaxed text-justify mt-10" >
              90% of the wealthy accumulators focus on acquiring and trading Property.
              Assets and prosperities come with their own perks and troubles. 85% of that troubles are due to a
              lack of maintenance. We are here to help you with that our Property Care services.
            </p>

            <h1 style={{ fontSize: "30px" }} className="text-2xl font-bold mb-4 mt-10">So! What is Property Care?</h1>
            <p className=" text-gray-600 leading-relaxed text-justify mt-5" >
              It's a management service that lets you rest while we transform your Assets.
            </p>

          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Right Section with Random Images */}
            <div className=" h-[320px] bg-gray-300 mb-4 md:mb-0 md:mr-4">
              <img
                src="/propertyCare.png"
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>


      <div style={{ marginTop: "30px", }} className="bg-white py-4 md:ml-[100px] md:p-0 p-3 ">
        <h1 style={{ fontSize: "35px" }} className="text-2xl font-bold mb-4 mt-10 text-primaryBlue">Process:</h1>
        <h1 style={{ fontSize: "30px" }} className="text-2xl font-bold mb-4 mt-10">What are the Features of Property care services?
        </h1>

        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            Protecting your assets against fraudsters</li>
          <li>
            Cleaning Up the site, eliminating wastage, Establishing Border stones, marking and
            painting once a year or whenever necessary.
          </li>
          <li> Estimating the Property's current market value and building strategies to enhancing its
            value</li>
          <li> Increasing your reach to potential Buyers by creating identity.</li>
          <li> Your dashboard on the website allows you to follow updates and maintenance to your
            Property twice a year, including videos and Photographs of Pre and post-service</li>
          <li> Get your Property listed for free and designate agents in your locality to handle the sales</li>
          <li>In case of sale of Property, the subscription will be transferred to the new owner until
            expiry.
          </li>
        </ul>

        <h1 style={{ fontSize: "30px" }} className="text-2xl font-bold mb-4 mt-10 text-green-500">Future Vision:</h1>

        <p className=" text-gray-600 leading-relaxed text-justify mt-5" >

          We wish to implement the new age digital system for processing Property information,
          subscriptions, and sales options to every Property utilizing Q.R. codes placed at the entrance of
          every site, gated community, and layout.
        </p>
        <h1 style={{ fontSize: "30px" }} className="text-2xl font-bold mb-4 mt-10">Price:</h1>

        <p className=" text-gray-600 leading-relaxed text-justify mt-5" >

          Property care starts at ₹25 Per square yard for a minimum of 200 square yards. Areas lesser than
          200 square yards are open for Quote.
        </p>
        <p className=" text-gray-600 leading-relaxed text-justify mt-5" >

          Additional fees assessed for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            Title Board (on your Property)</li>
          <li>
            Fences and compound walls
          </li>
          <li>  If planting is necessary on the Property, Legal Verifications and E.C. etc.</li>
          <li> Increasing your reach to potential Buyers by creating identity.</li>
          <li> Your dashboard on the website allows you to follow updates and maintenance to your
            Property twice a year, including videos and Photographs of Pre and post-service</li>
          <li> Get your Property listed for free and designate agents in your locality to handle the sales</li>
          <li>In case of sale of Property, the subscription will be transferred to the new owner until
            expiry.
          </li>
        </ul>


        <p className=" w-10/12 text-gray-600 leading-relaxed text-justify mt-16" >
          Why Delay Contact Property Care, Vizag's Most Reliable Property Management Company.
          Dial 08712287222 or enter your information at www.wonderplots.com/propertycare.
        </p>

      </div>










      {/* <h1 style={{ fontSize: "30px", marginTop: "30px" }} className='text-center  '>Book A FREE Design Session</h1> */}
      {/* <h1 style={{ fontSize: "30px" }} className='text-center  '>Meet a designer</h1> */}
      {/* <h2>Meet a designer</h2> */}

      <div style={{ marginTop: "10px" }}>
        <ContactForm navFooter={true} />
      </div>

    </div>






    {/* <Footer /> */}

  </>
};
export default PropertyCare;

PropertyCare.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};



