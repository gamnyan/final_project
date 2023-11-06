import React, { useCallback, useContext, useEffect, useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AuthContext from "../../Store/Auth-context";

import ClubContext from "../../Store/Club-context";
import ClubPaging from "./ClubPaging"; 

const ClubList = props => {
    let navigate = useNavigate();
    const pageId = String(props.item);

    const columns = [
        {
            dataField: "clubId",
            text: "#",
            headerStyle: () => {
                return { width: "8%" }
            }
        },
        {
            dataField: "clubName",
            text: "클럽 이름",
            headerStyle: () => {
                return { width: "65%" }
            },
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    const clubIdNum = row.clubId;
                    navigate(`../club/${clubIdNum}`);
                }
            }
        },
        {
            dataField: "clubAddress",
            text: "주소"
        },
        {
            dataField: "createdAt",
            text: "생성일"
        }
    ]

    const clubCtx = useContext(ClubContext);
    const authCtx = useContext(AuthContext)


    const [AList, setAList] = useState([])
    const [maxNum, setMaxNum] = useState(1);

    let isLogin = authCtx.isLoggedIn


    const fetchListHandler = useCallback(()=> {
        clubCtx.getPageList(pageId);
    },[]) 

    useEffect(() => {
        fetchListHandler();
    }, [fetchListHandler]);

    useEffect(() => {
        if (clubCtx.isSuccess) {
            setAList(clubCtx.page);
            setMaxNum(clubCtx.totalPages);
        }
    }, [clubCtx]);

    return (
        <div>
            <BootStrapTable keyField="id" data={AList} columns={columns} />
            <div>
            {isLogin && (
                <Link to="/create">
                    <Button>클럽 생성</Button>
                </Link>
                    )}
            </div>
            <ClubPaging currentPage={Number(pageId)} maxPage={maxNum} />
        </div>
    )
}

export default ClubList;
