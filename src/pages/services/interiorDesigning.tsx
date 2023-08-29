import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Footer, Navbar } from 'src/componets';
import { Input } from 'src/componets/shared/sharedInput';
import ContactForm from 'src/pages/contact';
import Layout from "src/Layout/main";


const VideoLoop = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', () => {
        video.currentTime = 0; // Reset video to the beginning
        video.play();
      });

      // Initial play
      video.play();
    }
  }, []);

  return (
    <div className='flex items-center justify-center'>
      <video ref={videoRef} width="1080" height="1920" loop muted autoPlay>
        <source src="/InteriorVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};


const Card = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-b from-white to-yellow-300 opacity-100 shadow-lg rounded-2xl p-6 flex flex-col justify-between w-96 h-72 items-center ">
      <div className=" flex flex-col justify-center items-center pt-7">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        <p className="text-gray-600 text-justify">{description}</p>
      </div>
    </div>
  );
};





const InteriorDesigns = () => {


  return <>
   
   {/* <Navbar /> */}
    <main className=" py-12 px-5 md:px-8 space-y-6 max-w-7xl mx-auto w-full">

      <header>
 
      <h1 style={{ fontSize: "30px" }} className="text-2xl text-center font-bold mb-10">Interior Designing</h1>
        <VideoLoop />
      </header>


      <div style={{marginTop:"80px"}} className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-28 justify-center items-center ">
        <Card
          title="What We Do"
          description="We design stunning interiors that reflect your style and needs. Our talented team brings your vision to life with innovative design solutions."
        />
        <Card
          title="What We Are"
          description="We're passionate about creating spaces that enhance your life. Our expertise in color, lighting, and space planning ensures your interior space reflects your unique style and personality. Let us bring your design dreams to life!"
        />
      </div>


      <div style={{margin:"80px 0",fontWeight:"bold"}} className='flex items-center justify-center'>
        <h1 className='text-3xl'>Market We Serve</h1>
      </div>



      <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5 justify-center items-center md:items-center md:justify-center' style={{ margin: "50px 0" }} >
        <div style={{ width: "302px"}} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"15px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/exteriorDesignn.jpg"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <div style={{ width: "270px", height: "170px" }} className="bg-gradient-to-b from-white to-yellow-300 opacity-100 absolute top-32 left-4 z-[100] p-2 border-none bg-primaryBlue flex flex-col rounded-xl ">
            <h1 style={{fontSize:"20px", fontWeight:"bold"}}>Exteriors</h1>
            <p className='text-justify'>Our exterior design expertise
              creates stunning curb appeal that sets the tone for your home's unique style.</p>
          </div>
        </div>
        <div style={{ width: "302px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"15px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/interiorDesign.jpg"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <div style={{ width: "270px", height: "170px" }} className="bg-gradient-to-b from-white to-yellow-300 opacity-100 absolute top-32 left-4 z-[100] p-2 border-none bg-primaryBlue flex flex-col rounded-xl ">
            <h1 style={{fontSize:"20px", fontWeight:"bold"}}>Interiors </h1>
            <p className='text-justify'>Our interior design
              services bring your
              vision to life with
              functional, stylish
              spaces that reflect
              your personal taste.</p>
          </div>
        </div>
        <div style={{ width: "302px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"15px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/gatedCommuninties.jpg"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <div style={{ width: "270px", height: "170px" }} className="bg-gradient-to-b from-white to-yellow-300 opacity-100 absolute top-32 left-4 z-[100] p-2 border-none  rounded-xl  bg-primaryBlue flex flex-col  ">
            <h1 style={{fontSize:"20px", fontWeight:"bold"}}>Gated Communities </h1>
            <p className='text-justify'>We design minding
              privacy, security,
              and a sense
              of exclusivity that
              complements your
              beautifully designed home.</p>
          </div>
        </div>
      </div>



      <div style={{fontWeight:"bold"}} className='flex items-center justify-center'>
        <h1 className='text-3xl'>Working Process</h1>
      </div>


      <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5 justify-center items-center' style={{ margin: "50px 0" }} >
        <div style={{ width: "302px", }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/connectUs.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>Connect us online</p>
  
        </div>
        <div style={{ width: "302px", }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/threeD.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>Get your 3d designs</p>
  
        </div>
        <div style={{ width: "302px", }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/affordable.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>Affordable pricing</p>
   
        </div>
      </div>


      
      <div style={{fontWeight:"bold"}} className='flex items-center justify-center'>
        <h1 className='text-3xl'>End-to-end interior solutions</h1>
      </div>



      <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5 justify-center items-center' >
        <div style={{ width: "302px",marginLeft:"30px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/balcony.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>Balcony And Garden Outdoor Seating</p>
  
        </div>
        <div style={{ width: "302px",marginLeft:"30px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/ceiling.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>False Ceiling</p>
  
        </div>
        <div style={{ width: "302px",marginLeft:"30px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/rack.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'> Shoe Rack</p>
   
        </div>
      </div>


      <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5 justify-center items-center' >
        <div style={{ width: "302px",marginLeft:"30px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/kitchen.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>Modular Kitchen and Wardrobe</p>
  
        </div>
        <div style={{ width: "302px",marginLeft:"30px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/tv.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>TV Stand</p>
  
        </div>
        <div style={{ width: "302px",marginLeft:"30px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/sofas.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>Customized sofa and Beds</p>
   
        </div>
      </div>
      <div className=' md:ml-[160px] ml-0 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5 justify-start items-center' >
      <div style={{ width: "302px" }} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/book.png"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
          <p className='text-center my-2 font-bold'>Book Shelf and Study Units</p>
   
        </div>

        </div>

        <div>

        <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5 justify-center items-center' >
      <div style={{ width: "502px"}} className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
      <p className='text-center my-2 font-bold text-gray-500'>in collaboration with</p>
          <div style={{borderRadius:"10px"}} className="resfeaturedProjectsCard__imageBox imgHover">
            <Image className="lazyLoadImg"
              src="/signInLogo.jpg"
              alt="Lumbini Elysee"
              width={800}
              height={600}
            />
          </div>
    
   
        </div>

        </div>


        </div>


    <h1 style={{fontSize:"30px",marginTop:""}}  className='text-center  '>Book A FREE Design Session</h1>
      <h1 style={{fontSize:"30px"}}  className='text-center  '>Meet a designer</h1>


      <div style={{marginTop:"0px"}}>
      <ContactForm navFooter = {true}/>
      </div>
     














   
    </main>
    {/* <Footer /> */}

  </>
};
export default InteriorDesigns;

InteriorDesigns.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};





