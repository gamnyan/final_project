import React, { useState } from "react";

import * as commentAction from "./Comment-action";

const CommentContext = React.createContext({
  commentList: [],
  isSuccess: false,
  getComments: () => {},
  createComment: () => {},
  deleteComment: () => {},
});

export const CommentContextProvider = (props) => {
  const [commentList, setCommentList] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const getCommentsHandler = async (param, token) => {
    setIsSuccess(false);
    const data = token
      ? await commentAction.getComments(param, token)
      : await commentAction.getComments(param);
    const comments = await data?.data;
    setCommentList(comments);
    setIsSuccess(true);
  };

  const createCommentHandler = async (comment, token) => {
    setIsSuccess(false);
    const postData = await commentAction.makeComment(comment, token);
    const msg = await postData?.data;

    const getData = await commentAction.getComments(comment.articleId, token);
    const comments = getData?.data;
    setCommentList(comments);
    setIsSuccess(true);
  };

  const deleteCommentHandler = async (param, id, token) => {
    setIsSuccess(false);
    const deleteData = await commentAction.deleteComment(param, token);
    const msg = deleteData?.data;

    const getData = await commentAction.getComments(id, token);
    const comments = getData?.data;
    setCommentList(comments);
    setIsSuccess(true);
  };

  const contextValue = {
    commentList,
    isSuccess,
    getComments: getCommentsHandler,
    createComment: createCommentHandler,
    deleteComment: deleteCommentHandler,
  };

  return (
    <CommentContext.Provider value={contextValue}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
