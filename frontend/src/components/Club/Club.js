import React from "react";
import { useNavigate } from "react-router-dom";

const Club = (props) => {
  let navigate = useNavigate();
  console.log(props);
  const id = props.item.clubId.toString();
  console.log(id);

  const backHandler = event => {
    event.preventDefault();
    navigate("/page/1");
}

  const updateClubHandler = (event) => {
    event.preventDefault();
    navigate(`../update/${id}`);
  };

  const deleteClubHandler = (event) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      props.onDelete(id);
    }
  };

  return (
    <div>
      <header>
        <h4>{props.item.clubName}</h4>
        <div>
          <span>주소: {props.item.clubAddress}</span>
          <br />
          <span>카테고리: {props.item.clubCategory}</span>
          <br />
          <span>생성일: {props.item.createdAt}</span>
        </div>
      </header>
      <button onClick={backHandler}>뒤로</button>
      {props.item.isJoined && (
        <div>
          <button onClick={updateClubHandler}>수정</button>
          <br />
          <button onClick={deleteClubHandler}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default Club;
