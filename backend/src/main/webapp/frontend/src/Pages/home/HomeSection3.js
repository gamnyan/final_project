import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BootStrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import ClubItemNavigation from "../../components/Layout/ClubItemNavigation";
import AuthContext from "../../Store/Auth-context";
import GalleryContext from "../../Store/Gallery-context";
import Paging from "../../components/gallery/Paging";

const HomeSection3 = (props) => {

  let navigate = useNavigate();
  const pageId = String(props.item);
  const clubId = props.clubId;

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
      setGalleryList(galleryCtx.page.reverse());
      setMaxNum(galleryCtx.totalPages);
    }
  }, [galleryCtx]);
  return (
    <Fragment>
     
      <br />
      <BootStrapTable keyField="id" data={GalleryList} columns={columns} />
      {/* {GalleryList.map((gallery) => {
        return <div>{gallery.content}</div>;
      })} */}
      
      {/* <div>
        {isLogin && (
          <Link to={`/club/createGallery/${clubId}`} state={{ clubId: clubId }}>
            <Button>갤러리 게시</Button>
          </Link>
        )}
      </div> */}
      {/* <Paging currentPage={Number(pageId)} maxPage={maxNum} clubId={clubId} /> */}
    </Fragment>
  );
  
}; // homeSection3

export default HomeSection3;
