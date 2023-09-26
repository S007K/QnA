import React, { useState } from "react";
import Spacebox from "../components/Space-box";
import Modaln from "../components/Modal";
import { Link } from "react-router-dom";
import DiscoverSpace from "../components/DiscoverSpace";

const Spaces = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="h-full mb-5">
        <div className="create-space flex flex-col justify-start mt-4 bg-[url('../assets/ilustrator.png')] bg-right-top bg-contain bg-no-repeat w-full px-4 py-4 shadow-md bg-white gap-4 rounded-sm mb-8">
          <span className="text-2xl font-semibold">Welcome to Spaces!</span>
          <span className="text-gray-600">
            Follow Spaces to explore your interests on Quora.
          </span>
          <div className="flex gap-3">
            <button
              className="py-2 px-3 text-center border border-blue-600 rounded-full text-blue-600 hover:bg-gray-100"
              onClick={openModal}
            >
              Create a Space
            </button>
            <a
              href="#discover"
              className="py-2 px-3 text-center border border-blue-600 rounded-full text-blue-600 hover:bg-gray-100"
            >
              Discover Spaces
            </a>
          </div>
        </div>
        <span className="text-2xl font-bold mb-2">Your spaces</span>
        <Spacebox />
        <div className="mb-4">
          <span className="text-2xl font-bold">Discover Spaces</span>
        </div>
        <div className="flex flex-col gap-8" id="discover">
          <span>Spaces you might like</span>
          <DiscoverSpace />
        </div>
        <Modaln closeModal={closeModal} isOpen={isOpen} />
      </div>
    </>
  );
};

export default Spaces;
