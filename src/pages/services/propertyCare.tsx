import React from 'react';
import { Footer, Navbar } from 'src/componets';

const BlogPage = () => {
    return <>
    <Navbar/>
        <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <section className="flex flex-col md:flex-row">
            <div  className="w-full md:w-1/2 p-4">
              {/* Left Section with Random Text and Title */}
              <h2 className="text-2xl font-bold mb-4">Random Blog Title</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, quas. Quam sunt, quidem ratione rem officia quis enim necessitatibus. Numquam, fugit. Aut fuga optio nesciunt aspernatur delectus suscipit deleniti cupiditate consectetur veniam quidem? Accusantium molestiae, nesciunt nostrum repellat maxime atque ipsa quaerat dolorem aspernatur libero aliquam nisi voluptas cum officia, omnis odio soluta dolore harum vitae voluptatum corporis nulla earum. Debitis, blanditiis nobis! Totam molestiae animi neque deleniti quisquam at assumenda vel illum adipisci, quia sit facere commodi recusandae? Perspiciatis officia architecto quo! Ipsam, ullam expedita! Magnam, dolorum repellat ut atque assumenda dolore aspernatur sapiente perspiciatis incidunt molestiae obcaecati amet ipsam quisquam doloremque cum, architecto doloribus. Corporis ut unde hic, similique temporibus error odio. Temporibus, explicabo sapiente itaque recusandae maxime sunt tenetur nihil! Beatae nesciunt atque obcaecati. Consequuntur voluptate neque illo perferendis officiis ipsa beatae reprehenderit obcaecati accusamus harum vitae officia voluptatum ratione, voluptas suscipit animi. Odio cum voluptatum neque eligendi. Incidunt eveniet magnam autem animi voluptatem? Quam, molestias! Doloremque natus cupiditate dicta accusamus illum nesciunt eveniet earum! Quasi nobis unde accusantium accusamus nemo eaque dolorum qui repudiandae iusto quae provident mollitia, vero itaque quaerat odio voluptas quo ratione id culpa aliquid odit placeat libero facilis in! Quod placeat rerum in similique ipsa, odio facere voluptate maxime architecto repudiandae voluptates officia quidem vel, quasi, a provident cupiditate facilis iste beatae blanditiis. Illo mollitia aliquam est magnam, quidem pariatur ea sequi esse cupiditate, soluta atque autem? Voluptates laudantium nesciunt porro ipsa dolor iusto facilis culpa debitis minima atque dolorum, saepe minus soluta delectus nulla sapiente ipsum quasi architecto. Dolorum quod quam molestias suscipit enim harum, explicabo ea reiciendis dignissimos consequatur vitae. Magni aperiam autem, recusandae tempora, quam maxime officiis distinctio nostrum expedita sapiente reiciendis nisi cupiditate unde porro aut inventore. Quasi, aliquid architecto. Necessitatibus a consequuntur nihil repellendus. Dolore, ut maxime.
              </p>
            </div>
            <div style={{ border: "2px solid red" }} className="w-full md:w-1/2 p-4">
              {/* Right Section with Random Images */}
              <div className=" bg-gray-300 mb-4 md:mb-0 md:mr-4 h-full">
                <img
                  src="https://images.unsplash.com/photo-1691719743913-f79de90d0d6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                  alt="Sample Image"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer/>
      </>
};

export default BlogPage;
