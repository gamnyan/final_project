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
    <Navbar expand="lg" style={{ marginTop: "100px" }}>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Link href="#">All</Nav.Link>
          <Nav.Link href="#">Category</Nav.Link>
          <Nav className="ml-3 flex-column">
            <Nav.Link href="#">카테고리 1</Nav.Link>
            <Nav.Link href="#">카테고리 2</Nav.Link>
            <Nav.Link href="#">카테고리 3</Nav.Link>
          </Nav>
          <Nav.Link href="#">Address</Nav.Link>
          <Nav className="ml-3 flex-column">
            <Nav.Link href="#">주소 1</Nav.Link>
            <Nav.Link href="#">주소 2</Nav.Link>
            <Nav.Link href="#">주소 3</Nav.Link>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SideNavigation;
