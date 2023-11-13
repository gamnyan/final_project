import BootstrapCard from "react-bootstrap/Card";
import { Button, Col, Container, Row } from "react-bootstrap";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthContext from "../../Store/Auth-context";
import { Link, useNavigate } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import ClubContxt from "../../Store/Club-context";
import ClubPaing from "./ClubPaging";
import SideNavigation from "../Layout/SideNavigation";
import ClubJoin from "./Join";

const ClubList = (props) => {
  let navigate = useNavigate();
  const pageId = String(props.item);

  const authCtx = useContext(AuthContext);
  const clubCtx = useContext(ClubContxt);

  const [AList, setAList] = useState([]);
  const [maxNum, setMaxNum] = useState(1);

  let isLogin = authCtx.isLoggedIn;

  const fetchListHandler = useCallback(() => {
    clubCtx.getClubPageList(pageId);
  }, []);

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
    <Fragment>
      <Container fluid>
        <Row className="mt-5">
          <Col xs={2}>
            <SideNavigation />
          </Col>
          <Col xs={10}>
            <Row className="card-container">
              {AList.map((item) => (
                <Col xs={3} key={item.clubId}>
                  <BootstrapCard className="club-card">
                    <BootstrapCard.Img
                      variant="top"
                      src={`http://localhost:80/club/img/${item.clubFilename}`}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <BootstrapCard.Body>
                      <p style={{ fontSize: "0.8rem", color: "#6c757d" }}>
                        {item.clubCategory}
                      </p>{" "}
                      {/* 추가: 작은 글자로 카테고리 표시 */}
                      <h5>{item.clubName}</h5>
                      <BootstrapCard.Text>
                        {item.clubAddress}
                      </BootstrapCard.Text>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/club/${item.clubId}`)}
                      >
                        자세히 보기
                      </Button>
                    </BootstrapCard.Body>
                  </BootstrapCard>
                </Col>
              ))}
            </Row>
            <div className="my-3">
              {isLogin && (
                <Link to="/club/createclub">
                  <Button variant="success">클럽 만들기</Button>
                </Link>
              )}
            </div>
            <ClubPaing currentPage={Number(pageId)} maxPage={maxNum} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ClubList;
