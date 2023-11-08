import React, { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const ClubItemNavigation = ({ clubId }) => {
  const SideUl = styled.ul`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 0 100px;
    list-style: none;
    background-color: #d2d4e5;
  `;
  const SideLi = styled.li`
    margin: 8px;
  `;

  return (
    <Fragment>
      <Navbar>
        <SideUl>
          <SideLi>
            <Nav.Link href={`/club/${clubId}`}>Main</Nav.Link>
          </SideLi>
          <SideLi>
            <Nav.Link href={`/club/${clubId}/gallery/page/1`}>Gallery</Nav.Link>
          </SideLi>
          <SideLi>
            <Nav.Link href="/moim/articlearticle">Article</Nav.Link>
          </SideLi>
        </SideUl>
      </Navbar>
    </Fragment>
  );
}; // ClubItemNavigation

export default ClubItemNavigation;
