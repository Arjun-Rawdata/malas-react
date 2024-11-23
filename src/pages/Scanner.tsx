import ArrowBtn from "../components/ArrowBtn";
import LogoHeader from "../components/LogoHeader";
import { icon } from "../utils/assets";
import { useEffect, useState } from "react";
import axios from "../services/axios";
import themeStore from "../store/themeStore";
import userStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Warn from "../components/Warn";

const Page = () => {
  const { setTheme } = themeStore((state) => state);
  const { setUser } = userStore((state) => state);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const fruits = ["kiwi", "strawberry", "mango", "orange"];
  const [isScanErr, setIsScanErr] = useState(false);

  useEffect(() => {
    const socket = io("ws://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket.IO connected via WebSocket");
    });

    socket.on("message", (data) => {
      if (data === qrCode) {
        return;
      }
      setQrCode(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [qrCode]);

  useEffect(() => {
    getUser();
  }, [qrCode]);

  const getUser = async () => {
    if (!qrCode) {
      return;
    }
    const postData = {
      action: "get_userdetails_bycode",
      qrcode: Number(qrCode),
      scanner_id: "101",
    };
    try {
      const response = await axios.post(
        "/fruit-land/fruit_land_api/quiz/api_controller.php",
        postData
      );
      const userDat = response?.data?.data?.[0];
      if (!fruits.includes(userDat?.fruit)) {
        setIsScanError();
        return;
      }
      setUser({ ...userDat, qrcode: qrCode });
      setTheme(userDat?.fruit);
      console.log("userDat", userDat);
      navigate("/measures");
    } catch (error) {
      console.error("Error sending message:", error);
      setIsScanError();
    }
  };

  const setIsScanError = () => {
    setIsScanErr(true);
    setTimeout(() => {
      setIsScanErr(false);
      setQrCode(null);
    }, 3000);
  };

  return (
    <div>
      <div className="logo-wrapper">
        <LogoHeader />
      </div>

      <div className="flex-grow mt-[378px] flex flex-col items-center justify-end space-y-14">
        <div className="info-text text-lg leading-tight text-center text-primary font-[500]">
          <p>
            Scan your wristband to <br /> join the fun!
          </p>
        </div>
        <div className="qr-wrapper">
          <div className="w-[431px] h-[497px] border-4 border-primary rounded-custom-x-large relative overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="flex-1"></div>
              <div className="flex-1 bg-[#21A675]/40"></div>
            </div>

            <img
              height={311}
              width={311}
              src={icon("qrSymbol")}
              alt="scan qr code"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="btnWrapper">
          <button
            onClick={() => {
              navigate("/measures");
            }}
          >
            <ArrowBtn tilted={true} />
          </button>
        </div>
      </div>

      <div className="machine-img-wrapper pl-8 pt-[130px] flex justify-center ">
        <img
          alt="scanner placed below"
          width={622}
          height={622}
          src={icon("machineIllustrate")}
        />
      </div>
      {isScanErr && <Warn warningSubTitle="Please scan again" />}
    </div>
  );
};

export default Page;
