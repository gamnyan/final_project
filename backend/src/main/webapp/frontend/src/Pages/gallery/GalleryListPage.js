import { Fragment } from "react";
import { useParams } from "react-router-dom";
import GalleryList from "../../components/gallery/GalleryList";
import { GalleryContextProvider } from "../../Store/Gallery-context";
//import CreateGalleryPage from "CreateGalleryPage";

const GalleryListPage = () => {
  let { pageId, clubId } = useParams();

  return (
    <>
      <GalleryContextProvider>
        <Fragment>
          <GalleryList item={pageId} clubId={clubId} />
        </Fragment>
      </GalleryContextProvider>
    </>
  );
}; // GalleryListPage

export default GalleryListPage;
