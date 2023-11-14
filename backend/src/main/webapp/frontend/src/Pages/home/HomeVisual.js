import React, { Fragment } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import HomeVisualItem from "./HomeVisualItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
`;

const HomeVisual = () => {
  const visualContent = [
    {
      id: 1,
      thumbnail: "bg_intro1.jpg",
      title: "우리들의 아지트",
      desc: "바쁜 일상속에서 도드라지는 미소",
    },
    {
      id: 2,
      thumbnail: "bg_intro1.jpg",
      title: "작은 소모임, 큰 연결",
      desc: "작은 공간에서 시작되지만, 우리가 함께하는 여정은 큰 변화와 연결을 만들어냅니다.",
    },
    {
      id: 3,
      thumbnail: "bg_intro1.jpg",
      title: "새로운 취미를 원하는 당신",
      desc: "사람들과 새로운 도전을 해보하며, 나의 취미를 사람들과 공유해 보아요.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrow: true,
  };

  return (
    <Fragment>
      <VisualContainer id="visualContainer-area">
        <Slider {...settings}>
          {visualContent.map((visual, i) => (
            <HomeVisualItem
              key={i}
              thumbnail={visual.thumbnail}
              title={visual.title}
              desc={visual.desc}
            />
          ))}
        </Slider>
      </VisualContainer>
    </Fragment>
  );
}; // Home_Visual

export default HomeVisual;
