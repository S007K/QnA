import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";
import { Toaster } from "react-hot-toast";

const Login = () => {
  // register input value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  // login input value
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState(false);

  // for switch login and register
  const [switchl, setSwitchL] = useState(false);

  const handleSwitch = () => {
    setSwitchL(true);
  };
  const handleSwitchLogin = () => {
    setSwitchL(false);
  };

  // For Register || POST Method
  const resgisterUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "/quora/v1/auth/register",
        {
          name,
          email,
          mobno,
          password,
          photo,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res && res.data.success) {
        setLoading(false);
        toast.success(res.data && res.data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setPhoto(null);
        setEmail("");
        setPassword("");
        setName("");
        setMobno("");
        setTimeout(() => {
          handleSwitchLogin();
        }, 500);
      } else {
        toast.error(res.data && res.data.message, {
          icon: "😪",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error(res.data.message);
    }
  };

  // For login || POST Method
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      const res = await axios.post("/quora/v1/auth/login", {
        email: lemail,
        password: lpassword,
      });

      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        setLoadingLogin(false);
        toast.success(res.data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        setLoadingLogin(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoadingLogin(false);
      const errorMessage = error.response
        ? error.response.data.message
        : "Error in log in. Please try again.";
      toast.error(errorMessage, {
        icon: "😥",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.error(error);
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="w-full laptop:h-full mobile:h-screen bg-[url('../assets/ilustrator.png')] flex items-center bg-contain">
        <div className="login-container flex flex-col items-center laptop:h-[65vh] mobile:h-screen  mx-auto laptop:mt-32 mobile:mt-auto bg-[#ffffff] laptop:w-[40%] mobile:w-full rounded-sm border shadow-md ">
          <div className="qoura-logo text-6xl font-extrabold text-[#cf4644] outline-2 mt-5 border-2 px-3 py-2 border-[#cf4644] rounded-md">
            Quora-Clone
          </div>
          {switchl ? (
            <div className="register-container w-full px-4 text-center">
              <form
                className="flex flex-col gap-4 mt-9 mb-3"
                onSubmit={resgisterUser}
              >
                <input
                  className="w-auto border border-gray-200 rounded-md p-2"
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-auto border border-gray-200 rounded-md p-2"
                  type="number"
                  name="mobileno"
                  id="mobileno"
                  required
                  placeholder="Enter your mobile no"
                  value={mobno}
                  onChange={(e) => setMobno(e.target.value)}
                />
                <input
                  className="w-auto border border-gray-200 rounded-md p-2"
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-auto border border-gray-200 rounded-md p-2"
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  className="text-md bg-stone-200 hover:bg-stone-300 py-2 text-center rounded-md"
                  htmlFor="fileUpload"
                >
                  <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  Upload Profile Photo
                </label>
                <button
                  type="submit"
                  className="bg-[#982725] border rounded-md p-2 text-white"
                >
                  {loading ? <Spinner /> : "Register"}
                </button>
              </form>
              <span className="mt-5">
                Already Have an account{" "}
                <span
                  onClick={handleSwitchLogin}
                  className="text-red-500 cursor-pointer"
                >
                  Login Here
                </span>{" "}
              </span>
            </div>
          ) : (
            <div className="login-container w-full px-4 mobile:mt-8 text-center">
              <span className="font-serif">Created By @Sahil Khan</span>
              <form
                className="flex flex-col gap-5 mt-20 mb-3"
                onSubmit={loginHandler}
              >
                <input
                  className="w-auto border border-gray-200 rounded-md p-2"
                  type="email"
                  name="lemail"
                  id="lemail"
                  required
                  placeholder="username"
                  value={lemail}
                  onChange={(e) => setLemail(e.target.value)}
                />
                <input
                  className="w-auto border border-gray-200 rounded-md p-2"
                  type="password"
                  name="lpassword"
                  id="lpassword"
                  required
                  placeholder="password"
                  value={lpassword}
                  onChange={(e) => setLpassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-[#cb3e3b] border rounded-md p-2 text-white"
                >
                  {loadingLogin ? <Spinner /> : "LogIn"}
                </button>
              </form>
              <span>
                Not account! please{" "}
                <span
                  onClick={handleSwitch}
                  className="text-red-500 cursor-pointer"
                >
                  Register Here
                </span>{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
