import { Fragment } from "react";
import { useParams } from "react-router-dom";
import CommentOne from "../../components/Article/CommentOne";
import { CommentContextProvider } from "../../Store/Comment-context";
import { ArticleContextProvider } from "../../Store/Article-context";
import { RecommendContextProvider } from "../../Store/Recommend-context";
import ArticleOne from "../../components/Article/ArticleOne";
import Recommend from "../../components/Article/Recommend";

const UpdateCommentPage = () => {
    let { commentId,articleId } = useParams();
    console.log(commentId+"commentId");
    console.log(articleId+"articleId");
    

    return (
        <Fragment>
      <ArticleContextProvider>
        <ArticleOne item={articleId} />
      </ArticleContextProvider>
      <RecommendContextProvider>
        <Recommend item={articleId} />
      </RecommendContextProvider>
      <CommentContextProvider>
            <CommentOne item={commentId} articleId={articleId} />
        </CommentContextProvider>
    </Fragment>


        
    )
}

export default UpdateCommentPage;