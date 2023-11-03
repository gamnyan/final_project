import { Fragment } from "react";
// import { ChangeUsername } from "../components/Profile/ChangeUsername";
// import { ChangePassword } from "../components/Profile/ChangePassword";
import Profiles from "../components/Profile/Profile";

const ProfilePage = () => {
   return (
      <Fragment>
         <Profiles />
         {/* <ChangePassword />
         <ChangeUsername /> */}
      </Fragment>
   );
};

export default ProfilePage;
