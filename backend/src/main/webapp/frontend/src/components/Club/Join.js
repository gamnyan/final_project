import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import AuthContext from "../../Store/Auth-context";
import JoinContext from "../../Store/Join-context";

const Join = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [joins, setJoins] = useState();

  const authCtx = useContext(AuthContext);
  const joinCtx = useContext(JoinContext);

  const isLogin = authCtx.isLoggedIn;
  const id = String(props.item);

  const getContext = useCallback(() => {
    console.log('getContext 함수가 호출되었습니다.');
    setIsLoading(true);
    isLogin
      ? joinCtx.getclubjoin(id, authCtx.token)
      : joinCtx.getclubjoin(id);
  }, [isLogin, id, authCtx.token, joinCtx]);
  

  useEffect(() => {
    getContext();
  }, []);

  /* useEffect(() => {
    if (joinCtx.isSuccess) {
      setJoins(joinCtx.joins);
      setIsLoading(true);
    }
  }, [joinCtx.isSuccess, joinCtx.joins]);
  
  useEffect(() => {
    if (joinCtx.isChangeSuccess) {
      setJoins(joinCtx.joins);
      setIsLoading(true);
    }
  }, [joinCtx.isChangeSuccess, joinCtx.joins]); */
  useEffect(() => {
    if (joinCtx.isSuccess || joinCtx.isChangeSuccess) {
      setJoins(joinCtx.joins);
      setIsLoading(true);
    }
  }, [joinCtx.isSuccess, joinCtx.isChangeSuccess, joinCtx.joins]);

  const changeClubjoin = () => {
    if (!isLogin) {
      return alert("로그인 하세요");
    } else {
      joins.joined
        ? joinCtx.deleteclubjoin(id, authCtx.token)
        : joinCtx.postclubjoin(id, authCtx.token);
    }
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faHeart}
        style={{ color: joins?.joined ? "#ff0000" : "#000000", cursor: "pointer" }}
        onClick={changeClubjoin}
      />
      <span style={{ marginLeft: "5px", marginRight: "10px" }}>
        가입하기 {joins?.joinedNum}
      </span>
     
    </div>
  );
};

export default Join;
