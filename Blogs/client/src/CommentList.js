import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState({});

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    console.log('response from our micro service is', res.data)

    setComments(res.data);
  };

  useEffect(() => {
    console.log('the list of comments are', comments)
    fetchData();
  }, []);

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
