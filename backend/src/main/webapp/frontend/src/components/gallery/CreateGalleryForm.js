import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GalleryContext from "../../Store/Gallery-context";
import AuthContext from "../../Store/Auth-context";

const CreateGalleryForm = (props) => {
  let navigate = useNavigate();
  const clubId = null;

  const [selectedFiles, setSelectedFiles] = useState(null);
  const selectFilesRef = useRef(null);
  const [updateGallery, setUpdateGallery] = useState({
    content: "",
    clubId: "",
    attachment: [],
  });

  const galleryCtx = useContext(GalleryContext);
  const authCtx = useContext(AuthContext);

  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  // fileInputChangeHandler
  const fileInputChangeHandler = (event) => {
    setSelectedFiles(event.target.files);
  }; // fn end fileInputChangeHandler

  // submitHandler
  const submitHandler = (event) => {
    event.preventDefault();

    let postGallery = {
      content: contentRef.current.value,
      clubId: props.clubId,
    };

    if (props.item) {
      postGallery = { ...postGallery, id: props.item };
    }

    let files = fileInputRef.current.files;
    props.item
      ? galleryCtx.updateGalleryWithFiles(postGallery, authCtx.token, files)
      : galleryCtx.createGalleryWithFiles(postGallery, authCtx.token, files);
  }; // fn end submitHandler

  const setUpdateGalleryHandler = useCallback(() => {
    if (galleryCtx.isGetUpdateSuccess) {
      setUpdateGallery({
        content: galleryCtx.gallery.content,
        attachment: galleryCtx.gallery.attachment,
        clubId: props.clubid,
      });
    }
  }, [galleryCtx.isGetUpdateSuccess]);

  useEffect(() => {
    if (props.item) {
      galleryCtx.getUpdateGalleryWithFiles(authCtx.token, props.item);
    }
  }, [props.item]);

  useEffect(() => {
    console.log("update effect");
    setUpdateGalleryHandler();
  }, [setUpdateGalleryHandler]);

  useEffect(() => {
    if (galleryCtx.isSuccess) {
      console.log("wring success");
      navigate(`/club/${props.clubId}/gallery/page/1`, { replace: true });
    }
  }, [galleryCtx.isSuccess]);

  return (
    <Fragment>
      <div>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>내용</Form.Label>
            <Form.Control
              type="text"
              placeholder="내용을 입력해주세요."
              required
              ref={contentRef}
              defaultValue={updateGallery.content}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>첨부파일</Form.Label>
            <Form.Control
              type="file"
              ref={fileInputRef}
              multiple
              defaultValue={updateGallery.attachment}
              onChange={fileInputChangeHandler}
            />
          </Form.Group>
          {updateGallery.attachment &&
            updateGallery.attachment.map((image, index) => {
              <div key={index}>
                <img
                  src={`http://localhost:80/club/one/${clubId}/gallery/img/${image.storeFilename}`}
                  alt={`Attachment ${index}`}
                  style={{ maxWidth: "100%" }}
                />
              </div>;
            })}
          <Button variant="primary">취소</Button>
          <Button variant="primary" type="submit">
            작성
          </Button>
        </Form>
      </div>
    </Fragment>
  );
}; // CreateGalleryForm

export default CreateGalleryForm;
