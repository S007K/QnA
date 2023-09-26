import React, { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const Post = ({ CgProfile, closeModal }) => {
  const [auth, setAuth] = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // Post send on api || POST Method
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "/quora/v1/post/create-post",
        { title, description, photo },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Your post is live now");
      setDescription("");
      setTitle("");
      setPhoto(null);
      setLoading(false);
      setTimeout(() => {
        closeModal();
      }, 500);
    } catch (error) {
      const errorMessage = error.res.data.message || "An error occurred";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="logo flex items-center gap-2 h-10">
          {auth.user.photo ? (
            <img
              src={auth.user.photo}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <CgProfile size={35} />
          )}

          <span className="text-xl">{auth.user.name}</span>
        </div>
        <div className="h-full mt-4">
          <input
            type="text"
            placeholder="Type title of the Post"
            className="w-full py-2 px-2 outline-none border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name=""
            id=""
            className="w-full h-48 outline-none py-3 px-2 border"
            placeholder="Say something..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {/* post button */}
        <div className="mt-4 flex justify-between">
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white px-5 text-lg py-2 rounded-full "
          >
            {loading ? <Spinner /> : "Post"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
