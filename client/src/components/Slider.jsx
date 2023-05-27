import React, { useState } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import stussyImage from "../image/stussy_1.png";
import { Button } from "@mui/material";
import { SliderItem } from "./Datas";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.posix === "left" && "10px"};
  right: ${(props) => props.posix === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 9;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-color: ${(props) => props.bg};
`;
const ImgContainer = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  margin-top: -130px;
`;
const InfoContainer = styled.div`
  position: absolute;
  top: 18px;
  margin-left: 20px;
`;
const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.colorText};
`;
const Desc = styled.p`
  margin: 20px 0px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  color: ${(props) => props.colorText};
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (posix) => {
    if (posix === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow posix="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {SliderItem.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.image} />
            </ImgContainer>

            <InfoContainer>
              <Title colorText={item.colorText} key={item.id}>
                {item.title}
              </Title>
              <Desc colorText={item.colorText} key={item.id}>
                {item.category}
              </Desc>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow posix="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
