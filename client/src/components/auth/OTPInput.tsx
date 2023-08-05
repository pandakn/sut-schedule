import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks";

const OTPInput = () => {
  const { forgotPasswordMsg, handleForgotPassword, handleVerifyOTP } =
    useAuth();
  const [timerCount, setTimer] = React.useState(30);
  const [otp, setOtp] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  const verifyOTP = (event: React.FormEvent) => {
    event.preventDefault();
    const optStr = otp.join("");
    forgotPasswordMsg.username &&
      handleVerifyOTP(forgotPasswordMsg.username, optStr);
  };

  const forgotPassword = (event: React.FormEvent) => {
    event.preventDefault();
    const username = forgotPasswordMsg.username;
    const email = forgotPasswordMsg.email;
    username && email && handleForgotPassword(username, email);
    setDisable(true);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-gray-50">
      <div className="w-full max-w-lg px-6 pt-10 mx-auto bg-white shadow-xl pb-9 rounded-2xl">
        <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="text-3xl font-semibold">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {forgotPasswordMsg.email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto">
                  <div className="w-16 h-16 ">
                    <input
                      maxLength={1}
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOtp([+e.target.value, otp[1], otp[2], otp[3]])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength={1}
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOtp([otp[0], +e.target.value, otp[2], otp[3]])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength={1}
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOtp([otp[0], otp[1], +e.target.value, otp[3]])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength={1}
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOtp([otp[0], otp[1], otp[2], +e.target.value])
                      }
                    ></input>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <a
                      onClick={verifyOTP}
                      className="flex flex-row items-center justify-center w-full py-5 text-center text-white bg-black border border-none shadow-sm outline-none cursor-pointer rounded-xl"
                    >
                      Verify Account
                    </a>
                  </div>

                  <div className="flex flex-row items-center justify-center space-x-1 text-sm font-medium text-center text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={forgotPassword}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
