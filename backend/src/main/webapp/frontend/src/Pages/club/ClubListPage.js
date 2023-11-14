import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ClubList from "../../components/Club/ClubList";
import { ClubContextProvider } from "../../Store/Club-context";

const ClubListPage = () => {
  let { pageId } = useParams();
  return (
    <ClubContextProvider>
      <Fragment>
        <ClubList item={pageId} />
      </Fragment>
    </ClubContextProvider>
  );
};
export default ClubListPage;
