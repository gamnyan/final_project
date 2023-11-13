import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ListItem, Typography, TextField, Divider, Stack } from "@mui/material";  // Stack 추가

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
    <ListItem sx={{ paddingY: 2, borderBottom: "1px solid #e0e0e0" }}>  {/* 스타일 추가 */}
      <Typography variant="h6" marginBottom={1}>{props.memberNickname}</Typography>  {/* marginBottom 추가 */}
      <Typography variant="body1" sx={{ marginBottom: 1 }}>{props.commentText}</Typography>  {/* 스타일 추가 */}
      <Typography variant="body2">{props.createdAt}</Typography>
      <form onSubmit={submitDeleteHandler}>
        <Stack direction="row" spacing={1} alignItems="center">  {/* Stack으로 버튼 정렬 및 간격 추가 */}
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
                variant="contained"  // 버튼 스타일 변경
                color="error"
                sx={{ marginRight: 1 }}
              >
                삭제
              </Button>
              <Button
                type="button"
                variant="outlined"  // 버튼 스타일 변경
                onClick={submitUpdateHandler}
              >
                수정
              </Button>
            </>
          )}
        </Stack>
      </form>
    </ListItem>
  );
};

export default Comment;
