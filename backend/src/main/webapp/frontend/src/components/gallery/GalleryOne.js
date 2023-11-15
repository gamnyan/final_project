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
  const id = String(props.item.id);

  // deleteHandle
  const deleteHandler = (id) => {
    galleryCtx.deleteGallery(authCtx.token, id);
    alert("삭제되었습니다.");
    //navigate(`/club/${props.item.clubId}/gallery/page/1`);
    window.location.reload();
  }; // fn end deleteHandle
  const closeModalHandler = () => {
    props.onCloseModal();
  };

  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? galleryCtx.getGalleryWithImg(id, authCtx.token)
      : galleryCtx.getGalleryWithImg(id);
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

  useEffect(() => {
    if (
      galleryCtx.isError &&
      galleryCtx.errorMessage === "해당 게시글을 읽을 권한이 없습니다."
    ) {
      alert("클럽에 가입해 주세요.");
      navigate(`/club/clubpage/1`);
    }
  }, [galleryCtx.isError, galleryCtx.errorMessage, navigate]);

  let content = <p>Loading</p>;

  console.log(gallery);

  if (isLoading && gallery) {
    content = (
      <Gallery
        item={gallery}
        onDelete={deleteHandler}
        onCloseModal={closeModalHandler}
      />
    );
  } // if end
  return <div>{content}</div>;
}; // GalleryOne

export default GalleryOne;
