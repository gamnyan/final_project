import React, { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const SideNavigation = () => {
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
  `;

  return (
    <Fragment>
      <Navbar style={{ marginTop: "100px" }}>
        <SideUl style={{ padding: "70px 0", paddingLeft: "30px" }}>
          <SideLi>
            <SideBtn href="#">All</SideBtn>
          </SideLi>
          <SideLi>
            <Nav.Link href="#">Category</Nav.Link>
            <SideUl>
              <SideLi>
                <SideBtn href="#">카테고리 1</SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn href="#">카테고리 2</SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn href="#">카테고리 3</SideBtn>
              </SideLi>
            </SideUl>
          </SideLi>
          <SideLi>
            <Nav.Link href="#">Address</Nav.Link>
            <SideUl>
              <SideLi>
                <SideBtn href="#">주소 1</SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn href="#">주소 2</SideBtn>
              </SideLi>
              <SideLi>
                <SideBtn href="#">주소 3</SideBtn>
              </SideLi>
            </SideUl>
          </SideLi>
        </SideUl>
      </Navbar>
    </Fragment>
  );
};

export default SideNavigation;
