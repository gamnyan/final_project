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
      title: "What is Lorem Ipsum?",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      thumbnail: "bg_intro1.jpg",
      title: "What is Lorem Ipsum?",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 3,
      thumbnail: "bg_intro1.jpg",
      title: "What is Lorem Ipsum?",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
