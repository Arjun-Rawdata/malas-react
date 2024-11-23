import CamView from "../components/CamView";
import CaptureBtn from "../components/CaptureBtn";
import CountDown from "../components/CountDown";
import FilterBg from "../components/FilterBg";
import FilterBtn from "../components/FilterBtn";
import FilterButtonBg from "../components/FilterButtonBg";
import ThumbsUp from "../components/ThumbsUp";
import baseStore from "../store/baseStore";

const Page = () => {
  const { isCountDown, isThumbActive } = baseStore((state) => state);

  return (
    <div className="h-screen overflow-hidden relative">
      <FilterBg />
      <div className="relative z-10">
        {isThumbActive && <ThumbsUp />}
        {isCountDown && <CountDown />}
        <div className="w-full h-full flex pt-[250px] px-[98px] justify-center">
          <CamView />
        </div>
      </div>
      <FilterButtonBg />
      <FilterBtn />
      <CaptureBtn />
    </div>
  );
};

export default Page;
