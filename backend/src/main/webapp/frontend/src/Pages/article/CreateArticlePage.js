import { useLocation,useParams } from "react-router-dom";
import CreateArticleForm from "../../components/Article/CreateArticleForm"

import { ArticleContextProvider } from "../../Store/Article-context"
import { ClubContextProvider } from "../../Store/Club-context";

const CreateArticlePage = () => {
  let { clubId } = useParams()
 
 
  
  return (
    <ArticleContextProvider>
      <CreateArticleForm item={undefined} clubId={clubId} />
    </ArticleContextProvider>
  )
}

export default CreateArticlePage