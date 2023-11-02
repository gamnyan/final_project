import { Fragment } from "react";
import { ChangeUsername } from "../components/Profile/ChangeUsername";
import { ChangePassword } from "../components/Profile/ChangePassword";
import MainProfilePage from "../components/Profile/MainProfilePage";

const ProfilePage = () => {
   return (
      <Fragment>
         <MainProfilePage />
         <ChangePassword />
         <ChangeUsername />
      </Fragment>
   );
};

export default ProfilePage;
