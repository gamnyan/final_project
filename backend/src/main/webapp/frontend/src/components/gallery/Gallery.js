import { useNavigate } from "react-router-dom";

const Gallery = (props) => {
  let navigate = useNavigate();

  const id = props.item.galleryId.toString();

  const backHandler = (event) => {
    event.preventDefault();
    navigate(`/${props.item.clubId}/gallery/page/1`);
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
          <span>{props.item.galleryContent}</span>
          <span>{props.item.createdAt}</span>
        </div>
      </header>
      {props.item.attachment &&
        props.item.attachmemt.map((image, index) => {
          if (image.storeFileName.length >= 4) {
            return (
              <div key={index}>
                <img
                  src={`http://localhost:80/club/one/${props.item.clubId}/gallery/img/${image.storeFileName}`}
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
      {props.item.write && (
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
