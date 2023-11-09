import { useParams } from "react-router-dom";
import CreateGalleryForm from "../../components/gallery/CreateGalleryForm";
import { GalleryContextProvider } from "../../Store/Gallery-context";
//import { ClubContextProvider } from "../../Store/Club-context";

const CreateGalleryPage = () => {
  let { clubId } = useParams();

  return (
    <GalleryContextProvider>
      <CreateGalleryForm item={undefined} clubId={clubId} />
    </GalleryContextProvider>
  );
}; // CreateGalleryPage

export default CreateGalleryPage;
