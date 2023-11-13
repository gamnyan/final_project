import { Form, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import ClubItemNavigation from "../Layout/ClubItemNavigation";
import { Button, Carousel, Modal } from "react-bootstrap";

import "../../css/gallery.css";
import { GalleryRecommendContextProvider } from "../../Store/GalleryRecommend-context";
import GalleryRecommend from "./GalleryRecommend";
import GalleryComment from "./GalleryCommentList";
import { GalleryCommentContextProvider } from "../../Store/GalleryComment-context";

const Gallery = (props) => {
  let navigate = useNavigate();

  let id;
  console.log(props);

  useEffect(() => {
    try {
      console.log(props.item.id);
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
    <div id="galleryItem-area" style={{ display: "none" }}>
      <div className="galleryItem">
        {/* <header>
          <div>
            <span>{props.item.content}</span>
            <span>{props.item.updatedAt}</span>
          </div>
        </header>
        {props.item.attachment &&
          Array.isArray(props.item.attachment) &&
          props.item.attachment.length > 0 &&
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
        )} */}
        <Modal show={true}>
          <Modal.Header closeButton onClick={props.onCloseModal}>
            <Modal.Title>
              {props.item.nickName}
              <p style={{ fontSize: "14px", fontWeight: "100" }}>
                {props.item.createdAt}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {props.item.attachment &&
                props.item.attachment.map((image, i) => {
                  let imgSrc = "";
                  if (image.length !== 0) {
                    imgSrc = `http://localhost:80/club/one/${props.item.clubId}/gallery/img/${image.storeFilename}`;
                  } else {
                    imgSrc = "";
                  }
                  return (
                    <Carousel.Item key={i}>
                      <img
                        className="d-block w-100"
                        src={imgSrc}
                        alt={`Attachment`}
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </Modal.Body>
          <Modal.Footer style={{ display: "block" }}>
            {props.item.isWrite && (
              <div>
                <button onClick={updateHandler}>수정</button>
                <br />
                <button onClick={deleteHandler}>삭제</button>
              </div>
            )}
            <GalleryRecommendContextProvider>
              <GalleryRecommend
                item={props.item.id}
                clubId={props.item.clubId}
              />
            </GalleryRecommendContextProvider>
            <GalleryCommentContextProvider>
              <GalleryComment item={props.item.id} clubId={props.item.clubId} />
            </GalleryCommentContextProvider>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}; // Gallery

export default Gallery;
