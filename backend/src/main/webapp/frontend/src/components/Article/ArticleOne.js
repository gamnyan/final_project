import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ArticleContext from "../../Store/Article-context";
import AuthContext from "../../Store/Auth-context";
import Article from "./Article";

const ArticleOne = (props) => {
  let navigate = useNavigate();

  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const articleCtx = useContext(ArticleContext);

  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);

  const deleteHandler = (id) => {
    articleCtx.deleteArticle(authCtx.token, id);
    alert("삭제되었습니다.");
    navigate(`/club/${props.clubId}/article/page/1`);
  };

  /* const getContext = useCallback(()=>{
        setIsLoading(false);
        isLogin
            ? articleCtx.getArticle(id, authCtx.token)
            : articleCtx.getArticle(id);
    },[isLogin]) */
  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? articleCtx.getArticleWithImg(id, authCtx.token) // 수정된 부분
      : articleCtx.getArticleWithImg(id); // 수정된 부분
  }, [isLogin]);

  useEffect(() => {
    getContext();
  }, [getContext]);

  useEffect(() => {
    if (articleCtx.isSuccess) {
      setArticle(articleCtx.article);

      setIsLoading(true);
    }
  }, [articleCtx, article]);
  useEffect(() => {
    if (
      articleCtx.isError &&
      articleCtx.errorMessage === "해당 게시글을 읽을 권한이 없습니다."
    ) {
      alert("클럽에 가입해 주세요1");
      navigate(`/club/clubpage/1`);
    }
  }, [articleCtx.isError, articleCtx.errorMessage, navigate]);

  let content = <p>Loading</p>;

  if (isLoading && article) {
    content = <Article item={article} onDelete={deleteHandler} />;
  }
  return <div>{content}</div>;
};
export default ArticleOne;
