import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlineUsergroupDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiDetail, BiEditAlt, BiSolidDownArrow } from "react-icons/bi";
import { BsBell, BsGlobe } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import AddQModal from "./AddQModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [quesOpen, setQuesOpen] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const navigate = useNavigate();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleOpen = () => {
    setQuesOpen(true);
  };

  const toogleClose = () => {
    setQuesOpen(false);
  };

  // For logout user
  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  // For search
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/quora/v1/post/search?keyword=${keyword}`
      );
      setSearchResults(response.data.posts);
    } catch (error) {
      console.log("Error searching posts:", error);
    }
  };

  console.log(searchResults);
  return (
    <>
      <nav className="bg-[#ffffff] mobile:w-screen laptop:w-full object-fill right-0 sticky top-0 z-50 border-b-2 left-0 shadow-sm">
        <div className="nav-item-container flex flex-row items-center laptop:mx-56 py-1 mb-1 bg-[#ffffff] right-0">
          <div className="flex mobile:flex-col laptop:flex-row">
            <Link
              to={"/home"}
              className="logo font-['Poppins', sans-serif] text-4xl font-bold laptop:text-[#c94543] mobile:bg-[#bc2e2b] laptop:bg-[#ffffff] mobile:w-screen laptop:w-auto mobile:text-[#ffffff] mobile:text-center laptop:text-auto mobile:py-4 laptop:py-0"
            >
              Quora
            </Link>
            <div className="menu flex mobile:flex-row container-fluid items-center laptop:ml-5 text-2xl text-gray-600 laptop:gap-2 mobile:gap-1 h-full mobile:w-screen laptop:w-full mobile:py-2  laptop:py-0 mobile:bg-slate-100 laptop:bg-[#ffffff] mobile:px-2">
              <Link
                to={"/home"}
                className="hover:bg-slate-100 px-4 py-2 cursor-pointer w-full"
              >
                <AiFillHome />
              </Link>
              <div className="hover:bg-slate-100 px-4 py-2 cursor-pointer w-full">
                <BiDetail />
              </div>
              <div className="hover:bg-slate-100 px-4 py-2 cursor-pointer w-full">
                <BiEditAlt />
              </div>
              <Link
                to={"/home/spaces"}
                className="hover:bg-slate-100 px-4 py-2 cursor-pointer w-full"
              >
                <AiOutlineUsergroupDelete />
              </Link>
              <div className="hover:bg-slate-100 px-4 py-2 cursor-pointer w-full">
                <BsBell />
              </div>
              <div
                onClick={togglePopup}
                className="profile text-gray-600 cursor-pointer hover:bg-slate-100 py-2 px-4 w-full laptop:hidden mobile:block"
                title={auth.user.name}
              >
                {auth.user.photo ? (
                  <img
                    src={auth.user.photo}
                    alt="profile pic"
                    className="w-8 h-8 rounded-full object-center"
                  />
                ) : (
                  <CgProfile size={25} />
                )}

                {isOpen && (
                  <div className="absolute w-60 mt-6 -ml-28 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 mr-0">
                    <BiSolidDownArrow
                      style={{ transform: "rotate(180deg)" }}
                      className=" text-white  text-center -mt-5 mx-auto"
                      size={20}
                    />
                    <div className="py-1">
                      <Link
                        to={"/home/dashboard"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                      >
                        {auth.user.name}
                      </Link>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="search-input laptop:w-full mobile:w-auto border ml-2 flex flex-row items-center hover:outline-2 hover:outline-blue-500 cursor-pointer rounded-sm mobile:hidden  laptop:flex ">
            <AiOutlineSearch size={20} className="ml-2" />
            <input
              type="search"
              placeholder="Search Quora"
              className="outline-none py-1"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="ml-3 flex items-center gap-3 right-0 mobile:hidden laptop:flex">
            <button className="px-2 text-lg  rounded-full border py-1 text-gray-500 hover:bg-slate-50 cursor-pointer truncate ">
              Try Quora+
            </button>
            <div
              onClick={togglePopup}
              className="profile text-gray-600 cursor-pointer hover:bg-slate-100 py-1 px-2"
              title={auth.user.name}
            >
              {auth.user.photo ? (
                <img
                  src={auth.user.photo}
                  alt="profile pic"
                  className="w-10 h-7 rounded-full object-center"
                />
              ) : (
                <CgProfile size={25} />
              )}

              {isOpen && (
                <div className="absolute w-60 mt-6 -ml-28 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <BiSolidDownArrow
                    style={{ transform: "rotate(180deg)" }}
                    className=" text-white  text-center -mt-5 mx-auto"
                    size={20}
                  />
                  <div className="py-1">
                    <Link
                      to={"/home/dashboard"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      {auth.user.name}
                    </Link>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="globe text-gray-600 cursor-pointer px-2 hover:bg-slate-100 py-1 mobile:hidden laptop:flex">
              <BsGlobe size={24} />
            </div>
            <div className="addquestion flex justify-between items-center py-1 px-2 rounded-full bg-[#cf4644] text-white mobile:hidden laptop:flex">
              <div
                onClick={toggleOpen}
                className="hover:bg-[#e04a48] hover:rounded-full cursor-pointer truncate"
              >
                Add Question
              </div>
              <RiArrowDropDownLine
                size={25}
                className="ml-1 border-l-[0.1px] border-black"
              />
            </div>
            <AddQModal isOpen={quesOpen} closeModal={toogleClose} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
