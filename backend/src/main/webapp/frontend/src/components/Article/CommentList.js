import Recat, {useCallback,useContext,useEffect,useState,useRef} from "react";

import AuthContext from "../../Store/Auth-context";
import CommentContext from "../../Store/Comment-context";
import Comment from "./Comment";


const CommentList = props => {
    const [comments,setComments] = useState()
    const [isLoading,setIsLoading] = useState(false)

    const commentRef = useRef(null);

    const authCtx = useContext(AuthContext)
    const commentCtx = useContext(CommentContext)

    let isLogin = authCtx.isLoggedIn
    let isSuccess = commentCtx.isSuccess
    const token = authCtx.token
    const articleId = String(props.item);

    const getContext = useCallback(()=>{
        setIsLoading(false)
        isLogin
         ? commentCtx.getComments(articleId, authCtx.token)
         : commentCtx.getComments(articleId)
         console.log("get comment");
    },[isLogin])

    useEffect(()=>{
        getContext()
    },[getContext])

    useEffect(()=>{
        if(isSuccess){
            setComments(commentCtx.commentList);
            console.log("get comment");
            setIsLoading(true)

        }
    },[isSuccess])

    const createComment = event => {
        event.preventDefault();
        const comment = {
            articleId: articleId,
            text: commentRef.current.value
        }
        commentCtx.createComment(comment,token)
    }

    const deleteComment = commentId => {
        commentCtx.deleteComment(commentId, articleId,token)
    }

    let media = <h3>is Loading...</h3>

    if(isLoading && comments){
        if(comments.length > 0){
            console.log("if strat");
            console.log(comments)
            media = (
                <ul>
                    {comments.map(comment => {
                        return (
                            <Comment
                            key ={comment.commentId}
                            commentId={comment.commentId}
                            memberNickname={comment.memberNickname}
                            commentText={comment.commentText}
                            createdAt={comment.createdAt.toString()}
                            written={comment.written}
                            onDelete={deleteComment}
                            />
                        )
                    })}
                </ul>
            )

        }else{
            media = <div></div>
        }
    }

    return (
        <div>
            {media}
            {isLogin && (
                <form onSubmit={createComment} >
                    <label htmlFor="inputName" >
                        {authCtx.userObj.nickname}
                    </label>
                    <textarea
                        name="comment"
                       
                        cols={100}
                        row={3}
                        ref={commentRef}
                        />
                        <input type="submit" />
                </form>
            )}
        </div>
    )

}
export default CommentList