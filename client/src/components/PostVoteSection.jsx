import React, { useEffect, useState } from "react";
import { BiUpvote, BiDownvote, BiMessageRounded } from "react-icons/bi";
import { BsRecycle } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";

const PostVoteSection = ({ postId }) => {
  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    async function fetchUserVote() {
      try {
        const response = await axios.get(
          `/quora/v1/vote/update-vote/${postId}`
        );
        setUserVote(response.data.voteType);
        setVotes(response.data.totalVotes); // Update total votes from the response
      } catch (error) {
        console.error("Error fetching user vote:", error);
      }
    }
    fetchUserVote();
  }, [postId]);

  const handleVote = async (voteType) => {
    try {
      const response = await axios.post("/quora/v1/vote/update-vote", {
        postId,
        voteType,
      });
      setVotes(response.data.updatedVotes);
      setUserVote(voteType);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-4">
      <div className="vote-button-container py-3 px-2 flex items-center gap-4">
        <div className="flex bg-[#f7f7f7] justify-center gap-3 px-4 py-2 rounded-full">
          <div
            className="flex flex-row gap-2 font-semibold cursor-pointer text-gray-600 hover:bg-slate-200"
            onClick={() => handleVote("upvote")}
            disabled={userVote === "upvote"}
          >
            <BiUpvote size={20} />
            {userVote ? "Upvoted" : "Upvote"}
          </div>
          {votes}
          <div className="w-[0.1rem] bg-slate-500"></div>
          <div
            className=" cursor-pointer text-gray-400 hover:bg-slate-200"
            onClick={() => handleVote("downvote")}
            disabled={userVote === "downvote"}
          >
            <BiDownvote size={20} />
          </div>
        </div>
        <div className="px-3 py-2 hover:bg-slate-100 hover:rounded-full cursor-pointer">
          <BiMessageRounded size={20} />
        </div>
        <div className="px-3 py-2 hover:bg-slate-100 hover:rounded-full cursor-pointer">
          <BsRecycle size={20} />
        </div>
      </div>
      <div className="menu font-bold text-lg px-3 py-2 hover:bg-slate-100 hover:rounded-full cursor-pointer">
        <CiMenuKebab />
      </div>
    </div>
  );
};

export default PostVoteSection;
