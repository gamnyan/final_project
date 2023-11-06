import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export const getPageList = (param) => {
  const URL = "/club/page?page=" + param;
  const response = GET(URL, {});
  return response;
};

export const getOneClub = (param, token) => {
  

  const URL = `/club/one/${param}`;
  const response = token ? GET(URL, createTokenHeader(token)) : GET(URL, {});
  return response;
};

export const createClub = (clubData, token) => {
  const URL = "/club/create";

  const formData = new FormData();
  formData.append("name", clubData.name);
  formData.append("category", clubData.category);
  formData.append("clubinfo", clubData.clubinfo);
  formData.append("address", clubData.address);
  formData.append("file", clubData.file);

  const response = POST(URL, formData, createTokenHeader(token));
  return response;
};

export const changeClub = (clubData, token) => {
  const URL = "/club/changec";

  const formData = new FormData();
  formData.append("id", clubData.id);
  formData.append("name", clubData.name);
  formData.append("category", clubData.category);
  formData.append("clubinfo", clubData.clubinfo);
  formData.append("address", clubData.address);

  if (clubData.file) {
    formData.append("file", clubData.file);
  }

  const response = PUT(URL, formData, createTokenHeader(token));
  return response;
};

export const deleteClub = (id, token) => {
  const URL = `/club/delete?id=${id}`;
  const response = DELETE(URL, createTokenHeader(token));
  return response;
};

export const getChangeClub = (id, token) => {
  const URL = `/club/change?id=${id}`;
  const response = GET(URL, createTokenHeader(token));
  return response;
};

export const processImg = (storeFilename) => {
  const URL = `/club/img/${storeFilename}`;
  const response = GET(URL, {});
  return response;
};
