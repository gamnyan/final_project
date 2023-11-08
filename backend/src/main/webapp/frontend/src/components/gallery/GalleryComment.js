import React, { useRef } from "react";

const GalleryComment = (props) => {
  const deleteIdRef = useRef(null);

  const submitDeleteHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    props.onDelete(deleteId);
  };

  return (
    <li>
      <h4>{props.nickname}</h4>
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
      </form>
    </li>
  );
}; // GalleryComment
export default GalleryComment;
