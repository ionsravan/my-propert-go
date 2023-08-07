import Image from "next/image";
import { location } from "src/@types";
import Link from "next/link";

interface Props {
  img: string;
  stats?: string;
  name: string;
}
const PopularCity = ({ img,name }: Props) => {
    return (
        <Link href={`/city/${name}`}>
            <div className="min-w-[173px] max-w-[173px] font-manrope space-y-4">
                <div className="relative h-[173px]">
                    <Image src={img} fill alt="home" className="object-fill rounded-lg"/>
                </div>
                <div>
                    <p className=" text-white font-semibold text-2xl ">{name}</p>
                    <p className="text-lg font-medium text-locColor">1000+ properties</p>
                </div>
            </div>
        </Link>
    );
};

export default PopularCity;
