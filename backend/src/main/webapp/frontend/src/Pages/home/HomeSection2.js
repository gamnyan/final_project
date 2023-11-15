import BootStrapTable from "react-bootstrap-table-next";
import { Button, Card } from "react-bootstrap";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../Store/Auth-context";
import { Link, useNavigate } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import ArticleContext from "../../Store/Article-context";
import Paging from "../../components/Article/Paging";

import JoinContext from "../../Store/Join-context";
import ClubItemNavigation from "../../components/Layout/ClubItemNavigation";
const HomeSection2 = (props) => {
  let navigate = useNavigate();
  const pageId = String(props.item);
  const clubId = props.clubId;

  const columns = [
    {
      dataField: "articleId",
      text: "#",
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "clubId",
      text: "clubId",
      hidden: true,
    },
    {
      dataField: "clubName",
      text: "클럽",
      hidden: true,
      formatter: (cell, row) => <strong>{cell}</strong>,
    },
    {
      dataField: "articleTitle",
      text: "제목",
      headerStyle: () => {
        return { width: "50%" };
      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          const articleIdNum = row.articleId;
          navigate(`/club/${clubId}/article/${articleIdNum}`);
        },
      },
    },
    {
      dataField: "memberNickname",
      text: "닉네임",
    },
    {
      dataField: "createdAt",
      text: "작성일",
    },
  ];

  const authCtx = useContext(AuthContext);
  const articleCtx = useContext(ArticleContext);

  const [AList, setAList] = useState([]);
  const [maxNum, setMaxNum] = useState(1);

  let isLogin = authCtx.isLoggedIn;

  const fetchListHandler = useCallback(() => {
    articleCtx.getPageList(clubId, pageId);
  }, []);

  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);

  useEffect(() => {
    if (articleCtx.isSuccess) {
      setAList(articleCtx.page.slice(0, 10).reverse());
      setMaxNum(articleCtx.totalPages);
    }
  }, [articleCtx]);

  return (
    <div>
      {/* Display clubName from the first item in AList */}
      {AList.length > 0 && (
        <Card className="my-4">
          <Card.Body>
            <Card.Title className="text-center">{AList[0].clubName}</Card.Title>
          </Card.Body>
        </Card>
      )}

      {/* Display the table */}
      <BootStrapTable keyField="id" data={AList} columns={columns} />

      {/* <div className="text-center mt-3">
        {isLogin && (
          <Link to={`/club/createarticle/${clubId}`} state={{ clubId: clubId }}>
            <Button>글 작성</Button>
          </Link>
        )}
      </div> */}
      {/* <Paging currentPage={Number(pageId)} maxPage={maxNum} clubId={clubId} /> */}
    </div>
  );
};

export default HomeSection2;
