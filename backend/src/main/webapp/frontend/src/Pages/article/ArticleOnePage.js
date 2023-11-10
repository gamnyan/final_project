import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ArticleOne from "../../components/Article/ArticleOne";
import CommentList from "../../components/Article/CommentList";
import Recommend from "../../components/Article/Recommend";
import { ArticleContextProvider } from "../../Store/Article-context";
import { CommentContextProvider } from "../../Store/Comment-context";
import { RecommendContextProvider } from "../../Store/Recommend-context";

const ArticleOnePage = () => {
  let { articleId, clubId } = useParams();

  return (
    <Fragment>
      <ArticleContextProvider>
        <ArticleOne item={articleId} clubId={clubId} />
      </ArticleContextProvider>
      <RecommendContextProvider>
        <Recommend item={articleId} clubId={clubId} />
      </RecommendContextProvider>
      <CommentContextProvider>
        <CommentList item={articleId} clubId={clubId} />
      </CommentContextProvider>
    </Fragment>
  );
};

export default ArticleOnePage;
