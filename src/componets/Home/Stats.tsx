import { useCountUp } from "react-countup";

const Stats = () => {
  useCountUp({ ref: "counter", end: 7, delay: 2 });
  useCountUp({ ref: "counter2", end: 4000, separator: ",", delay: 2 });
  useCountUp({ ref: "counter3", end: 300, duration: 2, delay: 2 });
  useCountUp({ ref: "counter4", end: 2, delay: 2 });
  return (
    <section className="bg-green-500 py-10 md:py-20">
      <div className="max-w-4xl mx-auto space-y-11 w-full ">
        <div className="w-full flex flex-col items-center space-y-2">
          <h2 className=" text-3xl md:text-5xl p-2 font-manrope font-bold text-white">
            Some Counts that matters
          </h2>
          <p className="text-white/80 p-2">
            Our Acchivements in the journey depected in numbers
          </p>
        </div>
        <div className="grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-4">
          <div className="text-white font-manrope flex flex-col items-center">
            <p className="text-5xl font-bold text-white" id="counter">
              0
            </p>
            <p className="text-white/75 text-lg">States</p>
          </div>
          <div className="text-white border-x px-8 font-manrope flex flex-col items-center">
            <p className="text-5xl font-bold text-white" id="counter2">
              0
            </p>
            <p className="text-white/75 texl-lg">Happy customers</p>
          </div>
          <div className="text-white font-manrope border-r px-8 flex flex-col items-center">
            <p className="text-5xl font-bold text-white" id="counter3">
              0
            </p>
            <p className="text-white/75 text-lg">Live Appartments</p>
          </div>
          <div className="text-white font-manrope flex flex-col items-center">
            <p className="text-5xl font-bold text-white" id="counter4">
              0
            </p>
            <p className="text-white/75">Years of journey</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
