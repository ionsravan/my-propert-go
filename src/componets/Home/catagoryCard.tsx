import Image from "next/image";

interface Props {
  text: string;
  img: string;
}
const CatagoryCard = ({ text, img }: Props) => {
  return (
    <div className="w-full overflow-hidden  h-36 rounded-lg relative">
      <div className="h-36 relative">
        <Image
          src={img}
          fill
          className="object-fill rounded-lg "
          alt="villa4"
        />
      </div>
      <div className="h-full w-full cover absolute top-0  rounded-lg">
        <div className="flex flex-col px-5 justify-center h-full  space-x-1">
          <p className=" font-manrope text-white font-bold text-xl ">{text}</p>
          <div className="w-20 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default CatagoryCard;
