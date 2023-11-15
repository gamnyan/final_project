import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export const getMyClubPage = (param, token) => {
  const URL = `/club/myClubs`;
  if (!token) {
    const response = GET(URL, {});
    return response;
  } else {
    const response = GET(URL, createTokenHeader(token));
    return response;
  }
};

export const getClubPageList = (param) => {
  const URL = "/club/page?page=" + param;
  const response = GET(URL, {});
  return response;
};

export const getClubPageListLoggedIn = (param, token) => {
  const URL = "/club/page?page=" + param;
  if (!token) {
    const response = GET(URL, {});
    return response;
  } else {
    const response = GET(URL, createTokenHeader(token));
    return response;
  }
};

export const getOneClubWithImg = (param, token) => {
  const URL = "/club/one/" + param;
  if (!token) {
    const response = GET(URL, {});
    return response;
  } else {
    const response = GET(URL, createTokenHeader(token));
    return response;
  }
};

export const makeClubWithFiles = (token, formData) => {
  const URL = "/club/create";
  const response = POST(URL, formData, createTokenHeader(token));
  return response;
};

export const getChangeClubWithFile = (token, param) => {
  const URL = "/club/change?id=" + param;
  const response = GET(URL, createTokenHeader(token));
  return response;
};

export const changeClubWithFile = (token, formData) => {
  const URL = "/club/changec";
  const response = PUT(URL, formData, createTokenHeader(token));
  return response;
};

export const deleteClub = (token, param) => {
  const URL = "/club/delete?id=" + param;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
};
