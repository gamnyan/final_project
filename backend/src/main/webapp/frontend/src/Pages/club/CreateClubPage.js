import CreateClubForm from "../../components/Club/CreateClubForm";

import { ClubContextProvider } from "../../Store/Club-context";

const CreateClubPage = () => {
    return (
        <ClubContextProvider>
            <CreateClubForm item={undefined}/>
        </ClubContextProvider>
    )
}

export default CreateClubPage