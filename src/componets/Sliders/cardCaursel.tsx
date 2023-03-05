import { ReactNode } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
interface Props {
  Card: React.ElementType;
  data: any;
  id: string;
}

function CardCarousel({ id, Card, data }: Props) {
  return (
    <div className="relative">
      <div className="text-center py-4  text-xl font-bold"></div>
      <div
        id={id}
        className="carousel p-4 flex items-center justify-start space-x-4 overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {data?.map((c: any, index: number) => {
          return <Card {...c} key={c._id || index} />;
        })}
      </div>
    </div>
  );
}

export default CardCarousel;
