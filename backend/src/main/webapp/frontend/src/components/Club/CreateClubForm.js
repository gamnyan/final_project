import React,{ useCallback, useContext, useEffect,useRef,useState} from "react";
import { Button, Form} from "react-bootstrap";
import { useNavigate} from "react-router-dom";

import ClubContext from "../../Store/Club-context";
import AuthContext from "../../Store/Auth-context";

const CreateClubForm = props => {
    let navigate = useNavigate();

    const [selectedFile,setSelectedFile] = useState(null);
    const selectedFileRef = useRef(null);
    const [updateClub,setUpdateClub] = useState({
        name:"",
        clubinfo:"",
        Filename:"",
        category:"",
        address:""
    })

    const clubCtx = useContext(ClubContext);
    const authCtx = useContext(AuthContext);
    
    const nameRef = useRef(null);
    const clubInfoRef = useRef(null);
    const fileInputRef = useRef(null);
    const categoryRef = useRef(null);
    const addressRef = useRef(null);

    const fileInputChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]); // 수정된 부분
    };
    

    const submitHandler = (event) => {
        event.preventDefault();
    
        let postClub = {
            name: nameRef.current.value,
            clubinfo: clubInfoRef.current.value,
            Filename: fileInputRef.current.value,
            category: categoryRef.current.value,
            address: addressRef.current.value
        };
    
        if (props.item) {
          console.log("update!");
          postClub = { ...postClub, id: props.item };
        }
        let file = selectedFile;


        /* if(props.itme){
            const newFiles = selectedFilesRef.current.files;
            console.log(newFiles);
            if(newFiles.length > 0){
                files = newFiles;
            }
        } */
    
        props.item
          ? clubCtx.updateClubWithImg(postClub,authCtx.token, file)
          : clubCtx.createClubWithImg(postClub,authCtx.token, file)
    };

    const setChangeClubHandler = useCallback(()=>{
        if(clubCtx.isGetUpdateSuccess){
            setUpdateClub({
                name:clubCtx.club.clubName,
                clubinfo: clubCtx.club.clubinfo,
                Filename: clubCtx.club.clubFilename,
                category:clubCtx.club.clubCategory,
                address:clubCtx.club.clubAddress
            
            })
        }
    },[clubCtx.isGetUpdateSuccess])

    useEffect(() => {
        if (props.item) {
            clubCtx.getUpdateClubWithImg(authCtx.token, props.item) // 업데이트 시 사진도 가져오도록 수정
        }
    }, [props.item])

    useEffect(()=>{
        console.log("update effect");
        setChangeClubHandler()
    },[setChangeClubHandler])

    useEffect(()=>{
        if(clubCtx.isSuccess){
            console.log("wrting success")
            navigate("/clubpage/1",{replace:true})
        }
    },[clubCtx.isSuccess]);

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>NAME</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="제목을 입력하세요"
                        required
                        ref={nameRef}
                        defaultValue={updateClub.name}
                        />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>CATEGORY</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="제목을 입력하세요"
                        required
                        ref={categoryRef}
                        defaultValue={updateClub.category}
                        />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>INFOMATION</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={20}
                        required
                        ref={clubInfoRef}
                        defaultValue={updateClub.clubinfo}
                        />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>ADDRESS</Form.Label>
                    <Form.Control
                        type="text"
                        rows={20}
                        required
                        ref={addressRef}
                        defaultValue={updateClub.address}
                        />
                </Form.Group>
                    <br />
              
                <Form.Group>
                    <Form.Label>IMG</Form.Label>
                    <Form.Control
                        type="file"
                        ref={fileInputRef} // 추가된 부분
                        multiple // 여러 파일을 선택할 수 있도록 설정
                        defaultValue={updateClub.Filename}
                        onChange={fileInputChangeHandler}
                        />
                </Form.Group>
                <br />
                {updateClub.Filename && (
                    <div>
                    <img
                        src={`http://localhost:8085/club/img/${updateClub.Filename}`}
                        alt={`Attachment`}
                        style={{ maxWidth: "100%" }}
                    />
                </div>
                )}

                <Button varient ="primary">취소</Button>
                <Button varient ="primary" type="submit" >작성</Button>
            </Form>
        </div>
    )
    

}

export default CreateClubForm