import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ListItem, Typography, TextField, Divider } from "@mui/material";

const Comment = (props) => {
  const deleteIdRef = useRef(null);
  const navigate = useNavigate();

  const submitDeleteHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    props.onDelete(deleteId);
  };

  const submitUpdateHandler = (event) => {
    event.preventDefault();
    const deleteId = deleteIdRef.current.value;
    navigate(`/club/updatecomment/${props.articleId}/${deleteId}`);
  };

  return (
    <ListItem>
      <Typography variant="h6">{props.memberNickname}</Typography>
      <Typography variant="body1">{props.commentText}</Typography>
      <Typography variant="body2">{props.createdAt}</Typography>
      <form onSubmit={submitDeleteHandler}>
        <input
          type="hidden"
          name="commentId"
          value={props.commentId}
          ref={deleteIdRef}
        />
        {props.written && (
          <>
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ mr: 1 }}
            >
              삭제
            </Button>
            <Button
              type="button"
              onClick={submitUpdateHandler}
              variant="contained"
            >
              수정
            </Button>
          </>
        )}
      </form>
    </ListItem>
  );
};

export default Comment;
