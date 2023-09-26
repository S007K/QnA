import React, { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Question = ({ CgProfile, closeModal }) => {
  const [auth, setAuth] = useAuth();
  const [question, setQuestion] = useState("");

  function checkInput() {
    const userInput = document.getElementById("userInput").value;
    const submitButton = document.getElementById("submitButton");

    if (userInput.trim() !== "") {
      submitButton.removeAttribute("disabled");
      submitButton.style.backgroundColor = "blue";
    } else {
      submitButton.setAttribute("disabled", true);
      submitButton.style.backgroundColor = "lightgrey";
    }
  }

  // Create question by user
  const questionPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/quora/v1/question/create-question", { question });
      toast.success("Your question is now live");
      setQuestion("");
      setTimeout(() => {
        closeModal();
      }, 500);
    } catch (error) {
      toast.error("please add a question");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="bg-blue-100 px-3 py-3 rounded-sm text-blue-600">
          <span className="text-lg font-bold">
            Tips on getting good answers quickly
          </span>
          <ul className="text-sm list-disc pl-5 pt-1 [&>li]:pt-1">
            <li>Make sure your question has not been asked already</li>
            <li>Keep your question short and to the point</li>
            <li>Double-check grammar and spelling</li>
          </ul>
        </div>
        <div className="profile-container mt-5 w-full flex items-center gap-3">
          <div className="logo text-gray-500">
            {auth.user.photo ? (
              <img
                src={auth.user.photo}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <CgProfile size={32} />
            )}
          </div>
          <div>
            <select
              id="visibility"
              className="bg-gray-50 border-2  text-gray-900 text-sm rounded-full p-2.5  dark:placeholder-gray-400 dark:text-white"
            >
              <option selected value="public">
                Public
              </option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div className="form-container mt-2 w-full border-b-2">
          <input
            onInput={checkInput}
            type="text"
            name=""
            id="userInput"
            placeholder="Start your question with , What , How, Why , etc."
            className="w-full text-xl outline-none py-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="button bottom-0 mt-16 w-full flex justify-end gap-5">
          <button
            onClick={closeModal}
            className="px-3 py-2 bg-blue-700  text-white rounded-full"
          >
            Cancel
          </button>
          <button
            id="submitButton"
            className="px-3 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-600"
            onClick={questionPost}
          >
            Add question
          </button>
        </div>
      </div>
    </>
  );
};

export default Question;
