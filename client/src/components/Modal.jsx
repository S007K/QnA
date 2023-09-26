import React, { useState } from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import axios from "axios";

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
    overflow: "auto",
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

const Modaln = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSpace = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/quora/v1/space/create-space", {
        name,
        description,
      });
      toast.success("Space Successfully Created");
      setName("");
      setDescription("");
      setTimeout(() => {
        closeModal();
      }, 500);
    } catch (error) {
      toast.error("Error in space Creating");
    }
  };

  const [switchmode, setSwitchmode] = useState(false);

  const isLargeScreen = window.innerWidth >= 768;

  const dynamicStyles = {
    ...customStyles.content,
    maxWidth: isLargeScreen ? "60%" : "95%",
  };
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
        <div className="flex flex-col justify-start gap-6 px-4 py-3">
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold">Create a Space</span>
            <span className="text-gray-600 text-lg">
              Share your interests, curate content, host discussions, and more.
            </span>
          </div>
          <form className="flex flex-col gap-8 bottom-0">
            <div className="flex flex-col">
              <label className="text-xl font-medium">Name</label>
              <span className="text-base text-gray-500">
                This can be changed in Space settings.
              </span>
              <input
                className="py-3 px-2 w-full mt-1 border rounded-sm"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xl font-medium">Brief description</label>
              <span className="text-base text-gray-500">
                Include a few keywords to show people what to expect if they
                join.
              </span>
              <input
                className="py-3 px-2 w-full mt-1 border rounded-sm"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <hr />
            <div className="bottom-0 flex flex-col items-end">
              <button
                type="submit"
                className="text-xl px-8 py-3 bg-blue-400 text-white rounded-full"
                onClick={handleSpace}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Modaln;
