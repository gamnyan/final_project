import { Fragment } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClubItemNavigation from "../Layout/ClubItemNavigation";
import "../../css/club.css"; // 스타일을 위한 CSS 파일을 import

const Club = (props) => {
  let navigate = useNavigate();

  const id = props.item.clubId.toString();

  const backHandler = (event) => {
    event.preventDefault();
    navigate("/club/clubpage/1");
  };

  const updateHandler = (event) => {
    event.preventDefault();
    navigate("/club/updateclub/" + id);
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      props.onDelete(id);
    }
  };
  const movetoArticle = (event) => {
    event.preventDefault();
    navigate(`/club/${props.item.clubId}/article/page/1`);
  };

  return (
    <Fragment>
      <Col xs={12} className="club-container"> {/* 새로운 클래스 추가 */}
        <ClubItemNavigation clubId={props.item.clubId} />
        <header className="club-header"> {/* 새로운 클래스 추가 */}
          {props.item.clubFilename && (
            <div>
              <img
                src={`http://localhost:80/club/img/${props.item.clubFilename}`}
                alt={`Attachment`}
                className="club-image"
              />
            </div>
          )}
          <h4>이름: {props.item.clubName}</h4>
          <div>
            <span>카테고리: {props.item.clubCategory}</span>
            <br />
            <span>클럽개설일: {props.item.createdAt}</span>
            <br />
            <span>지역: {props.item.clubAddress}</span>
          </div>
        </header>
        <div className="club-info"> {/* 새로운 클래스 추가 */}
          <div>{props.item.clubinfo}</div>
        </div>
        <div className="club-buttons"> {/* 새로운 클래스 추가 */}
          <button onClick={backHandler}>뒤로</button>
          <br />
          <button onClick={movetoArticle}>게시판</button>
          {props.item.written && (
            <div>
              <button onClick={updateHandler}>수정</button>
              <br />
              <button onClick={deleteHandler}>삭제</button>
            </div>
          )}
        </div>
      </Col>
    </Fragment>
  );
};

export default Club;
