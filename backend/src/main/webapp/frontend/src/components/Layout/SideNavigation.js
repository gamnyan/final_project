import React, { Fragment, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const SideNavigation = ({ onCategoryChange, onAddressChange }) => {
  const SideUl = styled.ul`
    width: 100%;
    padding: 0;
    padding-left: 10px;
    list-style: none;
    background-color: #d2d4e5;
  `;
  const SideLi = styled.li`
    margin: 8px;
  `;
  const SideBtn = styled.button`
    margin: 8px;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? "#9fa8da" : "inherit")};
  `;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAddress, setSelectedAddress] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? "All" : category));
    onCategoryChange(category);
    setSelectedAddress("All");
  };

  const handleAddressChange = (address) => {
    setSelectedAddress((prevAddress) => (prevAddress === address ? "All" : address));
    onAddressChange(address);
    setSelectedCategory("All");
  };

  return (
    <Fragment>
      <Navbar style={{ marginTop: "100px" }}>
        <SideUl style={{ padding: "70px 0", paddingLeft: "30px" }}>
          <SideLi>
            <Nav.Link href="#">Category</Nav.Link>
            <SideUl>
          <SideLi>
            <SideBtn onClick={() => handleCategoryChange("All")} selected={selectedCategory === "All"}>
              All
            </SideBtn>
          </SideLi>
              <SideLi>
                <SideBtn onClick={() => handleCategoryChange("게임")} selected={selectedCategory === "게임"}>
                  게임
                </SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn onClick={() => handleCategoryChange("음식")} selected={selectedCategory === "음식"}>
                  음식
                </SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn onClick={() => handleCategoryChange("카페")} selected={selectedCategory === "카페"}>
                  카페
                </SideBtn>
              </SideLi>
            </SideUl>
          </SideLi>
          <SideLi>
            <Nav.Link href="#">Address</Nav.Link>
            <SideUl>
              <SideLi>
                <SideBtn onClick={() => handleAddressChange("All")} selected={selectedAddress === "All"}>
                  All
                </SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn onClick={() => handleAddressChange("양천구")} selected={selectedAddress === "양천구"}>
                  양천구
                </SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn onClick={() => handleAddressChange("마포구")} selected={selectedAddress === "마포구"}>
                  마포구
                </SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn onClick={() => handleAddressChange("구로구")} selected={selectedAddress === "구로구"}>
                  구로구
                </SideBtn>
              </SideLi>
            </SideUl>
          </SideLi>
        </SideUl>
      </Navbar>
    </Fragment>
  );
};

export default SideNavigation;
