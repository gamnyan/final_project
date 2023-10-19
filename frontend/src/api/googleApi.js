import React from "react";
import { GoogleLogin } from "react-google-login";

const responseGoogle = response => {
   console.log(response);
   // 서버로 받은 토큰을 전송하거나 다른 작업을 수행할 수 있어요.
};

const GoogleLoginButton = () => {
   return (
      <GoogleLogin
         clientId="YOUR_GOOGLE_CLIENT_ID"
         buttonText="구글로 로그인"
         onSuccess={responseGoogle}
         onFailure={responseGoogle}
         cookiePolicy={"single_host_origin"}
      />
   );
};

export default GoogleLoginButton;
