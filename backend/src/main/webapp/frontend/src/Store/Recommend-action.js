import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export const getRecommends = (param, token) => {
  const URL = "/recommend/list?id=" + param;
  const response = token ? GET(URL, createTokenHeader(token)) : GET(URL, {});
  return response;
};

export const makeRecommend = async (id_str, token) => {
  const URL = "/recommend/";
  const id = +id_str;
  const response = POST(URL, { id: id }, createTokenHeader(token));
  return response;
};

export const deleteRecommend = (param, token) => {
  const URL = "/recommend/delete?id=" + param;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
};
