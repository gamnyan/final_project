import React, { useState } from "react";

import * as galleryCommentAction from "./GalleryComment-action";

const GalleryCommentContext = React.createContext({
  galleryComment: undefined,
  galleryCommentList: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  getOneGalleryComment: () => {},
  updateGalleryComment: () => {},
  getGalleryComments1: () => {},
  createGalleryComment1: () => {},
  deleteGalleryComment: () => {},
}); // GalleryCommentContext

export const GalleryCommentContextProvider = (props) => {
  const [galleryCommentList, setGalleryCommentList] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [galleryComment, setGalleryComment] = useState();
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);

  // 갤러리 코멘트 목록
  const getGalleryCommentsHandler = async (param, token) => {
    setIsSuccess(false);
    const data = token
      ? await galleryCommentAction.getGalleryComments(param, token)
      : await galleryCommentAction.getGalleryComments(param);
    const galleryComments = await data?.data;
    setGalleryCommentList(galleryComments);
    setIsSuccess(true);
  }; // getGalleryCommentsHandler

  // 갤러리 코멘트 생성
  const createGalleryCommentHandler = async (comment, token) => {
    setIsSuccess(false);

    const postData = await galleryCommentAction.createGalleryComment(
      comment,
      token
    );
    const msg = await postData?.data;

    const getData = await galleryCommentAction.getGalleryComments(
      comment.galleryId,
      token
    );
    const galleryComments = getData?.date;
    setGalleryCommentList(galleryComments);
    setIsSuccess(true);
  }; // createGalleryCommentHandler

  // 갤러리 코멘트 삭제
  const deleteGalleryCommentHandler = async (param, id, token) => {
    setIsSuccess(false);

    const deleteData = await galleryCommentAction.deleteGalleryComment(
      param,
      token
    );
    const msg = deleteData?.data;

    const getData = await galleryCommentAction.getGalleryComments(id, token);
    const galleryComments = getData?.data;
    setGalleryCommentList(galleryComments);
    setIsSuccess(true);
  }; // deleteGalleryComment

  // 수정할 갤러리 코멘트 겟
  const getOneGalleryCommentHandler = async (param, token) => {
    setIsGetUpdateSuccess(false);
    const updateData = await galleryCommentAction.getGalleryComment(
      param,
      token
    );
    const galleryComment = updateData?.data;
    setGalleryComment(galleryComment);
    setIsGetUpdateSuccess(true);
  }; // getOneGalleryCommentHandler

  // 갤러리 코멘트 수정
  const updateGalleryCommentHandler = (comment, token) => {
    setIsSuccess(false);
    const data = galleryCommentAction.changeGalleryComment(comment, token);
    data.then((result) => {
      if (result !== null) {
        setIsSuccess(true);
      }
    });
    return data;
  }; // updateGalleryCommentHandler

  const contextValue = {
    galleryComment,
    galleryCommentList,
    isSuccess,
    isGetUpdateSuccess,
    getGalleryComments1: getGalleryCommentsHandler,
    createGalleryComment1: createGalleryCommentHandler,
    deleteGalleryComment: deleteGalleryCommentHandler,
    getOneGalleryComment: getOneGalleryCommentHandler,
    updateGalleryComment: updateGalleryCommentHandler,
  }; // contextValue

  return (
    <GalleryCommentContext.Provider value={contextValue}>
      {props.children}
    </GalleryCommentContext.Provider>
  );
}; // GalleryCommentContextProvider

export default GalleryCommentContext;
