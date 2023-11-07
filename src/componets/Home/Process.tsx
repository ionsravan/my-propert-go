import Image from "next/image";

const Process = () => {
  return (
    <section className="px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold font-manrope">
          The Process at Wonderplots
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 py-10">
          <div className="max-w-[250px] space-y-2">
            <div className="relative w-24 h-24">
              <Image
                src={"/steps/step1.png"}
                fill
                alt="home"
                className="object-fill rounded-lg"
              />
            </div>
            <div className="font-manrope space-y-2 pl-4">
              <p className="text-xl font-bold">Search it</p>
              <p>Find your best suited property</p>
            </div>
          </div>
          <div className="max-w-[250px] space-y-2">
            <div className="relative w-24 h-24">
              <Image
                src={"/steps/step2.png"}
                fill
                alt="home"
                className="object-fill rounded-lg"
              />
            </div>
            <div className="font-manrope space-y-2 pl-4">
              <p className="text-xl font-bold">Contact seller</p>
              <p>Interact with seller, make site visit and verify the property</p>
            </div>
          </div>
          <div className="max-w-[250px] space-y-2">
            <div className="relative w-24 h-24">
              <Image
                src={"/steps/step3.png"}
                fill
                alt="home"
                className="object-fill rounded-lg"
              />
            </div>
            <div className="font-manrope space-y-2 pl-4">
              <p className="text-xl font-bold">Buy it</p>
              <p>Get the greatest deal on the property and own it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
