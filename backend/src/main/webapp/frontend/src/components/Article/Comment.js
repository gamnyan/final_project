import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Comment = (props) => {
  const deleteIdRef = useRef(null);
  const updateIdRef = useRef(null);
  let navigate = useNavigate();

  console.log(props.articleId + " articleId");
  const submitDeleteHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    props.onDelete(deleteId);
    console.log(deleteId);
  };

  const submitUpdateHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    navigate(`/club/updatecomment/${props.articleId}/${deleteId}`);
  };

  return (
    <li>
      <h4>{props.memberNickname}</h4>
      <p>{props.commentText}</p>
      <p>{props.createdAt}</p>
      <form onSubmit={submitDeleteHandler}>
        <input
          type="hidden"
          name="commentId"
          value={props.commentId}
          ref={deleteIdRef}
        />
        {props.written && <button type="submit">삭제</button>}
        {props.written && (
          <button type="button" onClick={submitUpdateHandler}>
            수정
          </button>
        )}
      </form>

      {/* 추가: 수정 폼 */}
      {/*  {props.isEditing && (
                <form onSubmit={submitUpdateHandler}>
                    <input 
                        type="hidden"
                        name="commentId"
                        value={props.commentId}
                        ref={updateIdRef}
                    />
                    <textarea
                        name="updatedCommentText"
                        defaultValue={props.commentText} // 현재 코멘트 내용을 기본값으로 설정
                    />
                    <button type="submit">저장</button>
                </form>
            )} */}
    </li>
  );
};
export default Comment;
