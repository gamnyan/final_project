import React, { useState } from "react"
import * as articleAction from "./Article-action"

const ArticleContext = React.createContext({
  article: undefined,
  attachment: undefined,
  page: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  totalPages: 0,
  getPageList: () => {},
  getArticle: () => {},
  getArticleWithImg: () =>{},
  createArticleWithFiles: ()=>{},
  createArticle: () => {},
  getUpdateArticle: () => {},
  getUpdateArticleWithFiles:() =>{},
  updateArticle: () => {},
  updateArticleWithFiles: () => {},
  deleteArticle: () => {}
})

export const ArticleContextProvider = props => {
  const [article, setArticle] = useState()
  //const [attachment,setAttachment] = useState()
  const [page, setPage] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false)

  const getPageHandlerV2 = async pageId => {
    setIsSuccess(false)
    const data = await articleAction.getPageList(pageId)
    const page = data?.data.content
    const pages = data?.data.totalPages
    setPage(page)
    setTotalPages(pages)
    setIsSuccess(true)
  }

  const getArticleHandler = (param, token) => {
    setIsSuccess(false)
    const data = token
      ? articleAction.getOneArticle(param, token)
      : articleAction.getOneArticle(param)
    data.then(result => {
      if (result !== null) {
        const article = result.data
        setArticle(article)
      }
    })
    setIsSuccess(true)
  }

  const getArticleHandler2 = (param, token) => {
    setIsSuccess(false)
    const data = token
      ? articleAction.getOneArticleWithImg(param, token)
      : articleAction.getOneArticleWithImg(param)
    data.then(result => {
      if (result !== null) {
        const article = result.data
        setArticle(article)
      }
    })
    setIsSuccess(true)
  }

  const createArticleHandler = (article, token) => {
    setIsSuccess(false)
    const data = articleAction.makeArticle(token, article)
    data.then(result => {
      if (result !== null) {
        console.log(isSuccess)
      }
    })
    setIsSuccess(true)
  }

  const createArticleHandler2 = (article, token, files) => {
    setIsSuccess(false)
  
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("clubId",article.clubId);
  
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  
    const data = articleAction.makeArticleWithFiles(token, formData);
  
    data.then(result => {
      if (result !== null) {
        console.log(isSuccess)
      }
    })
  
    setIsSuccess(true)
  }



  const getUpdateArticleHancler = async (token, param) => {
    setIsGetUpdateSuccess(false)
    const updateData = await articleAction.getChangeArticle(token, param)
    const article = updateData?.data
    setArticle(article)
    setIsGetUpdateSuccess(true)
  }

  const getUpdateArticleHancler2 = async (token, param) => {
    setIsGetUpdateSuccess(false)
    const updateData = await articleAction.getChangeArticleWithFile(token, param)
    console.log(updateData);
    const article = updateData?.data
    console.log(article);
    setArticle(article)
    setIsGetUpdateSuccess(true)
  }

  const updateArticleHandler = (token, article) => {
    setIsSuccess(false)
    console.log("update api start")
    const data = articleAction.changeArticle(token, article)
    data.then(result => {
      if (result !== null) {
      }
    })
    setIsSuccess(true)
  }

   const updateArticleHandler2 = (article, token, files) => {
    setIsSuccess(false)
  
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("id",article.id);
  
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  
    const data = articleAction.changeArticleWithFiles(token, formData);
  
    data.then(result => {
      if (result !== null) {
        console.log(isSuccess)
      }
    })
  
    setIsSuccess(true)
  } 

 /*  const updateArticleHandler2 = async (article, token, files) => {
    try {
        setIsSuccess(false);

        const formData = new FormData();
        formData.append("title", article.title);
        formData.append("content", article.content);

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        const result = await articleAction.changeArticleWithFiles(token, formData);

        if (result !== null) {
            console.log(isSuccess);
        }

        setIsSuccess(true);
    } catch (error) {
        // 에러가 발생한 경우 처리
        console.error("에러 발생:", error);
        setIsSuccess(false); // 에러가 발생한 경우 isSuccess를 false로 설정
    }
}*/


  const deleteArticleHandler = (token, param) => {
    setIsSuccess(false)
    const data = articleAction.deleteArticle(token, param)
    data.then(result => {
      if (result !== null) {
      }
    })
    setIsSuccess(true)
  } 

  const contextValue = {
    article,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getPageList: getPageHandlerV2,
    getArticle: getArticleHandler,
    getArticleWithImg:getArticleHandler2,
    createArticle: createArticleHandler,
    createArticleWithFiles:createArticleHandler2,
    getUpdateArticle: getUpdateArticleHancler,
    getUpdateArticleWithFiles:getUpdateArticleHancler2,
    updateArticle: updateArticleHandler,
    updateArticleWithFiles:updateArticleHandler2,
    deleteArticle: deleteArticleHandler
  }

  return (
    <ArticleContext.Provider value={contextValue}>
      {props.children}
    </ArticleContext.Provider>
  )
}

export default ArticleContext
