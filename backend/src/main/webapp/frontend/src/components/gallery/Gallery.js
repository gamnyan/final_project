import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Gallery = (props) => {
  let navigate = useNavigate();

  let id;


  useEffect(() => {
    try {
      if (props.item.id) {
        id = props.item.id.toString();
      } else {
        alert("클럽에 가입해 주세요.2");
        navigate(`/club/clubpage/1`);
      }
    } catch (error) {
      alert("클럽에 가입해 주세요.3");
      navigate(`/club/clubpage/1`);
    }
  }, [props.item.id]);

  const backHandler = (event) => {
    event.preventDefault();
    navigate(`/club/${props.item.clubId}/gallery/page/1`);
  }; // backHandler

  const updateHandler = (event) => {
    event.preventDefault();
    navigate(`/club/updateGallery/${props.item.clubId}/${id}`);
  }; // updaateHandler

  const deleteHandler = (event) => {
    event.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      props.onDelete(id);
    } // if end
  }; // deleteHandler

  return (
    <div>
      <header>
        <div>
          <span>{props.item.content}</span>
          <span>{props.item.updatedAt}</span>
        </div>
      </header>
      {props.item.attachment && Array.isArray(props.item.attachment) && props.item.attachment.length > 0 &&
        props.item.attachment.map((image, index) => {
          if (image.storeFilename.length >= 4) {
            return (
              <div key={index}>
                <img
                  src={`http://localhost:80/club/one/${props.item.clubId}/gallery/img/${image.storeFilename}`}
                  alt={`Attachment ${index}`}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      <button onClick={backHandler}>뒤로</button>
      {props.item.isWrite && (
        <div>
          <button onClick={updateHandler}>수정</button>
          <br />
          <button onClick={deleteHandler}>삭제</button>
        </div>
      )}
    </div>
  );
}; // Gallery

export default Gallery;
