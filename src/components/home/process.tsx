// import { Clock, ListOrdered, Wallet2 } from "lucide-react";
import Lottie from "lottie-react";
import magnifier from "../../../public/magnifier.json";
import coin from "../../../public/coin.json";
import clock from "../../../public/clock.json";
const Process = () => {
  return (
    <section className="bg-white text-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Lottie
              animationData={magnifier}
              style={{ width: 50, height: 50 }}
            />
            {/* <ListOrdered className="size-10 text-[#d73470] shrink-0 aspect-square" /> */}
            <p className="text-center font-ubuntu font-[500]">
              Check your <strong>car finace</strong> <br /> agreements
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Lottie animationData={clock} style={{ width: 50, height: 50 }} />
            {/* <Clock className="size-10 shrink-0 text-[#d73470] aspect-square" /> */}
            <p className="text-center font-ubuntu font-[500]">
              Takes less than <strong>60 seconds</strong> to <br /> start
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Lottie animationData={coin} style={{ width: 50, height: 50 }} />
            {/* <Wallet2 className="size-10 shrink-0 text-[#d73470] aspect-square" /> */}
            <p className="text-center font-ubuntu font-[500]">
              Potential <strong>claims worth</strong> up to <br />{" "}
              <strong>2,860*</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
