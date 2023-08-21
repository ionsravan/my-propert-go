import Image from 'next/image';
import React from 'react';
import { Footer, Navbar } from 'src/componets';
import { Input } from 'src/componets/shared/sharedInput';
import ContactForm from 'src/pages/contact';


const InteriorDesigns = () => {


  return <>
    <Navbar />

    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            {/* Left Section with Random Text and Title */}
            <h1 style={{fontSize:"30px"}} className="text-2xl font-bold mb-4">What We Do</h1>
            <p >
              Even the all-powerful Pointing has no control about the
              blind texts it is an almost unorthographic.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, quas. Quam sunt, quidem ratione rem officia quis enim necessitatibus. Numquam, fugit. Aut fuga optio nesciunt aspernatur delectus suscipit deleniti cupiditate consectetur veniam quidem? Accusantium molestiae, nesciunt nostrum repellat maxime atque ipsa quaerat dolorem aspernatur libero aliquam nisi voluptas cum officia, omnis odio soluta dolore harum vitae voluptatum corporis nulla earum. Debitis, blanditiis nobis! Totam molestiae animi neque deleniti quisquam at assumenda vel illum adipisci, quia sit facere commodi recusandae? Perspiciatis officia architecto quo! Ipsam, ullam expedita! Magnam, dolorum repellat ut atque assumenda dolore aspernatur sapiente perspiciatis incidunt molestiae obcaecati amet ipsam quisquam doloremque cum, architecto doloribus. Corporis ut unde hic, similique temporibus error odio. Temporibus, explicabo sapiente itaque recusandae maxime sunt tenetur nihil! Beatae nesciunt atque obcaecati. Consequuntur voluptate neque illo perferendis officiis ipsa beatae reprehenderit obcaecati accusamus harum vitae officia voluptatum ratione, voluptas suscipit animi. Odio cum voluptatum neque eligendi. Incidunt eveniet magnam autem animi voluptatem? Quam, molestias! Doloremque natus cupiditate dicta accusamus illum nesciunt eveniet earum! Quasi nobis unde accusantium accusamus nemo eaque dolorum qui repudiandae iusto quae provident mollitia, vero itaque quaerat odio voluptas quo ratione id culpa aliquid odit placeat libero facilis in! Quod placeat rerum in similique ipsa, odio facere voluptate maxime architecto repudiandae voluptates officia quidem vel, quasi, a provident cupiditate facilis iste beatae blanditiis. Illo mollitia aliquam est magnam, quidem pariatur ea sequi esse cupiditate, soluta atque autem? Voluptates laudantium nesciunt porro ipsa dolor iusto facilis culpa debitis minima atque dolorum, saepe minus soluta delectus nulla sapiente ipsum quasi architecto. Dolorum quod quam molestias suscipit enim harum, explicabo ea reiciendis dignissimos consequatur vitae. Magni aperiam autem, recusandae tempora, quam maxime officiis distinctio nostrum expedita sapiente reiciendis nisi cupiditate unde porro aut inventore. Quasi, aliquid architecto. Necessitatibus a consequuntur nihil repellendus. Dolore, ut maxime.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Right Section with Random Images */}
            <div className=" h-[720px] bg-gray-300 mb-4 md:mb-0 md:mr-4">
              <img
                src="https://images.unsplash.com/photo-1691719743913-f79de90d0d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row">
    
          <div className="w-full md:w-1/2 p-4">
            {/* Right Section with Random Images */}
            <div className=" bg-gray-300 mb-4 md:mb-0 md:mr-4 h-[690px]">
              <img
                src="https://images.unsplash.com/photo-1691719743913-f79de90d0d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Left Section with Random Text and Title */}
            <h1 className="text-2xl font-bold mb-4">Starts the automated process.</h1>
            <p  >
              The automated process starts as soon as your clothes
              go into the machine.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, quas. Quam sunt, quidem ratione rem officia quis enim necessitatibus. Numquam, fugit. Aut fuga optio nesciunt aspernatur delectus suscipit deleniti cupiditate consectetur veniam quidem? Accusantium molestiae, nesciunt nostrum repellat maxime atque ipsa quaerat dolorem aspernatur libero aliquam nisi voluptas cum officia, omnis odio soluta dolore harum vitae voluptatum corporis nulla earum. Debitis, blanditiis nobis! Totam molestiae animi neque deleniti quisquam at assumenda vel illum adipisci, quia sit facere commodi recusandae? Perspiciatis officia architecto quo! Ipsam, ullam expedita! Magnam, dolorum repellat ut atque assumenda dolore aspernatur sapiente perspiciatis incidunt molestiae obcaecati amet ipsam quisquam doloremque cum, architecto doloribus. Corporis ut unde hic, similique temporibus error odio. Temporibus, explicabo sapiente itaque recusandae maxime sunt tenetur nihil! Beatae nesciunt atque obcaecati. Consequuntur voluptate neque illo perferendis officiis ipsa beatae reprehenderit obcaecati accusamus harum vitae officia voluptatum ratione, voluptas suscipit animi. Odio cum voluptatum neque eligendi. Incidunt eveniet magnam autem animi voluptatem? Quam, molestias! Doloremque natus cupiditate dicta accusamus illum nesciunt eveniet earum! Quasi nobis unde accusantium accusamus nemo eaque dolorum qui repudiandae iusto quae provident mollitia, vero itaque quaerat odio voluptas quo ratione id culpa aliquid odit placeat libero facilis in! Quod placeat rerum in similique ipsa, odio facere voluptate maxime architecto repudiandae voluptates officia quidem vel, quasi, a provident cupiditate facilis iste beatae blanditiis. Illo mollitia aliquam est magnam, quidem pariatur ea sequi esse cupiditate, soluta atque autem? Voluptates laudantium nesciunt porro ipsa dolor iusto facilis culpa debitis minima atque dolorum, saepe minus soluta delectus nulla sapiente ipsum quasi architecto. Dolorum quod quam molestias suscipit enim harum, explicabo ea reiciendis dignissimos consequatur vitae. Magni aperiam autem, recusandae tempora, quam maxime officiis distinctio nostrum expedita sapiente reiciendis nisi cupiditate unde porro aut inventore. Quasi, aliquid architecto. Necessitatibus a consequuntur nihil repellendus. Dolore, ut maxime.
            </p>
          </div>
        </section>
      </div>
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            {/* Left Section with Random Text and Title */}
            <h1 className="text-2xl font-bold mb-4">Working Process</h1>
            <p  >
              Even the all-powerful Pointing has no control about the
              blind texts it is an almost unorthographic.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis aut iure quae expedita dignissimos sit nostrum dolorum atque mollitia quibusdam excepturi magni quidem, eius officiis corrupti perferendis voluptas illo obcaecati ducimus ipsa rem, dolor repellendus laudantium enim. Minima temporibus similique illum non corporis nemo et vitae delectus quasi. Nihil, ullam iure quam excepturi beatae necessitatibus fuga quisquam sit! Enim vero doloribus, quas temporibus nisi iste aspernatur consequatur! Cupiditate distinctio velit, natus sed similique hic provident dolor repellendus minima illum ipsam culpa, eos, vero voluptas quod blanditiis unde soluta! Facere laudantium ipsum reiciendis ea nihil fugiat distinctio repellat, maxime officiis voluptates? </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Right Section with Random Images */}
            <div className=" bg-gray-300 mb-4 md:mb-0 md:mr-4 h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1691719743913-f79de90d0d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row">
     
          <div className="w-full md:w-1/2 p-4">
            {/* Right Section with Random Images */}
            <div className=" bg-gray-300 mb-4 md:mb-0 md:mr-4 h-[380px]">
              <img
                src="https://images.unsplash.com/photo-1691719743913-f79de90d0d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Left Section with Random Text and Title */}
            <h1 className="text-2xl font-bold mb-4">End-to-End Interior Solutions</h1>
            <p className=" leading-relaxed text-justify"  >
              We bring you carefully-curated interior design ideas, to
              give your home a brand new look. Explore exclusive interior
              designs and trends that are every bit inspirational as they
              are practical. Our team of interior designers have put
              together ideas across kitchen, bedroom, living room and
              more, to help you pick a design that will best suit your
              home interior requirements.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis aut iure quae expedita dignissimos sit nostrum dolorum atque mollitia quibusdam excepturi magni quidem, eius officiis corrupti perferendis voluptas illo obcaecati ducimus ipsa rem, dolor repellendus laudantium enim. Minima temporibus similique illum non corporis nemo et vitae delectus quasi. Nihil, ullam iure quam excepturi beatae necessitatibus fuga quisquam sit! Enim vero doloribus, quas temporibus nisi iste aspernatur consequatur! Cupiditate distinctio velit, natus sed similique hic provident dolor repellendus minima illum ipsam culpa, eos, vero voluptas quod blanditiis unde soluta! Facere laudantium ipsum reiciendis ea nihil fugiat distinctio repellat, maxime officiis voluptates? </p>
          </div>
        </section>
      </div>
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            {/* Left Section with Random Text and Title */}
            <h1 className="text-2xl font-bold mb-4">Our collaborate partners</h1>
            <p className=" leading-relaxed text-justify"  >
              Winning collaborations that produce winning designs.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis aut iure quae expedita dignissimos sit nostrum dolorum atque mollitia quibusdam excepturi magni quidem, eius officiis corrupti perferendis voluptas illo obcaecati ducimus ipsa rem, dolor repellendus laudantium enim. Minima temporibus similique illum non corporis nemo et vitae delectus quasi. Nihil, ullam iure quam excepturi beatae necessitatibus fuga quisquam sit! Enim vero doloribus, quas temporibus nisi iste aspernatur consequatur! Cupiditate distinctio velit, natus sed similique hic provident dolor repellendus minima illum ipsam culpa, eos, vero voluptas quod blanditiis unde soluta! Facere laudantium ipsum reiciendis ea nihil fugiat distinctio repellat, maxime officiis voluptates? </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Right Section with Random Images */}
            <div className=" bg-gray-300 mb-4 md:mb-0 md:mr-4 h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1691719743913-f79de90d0d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                alt="Sample Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      {/* <div className="max-w-7xl mx-auto mt-4">
        <section className="flex flex-col items-center">
          <div className="md:text-center mb-10 md:mb-0">
            <h2 className="text-2xl font-bold">Book A FREE Design Session</h2>
          </div>

          <div className="md:w-1/2 px-4">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-4">Meet a designer</h2>
             
            </div>
          </div>
        </section>
      </div> */}
      <h1 style={{fontSize:"30px",marginTop:"30px"}}  className='text-center  '>Book A FREE Design Session</h1>
      <h1 style={{fontSize:"30px"}}  className='text-center  '>Meet a designer</h1>
      {/* <h2>Meet a designer</h2> */}

      <div style={{marginTop:"-90px"}}>
      <ContactForm navFooter = {true}/>
      </div>
     

    {/* <contact/> */}
   

    </div>






    <Footer />

  </>
};
export default InteriorDesigns;





