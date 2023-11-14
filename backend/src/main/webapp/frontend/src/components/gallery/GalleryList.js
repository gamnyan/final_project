import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BootStrapTable from "react-bootstrap-table-next";
import { Button, Card, Col, Collapse, Container, Row } from "react-bootstrap";
import ClubItemNavigation from "../Layout/ClubItemNavigation";
import AuthContext from "../../Store/Auth-context";
import GalleryContext, {
  GalleryContextProvider,
} from "../../Store/Gallery-context";
import Paging from "./Paging";

import "../../css/gallery.css";
import Gallery from "./Gallery";
import GalleryOne from "./GalleryOne";

const GalleryList = (props) => {
  let navigate = useNavigate();
  const pageId = String(props.item);
  const clubId = props.clubId;

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  }; // handleCloaseModal
  const handleItemClick = (gallery) => {
    setSelectedItem(gallery);
    setShowModal(true);
  }; // handleItemClick

  const columns = [
    {
      dataField: "id",
      text: "#",
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "clubId",
      text: "clubId",
    },
    {
      dataField: "content",
      text: "내용",
      headerStyle: () => {
        return { width: "65%" };
      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          const galleryIdNum = row.id;
          navigate(`/club/${clubId}/gallery/${galleryIdNum}`);
        },
      },
    },
  ]; // columns

  const authCtx = useContext(AuthContext);
  const galleryCtx = useContext(GalleryContext);

  const [GalleryList, setGalleryList] = useState([]);
  const [maxNum, setMaxNum] = useState(1);

  let isLogin = authCtx.isLoggedIn;
  const fetchListHandler = useCallback(() => {
    galleryCtx.getGalleryPageList(clubId, pageId);
  }, []);

  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);

  useEffect(() => {
    if (galleryCtx.isSuccess) {
      setGalleryList(galleryCtx.page);
      setMaxNum(galleryCtx.totalPages);
    }
  }, [galleryCtx]);

  const handleImgClick = (id) => {
    navigate(`/club/${clubId}/gallery/${id}`);
  };
  return (
    <Fragment>
      <ClubItemNavigation clubId={props.clubId} />
      <br />
      {/* <BootStrapTable keyField="id" data={GalleryList} columns={columns} /> */}
      <Container id="gallery-area" className="d-flex justify-content-center">
        <Row className="gallery-row">
          {GalleryList.map((gallery, i) => {
            console.log(gallery);
            let imgSrc = "";
            if (gallery.attachment.length !== 0) {
              imgSrc = `http://localhost:80/club/one/${clubId}/gallery/img/${gallery.attachment[0].storeFilename}`;
            } else {
              imgSrc = "";
            }
            return (
              <Fragment key={i}>
                <Col md={3} style={{ float: "left" }}>
                  <Card
                    style={{
                      maxWidth: "270px",
                      minWidth: "250px",
                      margin: "15px",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{gallery.nickName}</Card.Title>
                      <Card.Subtitle
                        className="mb-2 text-muted"
                        style={{ fontSize: "14px", fontWeight: "100" }}
                      >
                        {gallery.createdAt}
                      </Card.Subtitle>
                      <div
                        style={{
                          width: "100%",
                          height: "250px",
                          maxHeight: "250px",
                          overflow: "auto",
                        }}
                        onClick={() => handleItemClick(gallery)}
                      >
                        <Card.Img
                          variant="top"
                          src={imgSrc}
                          style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                      <Card.Text>{gallery.content}</Card.Text>
                      <Button
                        /* onClick={handleExpandClick} */
                        onClick={() => handleItemClick(gallery)}
                        aria-label="show more"
                      >
                        Show More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Fragment>
            );
          })}
        </Row>
      </Container>
      <div>
        {isLogin && (
          <Link to={`/club/createGallery/${clubId}`} state={{ clubId: clubId }}>
            <Button>갤러리 게시</Button>
          </Link>
        )}
      </div>
      <Paging currentPage={Number(pageId)} maxPage={maxNum} clubId={clubId} />

      {/* modal */}
      {showModal && selectedItem && (
        <GalleryContextProvider>
          <GalleryOne item={selectedItem} onCloseModal={handleCloseModal} />
        </GalleryContextProvider>
      )}
    </Fragment>
  );
}; // GalleryList

export default GalleryList;
