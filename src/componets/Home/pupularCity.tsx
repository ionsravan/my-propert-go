import Image from "next/image";
import { location } from "src/@types";

interface Props {
  img: string;
  stats?: string;
}
const PopularCity = ({ img }: Props) => {
  return (
    <div className="min-w-[173px] max-w-[173px] font-manrope space-y-4">
      <div className="relative h-[173px]">
        <Image src={img} fill alt="home" className="object-fill rounded-lg" />
      </div>
      <div>
        <p className=" text-white font-semibold text-2xl ">Hydrabad</p>
        <p className="text-lg font-medium text-locColor">1000+ properties</p>
      </div>
    </div>
  );
};

export default PopularCity;
