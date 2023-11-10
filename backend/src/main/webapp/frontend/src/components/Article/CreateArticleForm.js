import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ArticleContext from "../../Store/Article-context";
import AuthContext from "../../Store/Auth-context";

const CreateArticleForm = (props) => {
  let navigate = useNavigate();

  const clubId = null;

  //const clubId = String(props.item)
  const [selectedFiles, setSelectedFiles] = useState(null);
  const selectedFilesRef = useRef(null);
  const [updateArticle, setUpdateArticle] = useState({
    title: "",
    content: "",
    clubId: "",
    attachment: [],
  });

  const articleCtx = useContext(ArticleContext);
  const authCtx = useContext(AuthContext);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  const fileInputChangeHandler = (event) => {
    setSelectedFiles(event.target.files);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let postArticle = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      clubId: props.clubId,
    };

    if (props.item) {
      postArticle = { ...postArticle, id: props.item };
    }
    let files = fileInputRef.current.files;

    props.item
      ? articleCtx.updateArticleWithFiles(postArticle, authCtx.token, files)
      : articleCtx.createArticleWithFiles(postArticle, authCtx.token, files);
  };

  const setUpdateArticleHandler = useCallback(() => {
    if (articleCtx.isGetUpdateSuccess) {
      setUpdateArticle({
        title: articleCtx.article.articleTitle,
        content: articleCtx.article.articleContent,
        attachment: articleCtx.article.attachment,
        clubId: props.clubId,
      });
    }
  }, [articleCtx.isGetUpdateSuccess]);

  useEffect(() => {
    if (props.item) {
      articleCtx.getUpdateArticleWithFiles(authCtx.token, props.item);
    }
  }, [props.item]);

  useEffect(() => {
    console.log("update effect");
    setUpdateArticleHandler();
  }, [setUpdateArticleHandler]);

  useEffect(() => {
    if (articleCtx.isSuccess) {
      console.log("wrting success");
      navigate(`/club/${props.clubId}/article/page/1`, { replace: true });
    }
  }, [articleCtx.isSuccess]);

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            required
            ref={titleRef}
            defaultValue={updateArticle.title}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>본문</Form.Label>
          <Form.Control
            as="textarea"
            rows={20}
            required
            ref={contentRef}
            defaultValue={updateArticle.content}
          />
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>첨부파일</Form.Label>
          <Form.Control
            type="file"
            ref={fileInputRef}
            multiple
            defaultValue={updateArticle.attachment}
            onChange={fileInputChangeHandler}
          />
        </Form.Group>
        {updateArticle.attachment &&
          updateArticle.attachment.map((image, index) => (
            <div key={index}>
              <img
                src={`http://localhost:80/club/one/${clubId}/article/img/${image.storeFilename}`}
                alt={`Attachment ${index}`}
                style={{ maxWidth: "100%" }}
              />
            </div>
          ))}

        <Button variant="primary">취소</Button>
        <Button variant="primary" type="submit">
          작성
        </Button>
      </Form>
    </div>
  );
};

export default CreateArticleForm;
