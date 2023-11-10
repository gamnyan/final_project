import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ClubItemNavigation from "../Layout/ClubItemNavigation";
const Article = (props) => {
  let navigate = useNavigate();

  let id;

  useEffect(() => {
    try {
      if (props.item.articleId) {
        id = props.item.articleId.toString();
      } else {
        alert("클럽에 가입해 주세요.2");
        navigate(`/club/clubpage/1`);
      }
    } catch (error) {
      alert("클럽에 가입해 주세요.3");
      navigate(`/club/clubpage/1`);
    }
  }, [props.item.articleId]);

  const backHandler = (event) => {
    event.preventDefault();
    navigate(`/club/${props.item.clubId}/article/page/1`);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    navigate(`/club/updatearticle/${props.item.clubId}/${id}`);
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      props.onDelete(id);
    }
  };

  return (
    <div>
      <ClubItemNavigation clubId={props.item.clubId} />
      <header>
        <h4>{props.item.articleTitle}</h4>
        <div>
          <span>이름: {props.item.memberNickname}</span>
          <br />
          <span>날짜: {props.item.updatedAt}</span>
        </div>
      </header>
      <div>
        <div>{props.item.articleContent}</div>
      </div>
      {props.item.attachment &&
        props.item.attachment.map((image, index) => {
          // storeFilename의 길이가 3글자 이상인 경우에만 이미지를 표시합니다.
          if (image.storeFilename.length >= 4) {
            return (
              <div key={index}>
                <img
                  src={`http://localhost:80/club/one/${props.item.clubId}/article/img/${image.storeFilename}`}
                  alt={`Attachment ${index}`}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            );
          } else {
            return null; // 조건에 맞지 않는 경우 이미지를 표시하지 않습니다.
          }
        })}
      <button onClick={backHandler}>뒤로</button>
      {props.item.written && (
        <div>
          <button onClick={updateHandler}>수정</button>
          <br />
          <button onClick={deleteHandler}>삭제</button>
        </div>
      )}
    </div>
  );
};
export default Article;
