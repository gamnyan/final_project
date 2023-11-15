import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "../../components/Article/ArticleList";
//import SearchForm from "../components/Article/SearchForm"
import { ArticleContextProvider } from "../../Store/Article-context";





const ArticleListPage = () => {
   let { pageId, clubId } = useParams();

   

   return (
      <>
         <ArticleContextProvider>
            <Fragment>
               <ArticleList item={pageId} clubId={clubId}  />
               {/* <SearchForm /> */}
            </Fragment>
         </ArticleContextProvider>
      </>
   );
};

export default ArticleListPage;
