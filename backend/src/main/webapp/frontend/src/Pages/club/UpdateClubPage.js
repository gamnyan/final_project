import { useParams } from "react-router-dom";
import CreateClubForm from "../../components/Club/CreateClubForm";
import { ClubContextProvider } from "../../Store/Club-context";

const UpdateClubPage = () => {
    let { clubId } = useParams();

    return (
        <ClubContextProvider>
            <CreateClubForm item={clubId} />
        </ClubContextProvider>
    )
}

export default UpdateClubPage