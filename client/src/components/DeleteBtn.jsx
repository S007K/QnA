import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const DeleteBtn = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/quora/v1/post/delete/${postId}`);
      if (response.data.success) {
        onDelete();
      }
    } catch (error) {
      toast.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </>
  );
};

export default DeleteBtn;
