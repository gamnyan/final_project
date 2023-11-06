import { useNavigate } from "react-router-dom";

const Club = props => {
   let navigate = useNavigate();

   const id = props.item.clubId.toString();

   const backHandler = event => {
      event.preventDefault();
      navigate("/page/1");
   };

   const updateHandler = event => {
      event.preventDefault();
      navigate("../update" + id);
   };

   const deleteHandler = event => {
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
               <span>카테고리: {props.item.clubCategory}</span>
               <br />
               <span>클럽개설일: {props.item.createdAt}</span>
            </div>
         </header>
         <div>
            <div>{props.item.clubInfo}</div>
         </div>
         {props.item.clubFilename && (
            <div>
               <img
                  src={`http://localhost:80/club/img/${props.item.clubFilename}`}
                  alt={`Attachment`}
                  style={{ maxWidth: "100%" }}
               />
            </div>
         )}
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
export default Club;
