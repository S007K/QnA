import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteBtn from "../components/DeleteBtn";

const Post = () => {
  const [cuserPost, setCuserPost] = useState([]);

  // user basis post
  const getUserBasisPost = async () => {
    try {
      const res = await axios.get("/quora/v1/post/get-post");
      setCuserPost(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    getUserBasisPost();
  };

  useEffect(() => {
    getUserBasisPost();
  }, []);

  return (
    <>
      <div>
        <h2 className="mt-2">
          <span>Total Post:</span>{" "}
          <span className="bg-red-800 px-2  text-white font-bold">
            {" "}
            {cuserPost.length}
          </span>
        </h2>
        <div className="grid mobile:grid-cols-2 laptop:grid-cols-4 gap-3 mt-3">
          {cuserPost?.map((p) => (
            <div className="bg-[#ffffff] rounded-sm ">
              <div
                key={p.id}
                className="profile-tag-container flex gap-3 items-center px-3 py-3"
              >
                <DeleteBtn postId={p._id} onDelete={handleDelete} />
              </div>
              <div className="px-3 pt-[0.8px]">
                <div className="text-lg font-semibold leading-none text-black mb-2">
                  {p.title}
                </div>
              </div>
              <img
                src={p.photo}
                alt="post-photo"
                className="h-[10rem] w-full mt-2"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
