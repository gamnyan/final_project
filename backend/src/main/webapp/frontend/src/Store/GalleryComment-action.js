import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

// token 생성
const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}; // createTokenHeader

// 갤러리 코멘트 가져오기
export const getGalleryComments = (param, token) => {
  const URL = `/gallery/comment/list?id=${param}`;
  const response = token ? GET(URL, createTokenHeader(token)) : GET(URL, {});
  return response;
}; // getGalleryComments

// 갤러리 코멘트 생성
export const createGalleryComment = (comment, token) => {
  const URL = "/gallery/comment/";
  const response = POST(URL, comment, createTokenHeader(token));
  return response;
}; // createGalleryComment

// 갤러리 코멘트 삭제
export const deleteGalleryComment = (param, token) => {
  const URL = `/gallery/comment/delete?id=${param}`;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
}; // deleteGalleryComment

// 수정할 갤러리 코멘트 가져오기
export const getGalleryComment = (param,token) => {
  const URL = `/gallery/comment/changec?id=${param}`;
  const response =token ?  GET(URL, createTokenHeader(token)) :GET(URL,{})
  return response;
}; // getGalleryComment

// 갤러리 코멘트 수정
export const changeGalleryComment = (comment,token) => {
  const URL = `/gallery/comment/change`;
  const response = PUT(URL, comment, createTokenHeader(token))
  return response;
}; // changeGalleryComment
