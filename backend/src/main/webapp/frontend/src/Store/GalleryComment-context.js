import React, { useState } from "react";

import * as galleryCommentAction from "./GalleryComment-action";

const GalleryCommentContext = React.createContext({
  
  galleryCommentList: [],
  isSuccess: false,
  getGalleryComments1: () => {},
  createGalleryComment1: () => {},
  deleteGalleryComment: () => {},
}); // GalleryCommentContext

export const GalleryCommentContextProvider = (props) => {
  const [galleryCommentList, setGalleryCommentList] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  //const [galleryComment,setGalleryComment] = useState();

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

  const contextValue = {
    galleryCommentList,
    isSuccess,
    getGalleryComments1: getGalleryCommentsHandler,
    createGalleryComment1: createGalleryCommentHandler,
    deleteGalleryComment: deleteGalleryCommentHandler,
  }; // contextValue

  return (
    <GalleryCommentContext.Provider value={contextValue}>
      {props.children}
    </GalleryCommentContext.Provider>
  );
}; // GalleryCommentContextProvider

export default GalleryCommentContext;
