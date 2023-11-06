import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { useCallback,useContext,useEffect,useState } from "react";
import AuthContext from "../../Store/Auth-context";
import {Link,useNavigate } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import ClubContxt from "../../Store/Club-context";
import ClubPaing from "./ClubPaging";

const ClubList = props => {
    let navigate = useNavigate()
    const pageId = String(props.item);

    const columns =[
        {
            dataField: "clubId",
            text:"#",
            headerStyle:()=>{
                return {width: "8%"}
            }
        },
        {
            dataField: "clubName",
            text:"이름",
            headerStyle:()=>{
                return {width:"65%"}
            },
            events:{
                onClick:(e,column,columnIndex,row,rowIndex)=>{
                    const clubIdNum = row.clubId
                    navigate(`../club/${clubIdNum}`)
                }
            }
        },
        {
            dataField:"clubAddress",
            text:"지역"
        },
        {
            dataField:"createdAt",
            text:"생성일"
        },{
            dataField:"clubCategory",
            text:"category"
        }
    ]

    const authCtx = useContext(AuthContext);
    const clubCtx = useContext(ClubContxt);

    const [AList,setAList] = useState([])
    const [maxNum,setMaxNum] = useState(1)

    let isLogin = authCtx.isLoggedIn;

    const fetchListHandler = useCallback(()=>{
        clubCtx.getClubPageList(pageId)

    },[])

    useEffect(() => {
        fetchListHandler();
    }, [fetchListHandler]);
    

    useEffect(()=>{
        if(clubCtx.isSuccess){
            setAList(clubCtx.page)
            console.log(AList)
            setMaxNum(clubCtx.totalPages)
        }
    },[clubCtx])

    return(
        <div>
        <BootstrapTable keyField="id" data={AList} columns={columns} />
        <div>
          {isLogin && (
            <Link to="/createclub">
              <Button>클럽 만들기</Button>
            </Link>
          )}
        </div>
        <ClubPaing currentPage={Number(pageId)} maxPage={maxNum} />
      </div>
    )

}
export default ClubList