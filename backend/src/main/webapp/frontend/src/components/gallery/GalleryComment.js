import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const GalleryComment = (props) => {
  const deleteIdRef = useRef(null);
  let navigate = useNavigate();

  const submitDeleteHandler = (event) => {
    event.preventDefault();

    props.onDelete(props.id);
  };

  /*   const submitUpdateHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    navigate(`/club/updategallerycomment/${props.galleryId}/${deleteId}`);
  }; */

  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(props.comment);

  const startEditingHandler = () => {
    setIsEditing(true);
    setEditedComment(props.comment);
  };

  const cancelEditingHandler = () => {
    setIsEditing(false);
    setEditedComment(props.comment); // Reset to the original comment
  };

  const submitUpdateHandler = (event) => {
    event.preventDefault();
    const updatedComment = editedComment; // Use the edited comment
    // Update comment logic here
    props.onUpdate(updatedComment, props.id); // Pass the updated comment to parent component
    setIsEditing(false);
  };

  return (
    <li>
      <h4>{props.memberNickname}</h4>
      {isEditing ? (
        <form onSubmit={submitUpdateHandler}>
          <textarea
            style={{ width: "100%" }}
            rows="3"
            cols="50"
            value={editedComment}
            onChange={(event) => setEditedComment(event.target.value)}
            ref={deleteIdRef}
          />
          <button type="submit">저장</button>
          <button type="button" onClick={cancelEditingHandler}>
            취소
          </button>
        </form>
      ) : (
        <>
          <p>{props.comment}</p>
          <p>{props.createdAt}</p>
          {props.isWrite && (
            <>
              <button type="submit" onClick={submitDeleteHandler}>
                삭제
              </button>
              <button type="button" onClick={startEditingHandler}>
                수정
              </button>
            </>
          )}
        </>
      )}
    </li>
  );
}; // GalleryComment
export default GalleryComment;
