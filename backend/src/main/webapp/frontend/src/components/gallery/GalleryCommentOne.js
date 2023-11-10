import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import AuthContext from "../../Store/Auth-context";
import GalleryCommentContext from "../../Store/GalleryComment-context";
import { useNavigate } from "react-router-dom";

const GalleryCommentOne = (props) => {
  const galleryId = props.galleryId;
  const commentId = null;
  console.log(props.item);
  const galleryCommentCtx = useContext(GalleryCommentContext);
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const galleryCommentRef = useRef(null);

  const [updateGalleryComment, setUpdateGalleryComment] = useState({
    comment: "",
    id: "",
  });

  const setUpdateGalleryCommentHandler = useCallback(() => {
    if (galleryCommentCtx.isGetUpdateSuccess) {
      setUpdateGalleryComment({
        id: props.item,
        comment: galleryCommentCtx.galleryComment.comment,
      });
    }
  }, [galleryCommentCtx.isGetUpdateSuccess]);

  const submitUpdateHandler = async (event) => {
    event.preventDefault();

    const updateGalleryComment = {
      id: props.item,
      comment: galleryCommentRef.current.value,
    };

    try {
      const response = galleryCommentCtx.updateGalleryComment(
        updateGalleryComment,
        authCtx.token
      );
      navigate(`/club/${props.clubId}/gallery/${galleryId}`);

      if (response) {
        console.log("댓글이 성공적으로 수정되었습니다.");
      }
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    console.log(galleryCommentCtx);
    if (galleryCommentCtx.comment) {
      setUpdateGalleryComment({
        id: props.item,
        comment: galleryCommentCtx.galleryComment.comment,
      });
    }
  }, [galleryCommentCtx.isGetUpdateSuccess]);

  useEffect(() => {
    if (props.item) {
      galleryCommentCtx.getOneGalleryComment(props.item, authCtx.token);
    }
  }, [props.item]);

  useEffect(() => {
    setUpdateGalleryCommentHandler();
  }, [setUpdateGalleryCommentHandler]);

  return (
    <div>
      {galleryCommentCtx.galleryComment && (
        <form onSubmit={submitUpdateHandler}>
          <label>댓글 내용:</label>
          <input
            type="text"
            value={updateGalleryComment.comment}
            onChange={(e) =>
              setUpdateGalleryComment({
                id: props.item,
                comment: e.target.value,
              })
            }
            ref={galleryCommentRef} // ref를 연결합니다.
          />
          <button type="submit">수정</button>
        </form>
      )}
    </div>
  );
};

export default GalleryCommentOne;
