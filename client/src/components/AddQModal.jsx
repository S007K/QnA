import React, { useState } from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import Question from "./Question";
import Post from "./Post";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "60%",
    height: "70%",
    padding: "1rem",
    overflow: "hidden",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    background: "#ffffff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
  },
};

const AddQModal = ({ isOpen, closeModal, CgProfile }) => {
  // for modal setting
  const [switchmode, setSwitchmode] = useState(false);

  const isLargeScreen = window.innerWidth >= 768;

  const dynamicStyles = {
    ...customStyles.content,
    maxWidth: isLargeScreen ? "60%" : "95%",
  };
  // above modal setting

  function handleswitch1() {
    setSwitchmode(true);
  }
  function handleswitch2() {
    setSwitchmode(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          content: dynamicStyles,
          overlay: customStyles.overlay,
        }}
      >
        <button
          className="hover:bg-gray-50 p-2 hover:rounded-full"
          onClick={closeModal}
        >
          <RxCross2 size={30} />
        </button>
        <div className="flex flex-col justify-start gap-6 px-1 py-3">
          <div className="flex flex-row items-center w-full justify-between">
            <div
              onClick={handleswitch2}
              className="addquestion w-full text-center border-b-2 py-4 text-base font-semibold cursor-pointer hover:bg-slate-100"
            >
              Add Question
            </div>
            <div
              onClick={handleswitch1}
              className="createpost w-full text-center border-b-2 py-4 text-base font-semibold cursor-pointer hover:bg-slate-100"
            >
              Create Post
            </div>
          </div>
          {!switchmode ? (
            <Question CgProfile={CgProfile} closeModal={closeModal} />
          ) : (
            <Post CgProfile={CgProfile} closeModal={closeModal} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AddQModal;
