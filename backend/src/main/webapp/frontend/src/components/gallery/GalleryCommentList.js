import Recat, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import AuthContext from "../../Store/Auth-context";
import GalleryCommentContext from "../../Store/GalleryComment-context";
import GalleryComment from "./GalleryComment";

const GalleryCommentList = (props) => {
  const [galleryComments, setGalleryComments] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const galleryCommentRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const galleryCommentCtx = useContext(GalleryCommentContext);

  let isLogin = authCtx.isLoggedIn;
  let isSuccess = galleryCommentCtx.isSuccess;
  const token = authCtx.token;
  const galleryId = String(props.item);

  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? galleryCommentCtx.getGalleryComments1(galleryId, authCtx.token)
      : galleryCommentCtx.getGalleryComments1(galleryId);
    console.log("get galleryComment");
  }, [isLogin]);

  useEffect(() => {
    getContext();
  },[getContext]);

  useEffect(() => {
    if (isSuccess) {
      setGalleryComments(galleryCommentCtx.galleryCommentList);
      console.log("get galleryComment");
      setIsLoading(true);
    }
  }, [isSuccess]);

  // createGalleryComment
  const createGalleryComment = (event) => {
    event.preventDefault();
    const galleryCommentText = galleryCommentRef.current.value;

    if (galleryCommentText.trim() !== "") {
      const galleryComment = {
        galleryId: galleryId,
        comment: galleryCommentText,
      };
      galleryCommentCtx.createGalleryComment1(galleryComment, token);
      galleryCommentRef.current.value = "";

      getContext();
    }
  }; // fn end createGalleryComment

  // deleteGalleryComment
  const deleteGalleryComment = (id) => {
    galleryCommentCtx.deleteGalleryComment(id, galleryId, token);
  }; // fn end deleteGalleryComment

  let media = <h3>is Loading...</h3>;

  if (isLoading && galleryComments) {
    if (galleryComments.length > 0) {
      console.log("if strat");
      console.log(galleryComments);
      media = (
        <ul>
          {galleryComments.map((comment) => {
            return (
              <GalleryComment
                key={comment.id}
                id={comment.id}
                memberNickname={comment.memberNickname}
                comment={comment.comment}
                createdAt={comment.createdAt.toString()}
                isWrite={comment.isWrite}
                onDelete={deleteGalleryComment}
              />
            );
          })}
        </ul>
      );
    } else {
      media = <div></div>;
    }
  }

  return (
    <div>
      {isLogin && (
        <form onSubmit={createGalleryComment}>
          <label htmlFor="inputName">{authCtx.userObj.nickname}</label>
          <textarea
            name="galleryComment"
            cols={100}
            row={3}
            ref={galleryCommentRef}
          />
          <input type="submit" />
        </form>
      )}
      {media}
    </div>
  );
}; // GalleryCommentList

export default GalleryCommentList;