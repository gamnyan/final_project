import { GET,POST,PUT,DELETE } from "./Fetch-auth-action"

const createTokenHeader = token => {
  return {
    headers: {
      Authorization: "Bearer " + token
    }
  }
}

export const getPageList = param => {
  const URL = "/article/page?page=" + param
  const response = GET(URL, {})
  return response
}

/* export const getOneArticle = (param, token) => {
  const URL = "/article/one?id=" + param
  if (!token) {
    const response = GET(URL, {})
    return response
  } else {
    const response = GET(URL, createTokenHeader(token))
    return response
  }
} */

export const getOneArticleWithImg = (param, token) => {
  const URL = "/club/one/1/article/oneone?id=" + param
  if (!token) {
    const response = GET(URL, {})
    return response
  } else {
    const response = GET(URL, createTokenHeader(token))
    return response
  }
}

/* export const makeArticle = (token, article) => {
  const URL = "/article/noimg"
  

  const response = POST(URL, article, createTokenHeader(token))
  return response
} */

export const makeArticleWithFiles = (token, formData) => {
 
  const URL = "/article/uploadimg"

  const response = POST(URL, formData, createTokenHeader(token))
  return response
}

/* export const getChangeArticle = (token, param) => {
  const URL = "/article/change?id=" + param
  const response = GET(URL, createTokenHeader(token))
  return response
} */

export const getChangeArticleWithFile = (token, param) => {
  const URL = "/article/changef?id=" + param
  const response = GET(URL, createTokenHeader(token))
  return response
}

/* export const changeArticle = (token, article) => {
  const URL = "/article/"
  const response = PUT(URL, article, createTokenHeader(token))
  return response
} */

export const changeArticleWithFiles = (token, formData) => {
 
  const URL = "/article/change"

  const response = PUT(URL, formData, createTokenHeader(token))
  return response
}

export const deleteArticle = (token, param) => {
  const URL = "/article/delete?id=" + param
  const response = DELETE(URL, createTokenHeader(token))
  return response
}
