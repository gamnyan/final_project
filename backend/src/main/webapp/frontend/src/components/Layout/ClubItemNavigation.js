import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../../css/layout.css";

const ClubItemNavigation = ({ clubId }) => {
  return (
    <Navbar id="clubItemNav">
      <Nav fill defaultActiveKey={`/club/${clubId}`} className="nav-custom">
        <Nav.Item>
          <Nav.Link href={`/club/${clubId}`} className="link-custom">
            Main
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`/club/${clubId}/gallery/page/1`}
            className="link-custom"
          >
            Gallery
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`/club/${clubId}/article/page/1`}
            className="link-custom"
          >
            Article
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`/club/${clubId}/chat/${clubId}`}
            className="link-custom"
          >
            Chat
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default ClubItemNavigation;
