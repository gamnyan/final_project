import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GalleryContext from "../../Store/Gallery-context";
import Authcontext from "../../Store/Auth-context";
import Gallery from "./Gallery";

const GalleryOne = (props) => {
  let navigate = useNavigate();

  const [gallery, setGallery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(Authcontext);
  const galleryCtx = useContext(GalleryContext);

  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);

  // deleteHandle
  const deleteHandler = (id) => {
    galleryCtx.deleteGallery(authCtx.token, id);
    alert("삭제되었습니다.");
    navigate(`/club/${props.clubId}/gallery/page/1`);
  }; // fn end deleteHandle

  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? galleryCtx.getGalleryWithImg(props.clubId, id, authCtx.token)
      : galleryCtx.getGalleryWithImg(props.clubId, id);
  }, [isLogin]);

  useEffect(() => {
    getContext();
  }, [getContext]);

  useEffect(() => {
    if (galleryCtx.isSuccess) {
      setGallery(galleryCtx.gallery);
      setIsLoading(true);
    }
  }, [galleryCtx, gallery]);

  let content = <p>Loading</p>;

  if (isLoading && gallery) {
    content = <Gallery item={gallery} onDelete={deleteHandler} />;
  } // if end
  return <div>{content}</div>;
}; // GalleryOne

export default GalleryOne;
