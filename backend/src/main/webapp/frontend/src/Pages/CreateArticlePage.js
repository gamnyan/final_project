import CreateArticleForm from "../components/Article/CreateArticleForm"

import { ArticleContextProvider } from "../Store/Article-context"

const CreateArticlePage = () => {
  return (
    <ArticleContextProvider>
      <CreateArticleForm item={undefined} />
    </ArticleContextProvider>
  )
}

export default CreateArticlePage