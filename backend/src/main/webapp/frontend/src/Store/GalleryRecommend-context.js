import React, { useState } from "react";

import * as galleryRecommendAction from "./GalleryRecommend-action";

const GalleryRecommendContext = React.createContext({
  galleryRecommends: undefined,
  isSuccess: false,
  isChangeSuccess: false,
  getGalleryRecommends: () => {},
  postGalleryRecommend: () => {},
  deleteGalleryRecommend: () => {},
}); // GalleryRecommendContext

export const GalleryRecommendContextProvider = (props) => {
  const [galleryRecommends, setGalleryRecommends] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChangeSuccess, setIsChangeSuccess] = useState(false);

  // 갤러리 리코멘드 가져오기
  const getGalleryRecommendHandler = (param, token) => {
    setIsSuccess(false);

    const data = token
      ? galleryRecommendAction.getGalleryRecommends(param, token)
      : galleryRecommendAction.getGalleryRecommends(param);
    data.then((result) => {
      if (result !== null) {
        const galleryRecommends = result.data;
        setGalleryRecommends(galleryRecommends);
      } // if end
    });
    setIsSuccess(true);
  }; // getGalleryRecommendHandler

  // 갤러리 리코멘드 생성
  const postGalleryRecommendHandler = async (id, token) => {
    setIsChangeSuccess(false);
    const postData = await galleryRecommendAction.createGalleryRecommend(
      id,
      token
    );
    const msg = await postData?.data;
    console.log(msg);

    const getData = await galleryRecommendAction.getGalleryRecommends(
      id,
      token
    );
    const galleryRecommends = getData?.data;
    setGalleryRecommends(galleryRecommends);
    setIsChangeSuccess(true);
  }; // postGalleryRecommendHandler

  // 갤러리 리코멘드 삭제
  const deleteGalleryRecommendHandler = async (param, token) => {
    setIsChangeSuccess(false);

    const deleteData = await galleryRecommendAction.removeGalleryRecommend(
      param,
      token
    );
    const msg = await deleteData?.data;
    console.log(msg);

    const getData = await galleryRecommendAction.getGalleryRecommends(
      param,
      token
    );
    const galleryRecommends = getData?.data;
    setGalleryRecommends(galleryRecommends);
    console.log(galleryRecommends);
    setIsChangeSuccess(true);
  }; // deleteGalleryRecommendHandler

  const contextValue = {
    galleryRecommends,
    isSuccess,
    isChangeSuccess,
    getGalleryRecommends: getGalleryRecommendHandler,
    postGalleryRecommend: postGalleryRecommendHandler,
    deleteGalleryRecommend: deleteGalleryRecommendHandler,
  }; // contextValue

  return (
    <GalleryRecommendContext.Provider value={contextValue}>
      {props.children}
    </GalleryRecommendContext.Provider>
  );
}; // GalleryRecommendContextProvider

export default GalleryRecommendContext;
