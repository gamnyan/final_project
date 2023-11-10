import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const GalleryComment = (props) => {
  const deleteIdRef = useRef(null);
  let navigate = useNavigate();

  const submitDeleteHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    props.onDelete(deleteId);
  };

  const submitUpdateHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    navigate(`/club/updategallerycomment/${props.galleryId}/${deleteId}`);
  };

  return (
    <li>
      <h4>{props.memberNickname}</h4>
      <p>{props.comment}</p>
      <p>{props.createdAt}</p>
      <form onSubmit={submitDeleteHandler}>
        <input type="hidden" name="id" value={props.id} ref={deleteIdRef} />
        {props.isWrite && <button type="submit">삭제</button>}
        {props.isWrite && (
          <button type="button" onClick={submitUpdateHandler}>
            수정
          </button>
        )}
      </form>
    </li>
  );
}; // GalleryComment
export default GalleryComment;
