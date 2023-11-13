import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../Store/Auth-context";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClubContext from "../../Store/Club-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ClubPaging from "../../components/Club/ClubPaging";
import Slider from "react-slick";
import styled from "styled-components";



const VisualContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  .slick-dots {
    bottom: 25px;
  }
  .slick-dots li button:before {
    font-size: 15px;
  }
  .slick-prev {
    z-index: 1;
    left: 25px;
  }
  .slick-next {
    right: 25px;
  }
  .slick-prev:before,
  .slick-next:before {
    color: #fff;
    font-size: 1.5rem;
  }
  .slick-center {
    transition: transform 0.5s ease-in-out;
  }
  .slick-slide {
    opacity: 0.6;
    transition: opacity 0.5s ease-in-out;
  }
  .slick-current {
    opacity: 1;
  }
`;


const HomeSection1 = (props) => {
  let navigate = useNavigate();
  const { pageId } = useParams();
  const authCtx = useContext(AuthContext);
  const clubCtx = useContext(ClubContext);

  const [clubList, setClubList] = useState([]);
  const [maxNum, setMaxNum] = useState(1);

  let isLogin = authCtx.isLoggedIn;
  console.log(props.item)
  console.log(pageId+"sssss")
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
      setClubList(clubCtx.page);
      setMaxNum(clubCtx.totalPages);
    }
  }, [clubCtx]);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    afterChange: (index) => {
      // dots로 이동할 때 클럽 슬라이더의 인덱스가 변경됩니다.
      // 해당 인덱스를 state에 저장하여 렌더링에 반영합니다.
      setCurrentSlideIndex(index);
    },
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <Fragment>
      <Slider {...settings} slickGoTo={currentSlideIndex}>
        {authCtx.isLoggedIn &&
          clubList
            .filter((item) => item.clubjoin && item.clubjoin.joined)
            .slice(0, 5)
            .map((item, index) => (
              <div key={item.clubId} className={`slick-slide ${index === currentSlideIndex ? 'center-club' : 'other-club'}`}>
                <Card style={{ width: "18rem", opacity: index === currentSlideIndex ? 1 : 0.6 }}>
                  <Card.Img variant="top" src={`http://localhost:80/club/img/${item.clubFilename}`} />
                  <Card.Body>
                    <Card.Title>{item.clubName}</Card.Title>
                    <Card.Text>{item.clubAddress}</Card.Text>
                    <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", cursor: "pointer" }} />
                    <span>{item.clubjoin.joinedNum}</span>
                    <Button variant="primary" onClick={() => navigate(`/club/${item.clubId}`)}>
                      자세히 보기
                    </Button>
                    <Link to={`/${item.clubId}/1`}>
                      <Button variant="primary">선택</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
        {!authCtx.isLoggedIn &&
          clubList.map((item, index) => (
            <div key={item.clubId} className={`slick-slide ${index === currentSlideIndex ? 'center-club' : 'other-club'}`}>
              <Card style={{ width: "18rem", opacity: index === currentSlideIndex ? 1 : 0.6 }}>
                <Card.Img variant="top" src={`http://localhost:80/club/img/${item.clubFilename}`} />
                <Card.Body>
                  <Card.Title>{item.clubName}</Card.Title>
                  <Card.Text>{item.clubAddress}</Card.Text>
                  <FontAwesomeIcon icon={faHeart} style={{ color: "#000000", cursor: "pointer" }} />
                  <span>{item.clubjoin && item.clubjoin.joinedNum}</span>
                  <Button variant="primary" onClick={() => navigate(`/club/${item.clubId}`)}>
                    자세히 보기
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        }
      </Slider>
    </Fragment>
  );
  
  
};

export default HomeSection1;
