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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ClubList = (props) => {
  let navigate = useNavigate();
  const pageId = String(props.item);

  const authCtx = useContext(AuthContext);
  const clubCtx = useContext(ClubContxt);

  const [AList, setAList] = useState([]);
  const [maxNum, setMaxNum] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAddress, setSelectedAddress] = useState("All");

  let isLogin = authCtx.isLoggedIn;

  const fetchListHandler = useCallback(() => {
    if (isLogin) {
      // If logged in, use the method to get clubs for logged-in users
      clubCtx.getClubPageLoggedList(pageId);
    } else {
      // If not logged in, use the regular method to get clubs for all users
      clubCtx.getClubPageList(pageId);
    }
  }, [isLogin, pageId]);
  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);

  useEffect(() => {
    if (clubCtx.isSuccess) {
      // 클럽 목록을 필터링하여 설정
      const filteredClubs = clubCtx.page.filter((club) => {
        // 카테고리 및 주소가 "All"이거나 일치하는 경우에만 포함
        const categoryMatch =
          selectedCategory === "All" || club.clubCategory === selectedCategory;
        const addressMatch =
          selectedAddress === "All" || club.clubAddress === selectedAddress;
        return categoryMatch && addressMatch;
      });

      setAList(filteredClubs);
      setMaxNum(clubCtx.totalPages);
    }
  }, [clubCtx, selectedCategory, selectedAddress]);

  return (
    <Fragment>
      <Container fluid>
        <Row className="mt-5">
          <Col xs={2}>
            <SideNavigation
              selectedCategory={selectedCategory}
              selectedAddress={selectedAddress}
              onCategoryChange={(category) => setSelectedCategory(category)}
              onAddressChange={(address) => setSelectedAddress(address)}
            />
          </Col>
          <Col xs={10}>
            <Row className="card-container">
              {AList.map((item) => (
                <Col xs={3} key={item.clubId}>
                  <BootstrapCard className="club-card">
                    <BootstrapCard.Img
                      variant="top"
                      src={`http://localhost:80/club/img/${item.clubFilename}`}
                      style={{ width: "250px", height: "250px" }}
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
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                          color:
                            item.clubjoin && item.clubjoin.joined
                              ? "#ff0000"
                              : "#000000",
                          cursor: "pointer",
                        }}
                        /* onClick={() => changeClubjoin(item.clubId)} */
                      />
                      {item.clubjoin && (
                        <span>
                          &nbsp;&nbsp;&nbsp;
                          {item.clubjoin.joinedNum}&nbsp;&nbsp;&nbsp;
                        </span>
                      )}
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
