import { Fragment } from "react";
import {useParams} from "react-router-dom";
import ClubOne from "../../components/Club/ClubOne";
import ClubJoin from "../../components/Club/ClubJoin";
import { ClubContextProvider } from "../../Store/Club-context";
import { ClubjoinContextProvider } from "../../Store/ClubJoin-context";

const ClubOnePage =() => {
    let {clubId} = useParams();
    console.log(clubId);
    return(
        <Fragment>
            <ClubContextProvider>
                <ClubOne item={clubId}/>
            </ClubContextProvider>
            <ClubjoinContextProvider>
                <ClubJoin itme={clubId}/>
            </ClubjoinContextProvider>
        </Fragment>
    )
}

export default ClubOnePage