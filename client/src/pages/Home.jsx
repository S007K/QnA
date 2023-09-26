import react, { useState, useEffect } from "react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import LeftNavMenu from "../components/LeftNavMenu";
import Modaln from "../components/Modal";
import AddQModal from "../components/AddQModal";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import AnswerSection from "../components/AnswerSection";
import PostVoteSection from "../components/PostVoteSection";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isqOpen, setIsqOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [combinedData, setCombinedData] = useState([]);

  // for short description
  const [fullDescription, setFullDescription] = useState(false);

  // toggle description
  const toggleDescription = () => {
    setFullDescription(!fullDescription);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openqModal() {
    setIsqOpen(true);
  }

  function closeqModal() {
    setIsqOpen(false);
  }
  // useEfeect hooks

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response1 = await axios.get("/quora/v1/post/all-post");
        const response2 = await axios.get("/quora/v1/question/get-question");
        const arrayResponse1 = response1.data.post || [];
        const arrayResponse2 = response2.data.question || [];

        const combined = [...arrayResponse1, ...arrayResponse2];

        combined.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setCombinedData(combined.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    setInterval(() => {
      fetchData();
    }, 15000);
  }, []);

  // // First Time fetch post
  // const getAllPost = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get("/quora/v1/post/all-post");
  //     setPost(res.data.post);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // // post fetch without refresh
  // const getAllAgain = async () => {
  //   try {
  //     const res = await axios.get("/quora/v1/post/all-post");
  //     const newPost = res.data.post;
  //     setPost([...newPost]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // First time question fetch
  // const getAllQuestion = async () => {
  //   try {
  //     const res = await axios.get("/quora/v1/question/get-question");
  //     setQuestion(res.data.question);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // format created date and time to proper format
  const formatDateTime = (dateTimeString) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDateTime;
  };
  return (
    <>
      {/* 3-partition  */}
      <div className="whole-body w-full flex gap-3 mt-3 right-0 laptop:flex-row mobile:flex-col mb-5">
        <div className="left-sidebar laptop:fixed flex justify-start h-screen laptop:w-[9rem] laptop:flex-col mobile:flex-row mobile:w-full mobile:h-20 mobile:hidden laptop:block">
          <div
            onClick={openModal}
            className="space-container laptop:w-[90%] flex items-center px-2 py-3 text-sm rounded-sm bg-gray-200 font-medium justify-center mt-2 cursor-pointer gap-1 text-gray-600"
          >
            <AiOutlinePlus /> Create Space
          </div>
          <Modaln closeModal={closeModal} isOpen={isOpen} />
          <LeftNavMenu />
        </div>
        <div className="main-scroll-body laptop:ml-[9rem] laptop:w-[600px] mobile:w-full">
          <div className="question-bar bg-white w-full border rounded-sm p-2">
            <div className="input-profile-container w-full flex items-center gap-3 py-1 px-1">
              {auth.user.photo ? (
                <img
                  src={auth.user.photo}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <CgProfile size={36} className="text-gray-600" />
              )}

              <div
                onClick={openqModal}
                className="w-full bg-gray-100 text-gray-500 py-2 rounded-full pl-2 border truncate"
              >
                What do you want to ask or share?
              </div>
            </div>
            <div className="flex w-full justify-between px-3 py-1 items-center">
              <div
                title="Post your Question"
                onClick={openqModal}
                className="ask-button flex items-center justify-center hover:bg-gray-100 py-2 hover:rounded-full cursor-pointer w-full mx-2 gap-2 text-gray-700"
              >
                <RiQuestionnaireFill size={24} /> Ask
              </div>
              <AddQModal
                isOpen={isqOpen}
                closeModal={closeqModal}
                CgProfile={CgProfile}
              />
              <div className="border-contain h-5 border-r-2 "></div>
              <div className="answer-btn flex items-center justify-center hover:bg-gray-100 py-2 hover:rounded-full cursor-pointer w-full mx-2 gap-2 text-gray-700">
                <FaRegEdit size={22} />
                Answer
              </div>
              <div className="border-contain h-5 border-r-2 "></div>
              <div
                onClick={openqModal}
                className="post-btn flex items-center justify-center hover:bg-gray-100 py-2 hover:rounded-full cursor-pointer w-full mx-2 gap-2 text-gray-700"
              >
                <AiOutlineEdit size={24} />
                Post
              </div>
            </div>
          </div>

          {/* All post loop here */}
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 gap-3 mt-3">
              {combinedData?.map((p) => (
                <div className="bg-[#ffffff] rounded-sm shadow-sm" key={p._id}>
                  <div className="profile-tag-container flex gap-3 items-center px-3 py-3">
                    {p?.author?.photo ? (
                      <img
                        src={p.author.photo}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <CgProfile size={35} />
                    )}
                    <div className="flex flex-col">
                      <Link>{p.author.name}</Link>
                      <p className="text-xs text-gray-500">
                        {formatDateTime(p.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pt-[0.8px]">
                    <div className="text-lg font-semibold leading-none text-black mb-2">
                      {p.title ? p.title : p.question}
                    </div>
                    <div
                      className={
                        fullDescription
                          ? "full-description"
                          : "short-description"
                      }
                    >
                      {p.description ? p.description : null}
                    </div>
                    {p.description ? (
                      !fullDescription ? (
                        <button
                          className="text-blue-800 text-lg font-medium float-right"
                          onClick={toggleDescription}
                        >
                          (more)
                        </button>
                      ) : (
                        <button
                          className="text-blue-800 text-lg font-medium float-right"
                          onClick={toggleDescription}
                        >
                          (hide details)
                        </button>
                      )
                    ) : null}
                  </div>
                  <img
                    src={p.photo ? p.photo : null}
                    className=" w-full mt-2"
                  />
                  <div>
                    {p.question ? (
                      <AnswerSection />
                    ) : (
                      <PostVoteSection postId={p._id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
