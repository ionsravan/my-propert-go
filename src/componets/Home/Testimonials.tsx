import Image from "next/image";

const TestiCard = () => {
  return (
    <div className="min-w-[350px] relative max-w-xs rounded-lg shadow-md  font-manrope space-y-2">
      <div className="relative h-44">
        <Image
          src={"/vod.png"}
          fill
          alt="home"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="space-y-2 px-3 pb-2">
        <h1 className="text-xl font-bold text-TitleColor">Review By MIchel </h1>
        <div className="space-y-2 ">
          <p className="text-sm text-[#18191F] font-normal">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat,
            consectetur.
          </p>
        </div>
      </div>
      <div className="flex space-x-2 px-3 items-center pb-3">
        <div className="relative h-10 w-10 rounded-full ">
          <Image
            src={"/agent.png"}
            fill
            alt="home"
            className="object-fill rounded-full "
          />
        </div>
        <div className="font-manrope">
          <p className="text-TitleColor">Danniel Russel</p>
          <p className="text-sm text-locColor font-manrope">
            Manchester kentecy
          </p>
        </div>
      </div>
    </div>
  );
};

const TestiMonials = () => {
  return (
    <div className="relative ">
      <div className="absolute w-full max-w-sm  border-black top-14 right-0">
        <div className="relative h-56 max-w-sm opacity-30">
          <Image
            src={"/coma.png"}
            fill
            alt="home"
            className="object-contain rounded-lg"
          />
        </div>
      </div>
      <section className="testibg py-24 px-5 md:px-10  text-[#18191F] ">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-lg  text-5xl font-manrope ] font-bold">
            <h1>What our client say</h1>
            <p className="text-lg font-medium mt-4">
              See what people are saying about our unique and effective
              formulas.
            </p>
          </div>
          <div className="flex space-x-5 overflow-scroll scrollbar-hide">
            <TestiCard />
            <TestiCard />
            <TestiCard />
            <TestiCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestiMonials;
