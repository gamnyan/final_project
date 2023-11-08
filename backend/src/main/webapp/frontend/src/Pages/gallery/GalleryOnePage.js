import { Fragment } from "react";
import { useParams } from "react-router-dom";
import GalleryOne from "../../components/gallery/GalleryOne";
import GalleryComment from "../../components/gallery/GalleryCommentList";
import GalleryRecommend from "../../components/gallery/GallertRecommend";
import { GalleryContextProvider } from "../../Store/Gallery-context";
import { GalleryCommentContextProvider } from "../../Store/Gallery-context";
import { GalleryRecommendContextProvider } from "../../Store/GalleryRecommend-context";

const GalleryOnePage = () => {
  let { galleryId, clubId } = useParams();

  return (
    <Fragment>
      <GalleryContextProvider>
        <GalleryOne item={galleryId} clubId={clubId} />
      </GalleryContextProvider>

      <GalleryRecommendContextProvider>
        <GalleryRecommend item={galleryId} clubId={clubId} />
      </GalleryRecommendContextProvider>

      <GalleryCommentContextProvider>
        <GalleryComment item={galleryId} clubId={clubId} />
      </GalleryCommentContextProvider>
    </Fragment>
  );
};

export default GalleryOnePage;
