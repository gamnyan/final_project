import { Fragment, Link } from "react";
import { useParams } from "react-router-dom";
import { ClubContextProvider } from "../../Store/Club-context";
import { JoinContextProvider } from "../../Store/Join-context";

import ClubOne from "../../components/Club/ClubOne";
import Join from "../../components/Club/Join";

const ClubOnePage = () => {
  let { clubId } = useParams();
  console.log(clubId);
  return (
    <Fragment>
      <ClubContextProvider>
        <ClubOne item={clubId} />
      </ClubContextProvider>
      <JoinContextProvider>
        <Join item={clubId} />
      </JoinContextProvider>
    </Fragment>
  );
};

export default ClubOnePage;
