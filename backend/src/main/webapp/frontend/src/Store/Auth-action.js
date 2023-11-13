import { GET, POST, PUT } from "./Fetch-auth-action";

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

  const remaining = calculateRemainingTime(+storedExpirationDate);

  if (remaining <= 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remaining,
  };
};

/** 회원가입 URL로 POST 방식으로 호출하는 함수
 *  통신으로 반환된 response를 반환
 *  반환 타입은 Promise<AxiosResponse<any, any> | null>
 */
export const signupActionHandler = async (email, password, nickname, filename) => {
  const URL = "/auth/signup";
  // 이메일 중복 체크를 기다림
  const isEmailDuplicate = await checkDuplicateEmail(email);
  // 중복이 아니면 회원가입 요청
  if (!isEmailDuplicate) {
    const signupObject = { email, password, nickname, filename };
    const response = await POST(URL, signupObject, {});
    return response;
  } else {
    // 중복이면 처리할 내용 추가
    return null; // 또는 다른 처리를 하세요.
  }
};

/** 이메일 인증 보내는 함수 */
export const sendEmailActionHandler = async email => {
  const URL = "/auth/mailConfirm";
  // FormData 객체 생성
  const formData = new FormData();
  formData.append("email", email);

  const response = await POST(URL, formData, {});
  return response.data;
};

/** 이메일 중복 체크를 위한 함수
 *  중복되면 false, 중복되지 않으면 true 반환
 *  반환 타입은 Promise<boolean>
 */
export const checkDuplicateEmail = async email => {
  const duplicateCheckURL = "/member/check-email";
  const userEmail = { email };
  const duplicateCheckResponse = await POST(duplicateCheckURL, userEmail, {});
  return duplicateCheckResponse.data;
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
  return response;
};

/** 패스워드 바꾸는 함수, 패스워드는 이전과 현재 둘다 보내줌 */
export const changePasswordActionHandler = (exPassword, newPassword, token) => {
  const URL = "/member/password";
  const changePasswordObj = { exPassword, newPassword };
  const header = createTokenHeader(token);
  const response = POST(URL, changePasswordObj, header);
  return response;
};

export const memberWithdrawActionHandler = (password, token) => {
  const URL = "/member/withdraw";
  const memberWithdrawObj = { password };
  const header = createTokenHeader(token);
  const response = POST(URL, memberWithdrawObj, header);
  return response;
};

export const changePhoto = (token, formData) => {
  const URL = "/member/changep";
  const response = PUT(URL, formData, createTokenHeader(token));
  return response;
};
