import { useParams } from "react-router-dom";
import CreateArticleForm from "../../components/Article/CreateArticleForm";
import { ArticleContextProvider } from "../../Store/Article-context";

const UpdateArticlePage = () => {
  let { articleId, clubId } = useParams();

  return (
    <ArticleContextProvider>
      <CreateArticleForm item={articleId} clubId={clubId} />
    </ArticleContextProvider>
  );
};

export default UpdateArticlePage;
