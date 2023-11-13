import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

/* export const getPageList = (param) => {
  //const URL = "/article/page?page=" + param
  const URL = `/club/one/${param}/article/page?page=${param}`;
  const response = GET(URL, {});
  return response;
}; */
export const getPageList = (clubId, pageId) => {
  const URL = `/club/one/${clubId}/article/page?page=${pageId}`;
  const response = GET(URL, {});
  return response;
};

export const getOneArticleWithImg = (param, token) => {
  //const URL = "/club/one/1/article/oneone?id=" + param
  const URL = `/club/one/${param}/article/oneone?id=${param}`;
  if (!token) {
    const response = GET(URL, {});
    return response;
  } else {
    const response = GET(URL, createTokenHeader(token));
    return response;
  }
};

export const makeArticleWithFiles = (clubId, token, formData) => {
  const URL = `/club/one/${clubId}/article/uploadimg`;
  const response = POST(URL, formData, createTokenHeader(token));
  return response;
};

/* export const makeArticleWithFiles = (token, formData) => {
 //let clubId = formData.article.clubId
  //const URL = "/article/uploadimg"
  //const URL = `/club/one/${formData.get("clubId")}/article/uploadimg`;
  const URL = `/club/one/1/article/uploadimg`;


  const response = POST(URL, formData, createTokenHeader(token))
  return response
} */

export const getChangeArticleWithFile = (token, param) => {
  //const URL = "/article/changef?id=" + param
  const URL = `/club/one/${param}/article/changef?id=${param}`;

  const response = GET(URL, createTokenHeader(token));
  return response;
};

export const changeArticleWithFiles = (clubId, token, formData) => {
  const URL = `/club/one/${clubId}/article/change`;

  const response = PUT(URL, formData, createTokenHeader(token));
  return response;
};

export const deleteArticle = (token, param) => {
  //const URL = "/article/delete?id=" + param
  const URL = `/club/one/${param}/article/delete?id=${param}`;

  const response = DELETE(URL, createTokenHeader(token));
  return response;
};
