import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Spacebox = () => {
  const [space, setSpace] = useState([]);

  useEffect(() => {
    const getSpace = async () => {
      try {
        const res = await axios.get("/quora/v1/space/get-space");
        setSpace(res.data.space);
      } catch (error) {
        toast.error("Error in getting space", error);
      }
    };
    getSpace();
  }, []);
  return (
    <>
      <div className="grid gap-3 mobile:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-5 mt-2 mb-3">
        {space.map((s) => (
          <div
            key={s._id}
            className="flex flex-col border-2 shadow-md justify-center items-center rounded-lg h-full"
          >
            <div className="h-24 w-full bg-center rounded-tl-lg rounded-tr-lg bg-[url('../assets/ilustrator.png')]"></div>
            <div className="rounded-full w-20 h-20 bg-slate-400 -mt-10 bg-[url('../assets/management.png')]"></div>
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
              {s.name}
            </h2>
            <p className="leading-relaxed text-base text-center mb-4">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Spacebox;
