import React, { useState } from "react";
import * as galleryAction from "./Gallery-action";

const GalleryContext = React.createContext({
  gallery: undefined,
  attachment: undefined,
  page: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  totalPages: 0,
  getGalleryPageList: () => {},

  getGalleryWithImg: () => {},
  createGalleryWithFiles: () => {},

  getUpdateGalleryWithFiles: () => {},

  updateGalleryWithFiles: () => {},
  deleteGallery: () => {},
});

export const GalleryContextProvider = props => {
  const [gallery, setGallery] = useState();
  const [page, setPage] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 갤러리 리스트 목록
  const getGalleryPageHandler = async (clubId, pageId) => {
    setIsSuccess(false);
    const data = await galleryAction.getGalleryPageList(clubId, pageId);
    const page = data?.data.content;
    const pages = data?.data.totalPages;
    setPage(page);
    setTotalPages(pages);
    setIsSuccess(true);
  }; // getGalleryPageHandler

  // 특정 갤러리 조회
  const getGalleryHandler = (clubId, param, token) => {
    setIsSuccess(false);
    setIsError(false); // 에러 상태 초기화
    setErrorMessage(""); // 에러 메시지 초기화
    const data = token
      ? galleryAction.getOneGalleryWithImg(clubId, param, token)
      : galleryAction.getOneGalleryWithImg(clubId, param);

    data
      .then(result => {
        if (result !== null) {
          const gallery = result.data;
          setGallery(gallery);
          setIsSuccess(true);
        } else {
          setIsError(true);
          setErrorMessage("해당 게시글을 읽을 권한이 없습니다.");
        }
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.message);
      });
    setIsSuccess(true);
  }; // getGalleryHandler

  // 갤러리 생성
  const createGalleryHandler = (gallery, token, files) => {
    setIsSuccess(false);
    const formData = new FormData();
    formData.append("clubId", gallery.clubId);
    formData.append("content", gallery.content);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    } // for end

    const data = galleryAction.createGalleryWithFiles(gallery.clubId, token, formData);

    console.log(data);

    data.then(result => {
      if (result !== null) {
        console.log(isSuccess);
      } // if end
    });
    setIsSuccess(true);
  }; // createGalleryHandler

  // 갤러리 수정(불러오기)
  const getUpdateGalleryHandler = async (token, param) => {
    setIsGetUpdateSuccess(false);
    const updateData = await galleryAction.getChangeGalleryWithFile(token, param);

    console.log(updateData);

    const gallery = updateData?.data;

    console.log(gallery);

    setGallery(gallery);
    setIsGetUpdateSuccess(true);
  }; // getUpdateGalleryHandler

  // 갤러리 수정
  const updateGalleryHandler = (gallery, token, files) => {
    setIsSuccess(false);

    const formData = new FormData();
    formData.append("content", gallery.content);
    formData.append("id", gallery.id);
    formData.append("clubId", gallery.clubId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    } // for end

    const data = galleryAction.changeGalleryWithFiles(gallery.clubId, token, formData);

    data.then(result => {
      if (result !== null) {
        console.log(isSuccess);
      }
    });
    setIsSuccess(true);
  }; // updateGalleryHandler

  // 갤러리 삭제
  const deleteGalleryHandler = (token, param) => {
    setIsSuccess(false);

    const data = galleryAction.deleteGallery(token, param);
    data.then(result => {
      if (result !== null) {
      } // if end
    });
    setIsSuccess(true);
  }; // deleteGalleryHandler

  const contextValue = {
    gallery,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getGalleryPageList: getGalleryPageHandler,
    getGalleryWithImg: getGalleryHandler,
    createGalleryWithFiles: createGalleryHandler,
    getUpdateGalleryWithFiles: getUpdateGalleryHandler,
    updateGalleryWithFiles: updateGalleryHandler,
    deleteGallery: deleteGalleryHandler,
  };

  console.log(contextValue);

  return <GalleryContext.Provider value={contextValue}>{props.children}</GalleryContext.Provider>;
}; // GalleryContextProvider

export default GalleryContext;
