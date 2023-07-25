import React from "react";
import { Propery, ProperyRes, ProperyResArr, response } from "src/@types";
import Image from 'next/image';
import Link from "next/link";


const Slider = ({ property }: { property: Propery }) => {
  const { propertyImages, name, location, cost, address, _id } = property;
  return (
    <div>
      <div className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
        <div className="resfeaturedProjectsCard__imageBox imgHover">
          <Image className="lazyLoadImg"
            src={propertyImages && propertyImages.length > 0 ? propertyImages[0] : "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"}
            alt="Lumbini Elysee"
            width={800}
            height={600}
          />
          <div className="resfeaturedProjectsCard__featuredLarge">
            <div className="fp_homepage__badges__featuredRegular">
              <div>Featured</div>
            </div>
          </div>
          <div className="resfeaturedProjectsCard__shortlistItem pageComponent">
            <h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </h1>
          </div>
        </div>
        <div className="resfeaturedProjectsCard__contentBox pageComponent"></div>

        <Image
          className="lazyLoadImg resfeaturedProjectsCard__iconImg"
          src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Lumbini Elysee"
          width={800}
          height={600}

        />
        <div className="resfeaturedProjectsCard__contentText pageComponent">
          <Link href={`/details/${_id}`}>
     
              <div className="list_header_bold spacer8 f16">{name}</div>
        
          </Link>
          <div className="input_placeholder_inactive_resFP spacer16 f14">
            {address}
          </div>
          <div className="list_header_semiBold f16">₹ {cost}Cr </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;




// import React from "react";
// import { Propery, ProperyRes, ProperyResArr,response } from "src/@types";


// const Slider = ({ property }: { property: Propery }) => {
//   const { propertyImages, name, location,cost,address } = property;
//   return (
//     <div>
//       <div className="resfeaturedProjectsCard__featuredProjectCard pageComponent fpUpgrade">
//         <div className="resfeaturedProjectsCard__imageBox imgHover">
//           <img className="lazyLoadImg" src={propertyImages && propertyImages.length > 0 ? propertyImages[0] : "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" }alt="Lumbini Elysee" />
//           <div className="resfeaturedProjectsCard__featuredLarge">
//             <div className="fp_homepage__badges__featuredRegular">
//               <div>Featured</div>
//             </div>
//           </div>
//           <div className="resfeaturedProjectsCard__shortlistItem pageComponent">
//             <h1>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="white"
//                 className="w-5 h-5"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
//                 />
//               </svg>
//             </h1>
//           </div>
//         </div>
//         <div className="resfeaturedProjectsCard__contentBox pageComponent"></div>

//         <img
//           className="lazyLoadImg resfeaturedProjectsCard__iconImg"
//           src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//           alt="Lumbini Elysee"
//         />
//         <div className="resfeaturedProjectsCard__contentText pageComponent">
//           <a
//             href="https://www.99acres.com/lumbini-elysee-financial-district-hyderabad-npxid-r406584"
//             target="_blank"
//           >
//             <div className="list_header_bold spacer8 f16">{name}</div>
//           </a>
//           <div className="input_placeholder_inactive_resFP spacer16 f14">
//             {address}
//           </div>
//           <div className="list_header_semiBold f16">₹ {cost}Cr </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slider;
