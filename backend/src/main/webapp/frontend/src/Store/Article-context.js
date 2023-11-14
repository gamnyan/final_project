import React, { useState } from "react";
import * as articleAction from "./Article-action";

const ArticleContext = React.createContext({
  article: undefined,
  attachment: undefined,
  page: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  totalPages: 0,
  getPageList: () => {},

  getArticleWithImg: () => {},
  createArticleWithFiles: () => {},

  getUpdateArticleWithFiles: () => {},

  updateArticleWithFiles: () => {},
  deleteArticle: () => {},
});

export const ArticleContextProvider = (props) => {
  const [article, setArticle] = useState();
  //const [attachment,setAttachment] = useState()
  const [page, setPage] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  /* const getPageHandlerV2 = async (pageId) => {
    setIsSuccess(false);
    const data = await articleAction.getPageList(pageId);
    const page = data?.data.content;
    const pages = data?.data.totalPages;
    setPage(page);
    setTotalPages(pages);
    setIsSuccess(true);
  }; */
  const getPageHandlerV2 = async (clubId, pageId) => {
    setIsSuccess(false)
    const data = await articleAction.getPageList(clubId, pageId)
    const page = data?.data.content
    const pages = data?.data.totalPages
    setPage(page)
    setTotalPages(pages)
    setIsSuccess(true)
  }

  /* const getArticleHandler2 = (param, token) => {
    setIsSuccess(false);
    const data = token
      ? articleAction.getOneArticleWithImg(param, token)
      : articleAction.getOneArticleWithImg(param);
    data.then((result) => {
      if (result !== null) {
        const article = result.data;
        //console.log(article);
        setArticle(article);
      }
    });
    setIsSuccess(true);
  }; */

  const getArticleHandler2 = (param, token) => {
    setIsSuccess(false);
    setIsError(false); // 에러 상태 초기화
    setErrorMessage(''); // 에러 메시지 초기화
    const data = token
      ? articleAction.getOneArticleWithImg(param, token)
      : articleAction.getOneArticleWithImg(param);
    data.then((result) => {
      if (result !== null) {
        const article = result.data;
        //console.log(article);
        setArticle(article);
        setIsSuccess(true);
      } else {
        // 만약 result가 null이면 에러가 발생한 것입니다.
        setIsError(true);
        setErrorMessage("해당 게시글을 읽을 권한이 없습니다.");
      }
    }).catch(error => {
      setIsError(true);
      setErrorMessage(error.message);
    });
  };

  const createArticleHandler2 = (article, token, files) => {
    setIsSuccess(false);
    //console.log(article);
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("clubId", article.clubId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const data = articleAction.makeArticleWithFiles(
      article.clubId,
      token,
      formData
    );
    console.log(data);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      }
    });

    setIsSuccess(true);
  };

  const getUpdateArticleHancler2 = async (token, param) => {
    setIsGetUpdateSuccess(false);
    const updateData = await articleAction.getChangeArticleWithFile(
      token,
      param
    );
    console.log(updateData);
    const article = updateData?.data;
    console.log(article);
    setArticle(article);
    setIsGetUpdateSuccess(true);
  };

  const updateArticleHandler2 = (article, token, files) => {
    setIsSuccess(false);

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("id", article.id);
    formData.append("clubId", article.clubId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const data = articleAction.changeArticleWithFiles(
      article.clubId,
      token,
      formData
    );

    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      }
    });

    setIsSuccess(true);
  };

  const deleteArticleHandler = (token, param) => {
    setIsSuccess(false);
    const data = articleAction.deleteArticle(token, param);
    data.then((result) => {
      if (result !== null) {
      }
    });
    setIsSuccess(true);
  };

  const contextValue = {
    article,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getPageList: getPageHandlerV2,

    getArticleWithImg: getArticleHandler2,

    createArticleWithFiles: createArticleHandler2,

    getUpdateArticleWithFiles: getUpdateArticleHancler2,

    updateArticleWithFiles: updateArticleHandler2,
    deleteArticle: deleteArticleHandler,
  };

  return (
    <ArticleContext.Provider value={contextValue}>
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
