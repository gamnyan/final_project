import { GET, POST, DELETE } from "./Fetch-auth-action";

// token 생성
const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}; // createTokenHeader

// 갤러리 리코멘드 가져오기
export const getGalleryRecommends = (param, token) => {
  const URL = `/galleryRecommend/list?id=${param}`;
  const response = token ? GET(URL, createTokenHeader(token)) : GET(URL, {});
  return response;
}; // getGalleryRecommend

// 갤러리 리코멘트 생성
export const createGalleryRecommend = async (id_str, token) => {
  const URL = "/galleryRecommend/";
  const id = +id_str;
  const response = POST(URL, { id: id }, createTokenHeader(token));
  return response;
}; // createGalleryRecommend

// 갤러리 리코멘드 제거
export const removeGalleryRecommend = (param, token) => {
  const URL = `/galleryRecommend/delete?id=${param}`;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
}; // removeGalleryRecommend
