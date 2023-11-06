import React, { useCallback, useContext, useEffect, useState } from "react";

import AuthContext from "../../Store/Auth-context";
import JoinContext from "../../Store/Join-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ClubJoin = props => {
   const [isLoading, setIsLoading] = useState(false);
   const [joins, setJoins] = useState();

   const authCtx = useContext(AuthContext);
   const joinCtx = useContext(JoinContext);

   let isLogin = authCtx.isLoggedIn;
   const id = String(props.item);

   const getContext = useCallback(() => {
      setIsLoading(false);
      isLogin ? joinCtx.getclubjoin(id, authCtx.token) : joinCtx.getclubjoin(id);
   }, [isLogin]);

   useEffect(() => {
      getContext();
   }, [getContext]);

   useEffect(() => {
      if (joinCtx.isSuccess) {
         setJoins(joinCtx.joins);
         setIsLoading(true);
      }
   }, [joinCtx, joins]);

   useEffect(() => {
      if (joinCtx.isChangeSuccess) {
         setJoins(joinCtx.joins);
         setIsLoading(true);
      }
   }, [joinCtx.isChangeSuccess]);

   const changeClubjoin = () => {
      if (!isLogin) {
         return alert("로그인 하세요");
      } else {
         joins.joined ? joinCtx.deleteclubjoin(id, authCtx.token) : joinCtx.postclubjoin(id, authCtx.token);
      }
   };

   let media = <h3>is Loading...</h3>;

   if (isLoading && joins) {
      media = (
         <div>
            <FontAwesomeIcon
               icon={faHeart}
               style={{ color: joins.joined ? "#ff0000" : "#000000" }}
               onClick={changeClubjoin}
            />
            <h4>좋아요 {joins.joinedNum}</h4>
         </div>
      );
   }
   return <div>{media}</div>;
};

export default ClubJoin;
