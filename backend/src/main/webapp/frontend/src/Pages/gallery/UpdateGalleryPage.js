import { useParams } from "react-router-dom";
import CreateGalleryForm from "../../components/gallery/CreateGalleryForm";
import { GalleryContextProvider } from "../../Store/Gallery-context";

const UpdateGalleryPage = () => {
  let { galleryId, clubId } = useParams();

  return (
    <GalleryContextProvider>
      <CreateGalleryForm item={galleryId} clubId={clubId} />
    </GalleryContextProvider>
  );
}; // UpdateGalleryPage

export default UpdateGalleryPage;
