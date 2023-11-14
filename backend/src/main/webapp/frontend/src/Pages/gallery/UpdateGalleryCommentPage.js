import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { GalleryCommentContextProvider } from "../../Store/GalleryComment-context";
import { GalleryContextProvider } from "../../Store/Gallery-context";

import { GalleryRecommendContextProvider} from "../../Store/GalleryRecommend-context"
import GalleryOne from "../../components/gallery/GalleryOne"
import GalleryRecommend from "../../components/gallery/GalleryRecommend"
import GalleryCommentOne from "../../components/gallery/GalleryCommentOne";


const UpdateGalleryCommentPage = () => {
    let { id,galleryId} = useParams();

    return(
        <Fragment>
            <GalleryContextProvider>
                <GalleryOne item={galleryId} />
            </GalleryContextProvider>
            <GalleryRecommendContextProvider>
                <GalleryRecommend item={galleryId} />
            </GalleryRecommendContextProvider>
            <GalleryCommentContextProvider>
                <GalleryCommentOne item={id} galleryId={galleryId} />
            </GalleryCommentContextProvider>
        </Fragment>
    )
}
export default UpdateGalleryCommentPage;