import React,{ useCallback, useContext, useEffect,useRef,useState} from "react";
import { Button, Form} from "react-bootstrap";
import { useNavigate} from "react-router-dom"
import ArticleContext from "../../Store/Article-context";
import AuthContext from "../../Store/Auth-context";

const CreateArticleForm = props => {
    let navigate = useNavigate()

    const [selectedFiles, setSelectedFiles] = useState(null);
    const selectedFilesRef = useRef(null);
    const [updateArticle,setUpdateArticle] = useState({
        title: "",
        content: "",
        attachment:[]
    })

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
        };
    
        if (props.item) {
          console.log("update!");
          postArticle = { ...postArticle, id: props.item };
        }
        let files = fileInputRef.current.files;

        /* if(props.itme){
            const newFiles = selectedFilesRef.current.files;
            console.log(newFiles);
            if(newFiles.length > 0){
                files = newFiles;
            }
        } */
    
        props.item
          ? articleCtx.updateArticleWithFiles(postArticle,authCtx.token, files)
          : articleCtx.createArticleWithFiles(postArticle, authCtx.token, files);
      };
    

    const setUpdateArticleHandler = useCallback(()=>{
        if(articleCtx.isGetUpdateSuccess){
            setUpdateArticle({
                title:articleCtx.article.articleTitle,
                content: articleCtx.article.articleContent,
                attachment: articleCtx.article.attachment
            
            })
        }console.log(setUpdateArticle.attachment);
        console.log(setUpdateArticle.articleTitle);
        console.log(setUpdateArticle.articleContent);
    },[articleCtx.isGetUpdateSuccess])

    /* useEffect(()=>{
        if(props.item){
            articleCtx.getUpdateArticle(authCtx.token,props.item)
        }
    },[props.item]) */
    useEffect(() => {
        if (props.item) {
            articleCtx.getUpdateArticleWithFiles(authCtx.token, props.item) // 업데이트 시 사진도 가져오도록 수정
        }
    }, [props.item])

    useEffect(()=>{
        console.log("update effect");
        setUpdateArticleHandler()
    },[setUpdateArticleHandler])

    useEffect(()=>{
        if(articleCtx.isSuccess){
            console.log("wrting success")
            navigate("/page/1",{replace:true})
        }
    },[articleCtx.isSuccess]);

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
                        ref={fileInputRef} // 추가된 부분
                        multiple // 여러 파일을 선택할 수 있도록 설정
                        defaultValue={updateArticle.attachment}
                        onChange={fileInputChangeHandler}
                        />
                </Form.Group>
                {updateArticle.attachment && updateArticle.attachment.map((image, index) => (
                    <div key={index}>
                        <img 
                         src={`http://localhost:80/article/img/${image.storeFilename}`}
                         alt={`Attachment ${index}`}
                         style={{ maxWidth: "100%" }}
                        />
                     </div>
                ))}

                <Button varient ="primary">취소</Button>
                <Button varient ="primary" type="submit" >작성</Button>
            </Form>
        </div>
    )
}

export default CreateArticleForm 