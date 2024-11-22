import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate from React Router
import baseStore from "../store/baseStore"; // Assuming baseStore is used the same way

const CountDown = () => {
  const navigate = useNavigate(); // React Router's useNavigate
  const [count, setCount] = useState(5);
  const setIsCountDown = baseStore((state) => state.setIsCountDown);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(intervalId);
          setIsCountDown(false);
          navigate("/preview"); // Navigates to the "/preview" page
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate, setIsCountDown]); // Added navigate to dependency array

  return (
    <div className="absolute z-50 h-screen w-full bg-[#171717]/70 grid place-items-center">
      <p className="font-[700] text-[990.97px] text-white">{count}</p>
    </div>
  );
};

export default CountDown;
