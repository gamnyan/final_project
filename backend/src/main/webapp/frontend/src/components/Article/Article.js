import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClubItemNavigation from "../Layout/ClubItemNavigation";
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const Article = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!props.item.articleId) {
        alert("클럽에 가입해 주세요.2");
        navigate(`/club/clubpage/1`);
      }
    } catch (error) {
      alert("클럽에 가입해 주세요.3");
      navigate(`/club/clubpage/1`);
    }
  }, [props.item.articleId, navigate]);

  const backHandler = (event) => {
    event.preventDefault();
    navigate(`/club/${props.item.clubId}/article/page/1`);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    navigate(`/club/updatearticle/${props.item.clubId}/${props.item.articleId}`);
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      props.onDelete(props.item.articleId);
    }
  };

  return (
    <div>
      <ClubItemNavigation clubId={props.item.clubId} />
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {props.item.articleTitle}
          </Typography>
          <div>
            <Typography variant="body2">
              이름: {props.item.memberNickname} <br />
              날짜: {props.item.updatedAt}
            </Typography>
          </div>
          <div>
            <div>{props.item.articleContent}</div>
          </div>
          {props.item.attachment &&
            props.item.attachment.map((image, index) => {
              if (image.storeFilename.length >= 4) {
                return (
                  <div key={index}>
                    <img
                      src={`http://localhost:80/club/one/${props.item.clubId}/article/img/${image.storeFilename}`}
                      alt={`Attachment ${index}`}
                      style={{ width: "100%", height: "auto" }}  // 이미지 크기를 일정하게 조정

                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
          <Button onClick={backHandler} color="primary">
            뒤로
          </Button>
          {props.item.written && (
            <div>
              <Button onClick={updateHandler} color="warning">
                수정
              </Button>
              <br />
              <Button onClick={deleteHandler} color="error">
                삭제
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Article;
