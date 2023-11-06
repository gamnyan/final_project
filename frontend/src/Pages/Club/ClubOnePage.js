import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ClubOne from "../../components/Club/ClubOne";

import { ClubContextProvider } from "../../Store/Club-context";


const ClubOnePage = () => {
  let { clubId } = useParams();

  return (
    <Fragment>
      <ClubContextProvider>
        <ClubOne item={clubId} />
      </ClubContextProvider>
      
    </Fragment>
  );
}

export default ClubOnePage;
