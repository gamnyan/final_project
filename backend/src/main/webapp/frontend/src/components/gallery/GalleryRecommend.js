import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../Store/Auth-context";
import GalleryRecommendContext from "../../Store/GalleryRecommend-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const GalleryRecommend = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [galleryRecommends, setGalleryRecommends] = useState({});
  const authCtx = useContext(AuthContext);
  const galleryRecommendCtx = useContext(GalleryRecommendContext);

  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);
  console.log(props);

  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? galleryRecommendCtx.getGalleryRecommends(id, authCtx.token)
      : galleryRecommendCtx.getGalleryRecommends(id);
  }, [isLogin]);

  useEffect(() => {
    getContext();
  }, [getContext]);

  useEffect(() => {
    if (galleryRecommendCtx.isSuccess) {
      setGalleryRecommends(galleryRecommendCtx.galleryRecommends);
      console.log("set");
      setIsLoading(true);
    }
  }, [galleryRecommendCtx, galleryRecommends]);

  useEffect(() => {
    if (galleryRecommendCtx.isChangeSuccess) {
      setGalleryRecommends(galleryRecommendCtx.recommends);
      console.log("change set");
      setIsLoading(true);
    }
  }, [galleryRecommendCtx.isChangeSuccess]);

  // changeGalleryRecommend
  const changeGalleryRecommend = () => {
    if (!isLogin) {
      return alert("로그인이 필요합니다.");
    } else {
      galleryRecommends.isRecommended
        ? galleryRecommendCtx.deleteGalleryRecommend(id, authCtx.token)
        : galleryRecommendCtx.postGalleryRecommend(id, authCtx.token);
    }
  }; // fn end changeGalleryRecommend

  let media = <h3>is Loading ...</h3>;

  if (isLoading && galleryRecommends) {
    media = (
      <div>
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            color: galleryRecommends.isRecommended ? "#ff0000" : "#000000",
          }}
          onClick={changeGalleryRecommend}
        />
        <span> {galleryRecommends.galleryRecommendNum}</span>
      </div>
    );
  }
  return <div>{media}</div>;
}; // GalleryRecommend

export default GalleryRecommend;
