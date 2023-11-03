import { useNavigate } from "react-router-dom";

const Club = props => {
    let navigate = useNavigate();
    console.log(props.item);
    console.log(props.item.clubId);

    const id = props.item.clubId.toString();

    const backHandler = event => {
        event.preventDefault();
        navigate("/page/1");
    }

    const updateHandler = event => {
        event.preventDefault();
        navigate("../update" + id);
    }

    const deleteHandler = event => {
        event.preventDefault();
        if(window.confirm("삭제하시겠습니까?")){
            props.onDelete(id);
        }
    }

    return(
        <div>
            <header>
                <h4>{props.item.clubName}</h4>
                <div>
                    <span>카테고리: {props.item.clubCategory}</span>
                    <br />
                    <span>클럽개설일: {props.item.createdAt}</span>
                </div>
            </header>
            <div>
                <div>{props.item.clubInfo}</div>
            </div> 
           {/*  {props.item.clubFilename &&
  props.item.clubFilename.map((image, index) => {
    // storeFilename의 길이가 3글자 이상인 경우에만 이미지를 표시합니다.
    if (image.clubFilename.length >= 4) {
      return (
        <div key={index}>
          <img
            src={`http://localhost:8085/club/img/${image.clubFilename}`}
            alt={`Attachment ${index}`}
            style={{ maxWidth: "100%" }}
          />
        </div>
      );
    } else {
      return null; // 조건에 맞지 않는 경우 이미지를 표시하지 않습니다.
    }
  })} */}
            <button onClick={backHandler}>뒤로</button>
            {props.item.written && (
                <div>
                    <button onClick={updateHandler}>수정</button>
                    <br />
                    <button onClick={deleteHandler}>삭제</button>
                </div>
            )}
        </div>
    )
}
export default Club