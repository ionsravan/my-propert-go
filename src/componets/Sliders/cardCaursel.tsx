import { ReactNode } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
interface Props {
  Card: React.ElementType;
  data: any;
}

function CardCarousel({ Card, data }: Props) {
  const scrollLeft = () => {
    const ele = document.getElementById("content");
    if (ele) {
      ele.scrollLeft -= 310;
    }
  };
  const scrollRight = () => {
    const ele = document.getElementById("content");
    if (ele) {
      ele.scrollLeft += 310;
    }
  };

  return (
    <div className="relative">
      <div className="text-center py-4  text-xl font-bold"></div>
      <div className="absolute right-0 top-5 ">
        <button onClick={scrollLeft} className="p-2 m-2 rounded-full bg-white">
          <FiChevronLeft />
        </button>
        <button onClick={scrollRight} className="p-2 m-2 rounded-full bg-white">
          <FiChevronRight />
        </button>
      </div>
      <div
        id="content"
        className="carousel p-4 flex items-center justify-start space-x-4 overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {data?.map((c: any) => {
          return <Card {...c} key={c._id} />;
        })}
      </div>
    </div>
  );
}

export default CardCarousel;
