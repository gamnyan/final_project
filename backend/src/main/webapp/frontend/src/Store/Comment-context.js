import React, { useState } from "react";

import * as commentAction from "./Comment-action";

const CommentContext = React.createContext({
  comment: undefined,
  commentList: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  getComments: () => {},
  getComment: () => {},
  updateComment: () => {},
  createComment: () => {},
  deleteComment: () => {},
});

export const CommentContextProvider = props => {
  const [commentList, setCommentList] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);
  const [comment,setComment] = useState();

  const getCommentsHandler = async (param, token) => {
    setIsSuccess(false);
    const data = token
      ? await commentAction.getComments(param, token)
      : await commentAction.getComments(param)
    const comments = await data?.data
    setCommentList(comments)
    setIsSuccess(true)
  }

  const getOneCommentHandler = async (param, token) =>{
    setIsGetUpdateSuccess(false);
    const updateData = await commentAction.getComment(param,token);
    const comment = updateData?.data;
    setComment(comment);
    setIsGetUpdateSuccess(true);
  }

  const updateCommentHandler = (comment,token) => {
    setIsSuccess(false);

    const data = commentAction.changeComment(comment,token);
    data.then(result => {
      if(result !== null){

      }
    })
    setIsSuccess(true);
  }



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
    comment,
    isSuccess,
    isGetUpdateSuccess,
    getComments: getCommentsHandler,
    getComment:getOneCommentHandler,
    updateComment:updateCommentHandler,
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
