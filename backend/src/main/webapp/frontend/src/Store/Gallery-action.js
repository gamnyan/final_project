import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

// token 생성
const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}; // createTokenHeader

// get galleryList
export const getGalleryPageList = (clubId, pageId) => {
  const URL = `/club/one/${clubId}/gallery/page?page=${pageId}`;
  const response = GET(URL, {});
  return response;
}; // getGalleryPageList

// 특정 갤러리 불러오기 with img
export const getOneGalleryWithImg = (param, token) => {
  const URL = `/club/one/${param}/gallery/feed?id=${param}`;
  if (!token) {
    const response = GET(URL, {});
    console.log(response);
    return response;
  } else {
    const response = GET(URL, createTokenHeader(token));
    return response;
  } // if end
}; // getOneGalleryList

// 갤러리 생성
export const createGalleryWithFiles = (clubId, token, formData) => {
  const URL = `/club/one/${clubId}/gallery/uploadimg`;
  const response = POST(URL, formData, createTokenHeader(token));
  return response;
}; // createGalleryWithFiles

// 갤러리 수정 (불러오기)
export const getChangeGalleryWithFile = (token, param) => {
  const URL = `/club/one/${param}/gallery/changef?id=${param}`;
  const response = GET(URL, createTokenHeader(token));
  return response;
}; // getChangeGalleryWithFile

// 갤러리 수정
export const changeGalleryWithFiles = (clubId, token, formData) => {
  const URL = `/club/one/${clubId}/gallery/change`;
  const response = PUT(URL, formData, createTokenHeader(token));
  return response;
}; // changeGalleryWithFiles

// 갤러리 삭제
export const deleteGallery = (token, param) => {
  const URL = `/club/one/${param}/gallery/delete?id=${param}`;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
}; // deleteGallery
