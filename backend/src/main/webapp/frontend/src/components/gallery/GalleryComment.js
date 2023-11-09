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
      <h4>{props.memberNickname}</h4>
      <p>{props.comment}</p>
      <p>{props.createdAt}</p>
      <form onSubmit={submitDeleteHandler}>
        <input
          type="hidden"
          name="id"
          value={props.id}
          ref={deleteIdRef}
        />
        {props.isWrite && <button type="submit">삭제</button>}
      </form>
    </li>
  );
}; // GalleryComment
export default GalleryComment;
