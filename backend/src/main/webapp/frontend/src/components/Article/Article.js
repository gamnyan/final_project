import { useNavigate } from "react-router-dom";

const Article = props => {
   let navigate = useNavigate();

   const id = props.item.articleId.toString();

   const backHandler = event => {
      event.preventDefault();
      navigate(`/page/${props.item.clubId}/1`);
   };

   const updateHandler = event => {
      event.preventDefault();
      navigate(`../updatearticle/${props.item.clubId}/${id}`);
   };

   const deleteHandler = event => {
      event.preventDefault();
      if (window.confirm("삭제하시겠습니까?")) {
         props.onDelete(id);
      }
   };

    return(
        <div>
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
    )
}
export default Article