import { GET, POST } from "./Fetch-auth-action";

/** 토큰 만드는 함수, 내부에서만 사용 */
const createTokenHeader = token => {
   return {
      headers: {
         Authorization: "Bearer " + token,
      },
   };
};

/** 토큰 만요시간 계산하는 함수, 내부에서만 사용 */
const calculateRemainingTime = expirationTime => {
   const currentTime = new Date().getTime();
   const adjExpirationTime = new Date(expirationTime).getTime();
   const remainingDuration = adjExpirationTime - currentTime;
   return remainingDuration;
};

/** 토큰값과 만료시간을 부여받아서 localStorage 내부에 저장, 남은 시간 반환 */
export const loginTokenHandler = (token, expirationTime) => {
   localStorage.setItem("token", token);
   localStorage.setItem("expirationTime", String(expirationTime));

   const remainingTime = calculateRemainingTime(expirationTime);
   return remainingTime;
};

/** localStorage 내부에 토큰이 존재하는지 검색
 *  존재하면 만료까지 남은 시간과 토큰값을 같이 객체로 반환
 *  또한 시간이 1초 아래로 남으면 자동으로 토큰 삭제
 */
export const retrieveStoredToken = () => {
   const storedToken = localStorage.getItem("token");
   const storedExpirationDate = localStorage.getItem("expirationTime") || "0";

   const remaingTime = calculateRemainingTime(+storedExpirationDate);

   if (remaingTime <= 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return null;
   }

   return {
      token: storedToken,
      duration: remaingTime,
   };
};

/** 회원가입 URL로 POST 방식으로 호출하는 함수
 *  통신으로 반환된 response를 반환
 *  반환 타입은 Promise<AxiosResponse<any, any> | null>
 */
export const signupActionHandler = (email, password, nickname) => {
   const URL = "/auth/signup";
   const signupObject = { email, password, nickname };

   const response = POST(URL, signupObject, {});
   return response;
};

/** 로그인 URL을 POST 방식으로 호출 */
export const loginActionHandler = (email, password) => {
   const URL = "/auth/login";
   const loginObject = { email, password };

   const response = POST(URL, loginObject, {});
   return response;
};

/** 로그아웃 */
export const logoutActionHandler = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("expirationTime");
};

/** 유저정보 GET 호출, 토큰값 헤더에 넣어 호출, Promise객체 response 반환 */
export const getUserActionHandler = token => {
   const URL = "/member/me";
   const response = GET(URL, createTokenHeader(token));
   return response;
};

/** 닉네임 바꾸는 함수, 닉네임은 바꿀 닉네임만 보냄 */
export const changeNicknameActionHandler = (nickname, token) => {
   const URL = "/member/nickname";
   const changeNicknameObj = { nickname };
   const header = createTokenHeader(token);
   const response = POST(URL, changeNicknameObj, header);
   console.log("nick response: " + response);
   return response;
};

/** 패스워드 바꾸는 함수, 패스워드는 이전과 현재 둘다 보내줌 */
export const changePasswordActionHandler = (exPassword, newPassword, token) => {
   const URL = "/member/password";
   const changePasswordObj = { exPassword, newPassword };
   const header = createTokenHeader(token);
   const response = POST(URL, changePasswordObj, header);
   console.log("pass response: " + response);
   return response;
};
