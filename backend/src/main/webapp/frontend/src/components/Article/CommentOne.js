import React, { useContext, useEffect, useCallback, useState, useRef } from "react";
import AuthContext from "../../Store/Auth-context";
import CommentContext from "../../Store/Comment-context";

const CommentOne = props => {
    const commentId = null;
    const commentCtx = useContext(CommentContext);
    const authCtx = useContext(AuthContext);
    console.log(props.item+"pi");


    const commentTextRef = useRef(null);

    const [updatecomment, setUpdateComment] = useState({
        commentText: "",
        commentId:""
    });

   /*  useEffect(() => {
        if(props.itme){
            commentCtx.getComment(id);

        }
    }, [props.item]); */

    const setUpdateCommentHandler = useCallback(() => {
        if (commentCtx.isGetUpdateSuccess) {
            setUpdateComment({
               
                commentId:props.item,
                commentText: commentCtx.comment.commentText
            });
        }
    }, [commentCtx.isGetUpdateSuccess]);

    const submitUpdateHandler = async event => {
        event.preventDefault();

        const updatedComment = {
            commentId: props.item,
            commentText: commentTextRef.current.value
           
        };

        try {
          
            const response = commentCtx.updateComment(updatedComment, authCtx.token);

           
            if (response ) {
                console.log("댓글이 성공적으로 수정되었습니다.");
               
            }
        } catch (error) {
            console.error("댓글 수정 중 오류 발생:", error);
           
        }
    };

     useEffect(() => {
        if (props.item) {
            commentCtx.getComment(props.item, authCtx.token);
        }
    }, [props.item]);

    useEffect(() => {
        setUpdateCommentHandler();
    }, [setUpdateCommentHandler]);

    return (
        <div>
            {commentCtx.comment && (
                <form onSubmit={submitUpdateHandler}>
                    <label>댓글 내용:</label>
                    <input
                        type="text"
                        value={updatecomment.commentText}
                        onChange={e => setUpdateComment({
                          
                            commentId:props.item,
                            commentText: e.target.value
                        })}
                        ref={commentTextRef} // ref를 연결합니다.
                    />
                    <button type="submit">수정</button>
                </form>
            )}
        </div>
    );
};

export default CommentOne;
