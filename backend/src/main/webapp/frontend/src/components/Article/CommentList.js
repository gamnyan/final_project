import Recat, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import AuthContext from "../../Store/Auth-context";
import CommentContext from "../../Store/Comment-context";
import Comment from "./Comment";

const CommentList = (props) => {
  const [updatecomment, setUpdateComment] = useState({
    commentText: "",
  });

  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const commentRef = useRef(null);
  const textRef = useRef(null);

  const authCtx = useContext(AuthContext);
  const commentCtx = useContext(CommentContext);

  let isLogin = authCtx.isLoggedIn;
  let isSuccess = commentCtx.isSuccess;
  const token = authCtx.token;
  const articleId = String(props.item);

  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? commentCtx.getComments(articleId, authCtx.token)
      : commentCtx.getComments(articleId);
    console.log("get comment");
  }, [isLogin]);

  useEffect(() => {
    getContext();
  }, [getContext]);

  useEffect(() => {
    if (isSuccess) {
      setComments(commentCtx.commentList);
      console.log("get comment");
      setIsLoading(true);
    }
  }, [isSuccess]);

  const createComment = (event) => {
    event.preventDefault();
    const commentText = commentRef.current.value;

    if (commentText.trim() !== "") {
      const comment = {
        articleId: articleId,
        text: commentText,
      };
      commentCtx.createComment(comment, token);
      commentRef.current.value = "";
    }
  };

  const deleteComment = (commentId) => {
    commentCtx.deleteComment(commentId, articleId, token);
  };

  let media = <h3>is Loading...</h3>;

  if (isLoading && comments) {
    if (comments.length > 0) {
      console.log("if strat");
      console.log(comments);
      media = (
        <ul>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.commentId}
                commentId={comment.commentId}
                articleId={comment.articleId}
                memberNickname={comment.memberNickname}
                commentText={comment.commentText}
                createdAt={comment.createdAt.toString()}
                written={comment.written}
                onDelete={deleteComment}
                clubId={props.clubId}
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
        <form onSubmit={createComment}>
          <label htmlFor="inputName">{authCtx.userObj.nickname}</label>
          <textarea
            name="comment"
            cols={100}
            row={3}
            ref={commentRef}
            defaultValue={updatecomment && updatecomment.commentText}
          />
          <input type="submit" />
        </form>
      )}
      {media}
    </div>
  );
};
export default CommentList;
