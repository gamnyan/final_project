import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export const getComments = (param, token) => {
  const URL = "/comment/list?id=" + param;
  const response = token ? GET(URL, createTokenHeader(token)) : GET(URL, {});
  return response;
};

export const getComment = (param,token) => {
  const URL = "/comment/changec?id="+ param
  const response = token ? GET(URL, createTokenHeader(token)) :GET(URL,{})
  return response;
}

export const makeComment = (comment, token) => {
  const URL = "/comment/";
  const response = POST(URL, comment, createTokenHeader(token));
  return response;
};

export const changeComment = (comment,token) => {
  const URL = "/comment/change"
  const response = PUT(URL, comment, createTokenHeader(token))
  return response;
}


export const deleteComment = (param, token) => {
  const URL = "/comment/delete?id=" + param;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
};
