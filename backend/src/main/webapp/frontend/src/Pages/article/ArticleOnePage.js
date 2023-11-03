import { Fragment } from "react"
import { useParams } from "react-router-dom"
import ArticleOne from "../../components/Article/ArticleOne"
import Comment from "../../components/Article/CommentList"
import Recommend from "../../components/Article/Recommend"
import { ArticleContextProvider } from "../../Store/Article-context"
import { CommentContextProvider } from "../../Store/Comment-context"
import { RecommendContextProvider } from "../../Store/Recommend-context"

const ArticleOnePage = () => {
  let { articleId } = useParams()

  return (
    <Fragment>
      <ArticleContextProvider>
        <ArticleOne item={articleId} />
      </ArticleContextProvider>
      <RecommendContextProvider>
        <Recommend item={articleId} />
      </RecommendContextProvider>
      <CommentContextProvider>
        <Comment item={articleId} />
      </CommentContextProvider>
    </Fragment>
  )
}

export default ArticleOnePage