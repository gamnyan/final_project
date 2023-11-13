import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "../../components/Article/ArticleList";
import { ArticleContextProvider } from "../../Store/Article-context";
import { AuthContextProvider } from "../../Store/Auth-context";  // AuthContextProvider import 추가

const ArticleListPage = () => {
   let { pageId, clubId } = useParams();

   return (
      <>
         <ArticleContextProvider>
            <AuthContextProvider>  {/* AuthContextProvider를 중첩 */}
               <Fragment>
                  <ArticleList item={pageId} clubId={clubId}  />
               </Fragment>
            </AuthContextProvider>
         </ArticleContextProvider>
      </>
   );
};

export default ArticleListPage;
