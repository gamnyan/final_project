import React, { useCallback, useContext, useEffect, useState } from "react";

import AuthContext from "../../Store/Auth-context";
import RecommendContext from "../../Store/Recommend-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Recommend = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [recommends, setRecommends] = useState();

  const authCtx = useContext(AuthContext);
  const recommendCtx = useContext(RecommendContext);

  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);

  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? recommendCtx.getRecommends(id, authCtx.token)
      : recommendCtx.getRecommends(id);
  }, [isLogin]);

  useEffect(() => {
    getContext();
  }, [getContext]);

  useEffect(() => {
    if (recommendCtx.isSuccess) {
      setRecommends(recommendCtx.recommends);
      console.log(recommends);
      console.log("set");
      setIsLoading(true);
    }
  }, [recommendCtx, recommends]);

  useEffect(() => {
    if (recommendCtx.isChangeSuccess) {
      setRecommends(recommendCtx.recommends);
      console.log(recommends);
      console.log("change set");
      setIsLoading(true);
    }
  }, [recommendCtx.isChangeSuccess]);

  const changeRecommend = () => {
    if (!isLogin) {
      return alert("로그인 하세요");
    } else {
      recommends.recommended
        ? recommendCtx.deleteRecommend(id, authCtx.token)
        : recommendCtx.postRecommend(id, authCtx.token);
    }
  };

  /* const heartImage = heart => {
        return (
            <img 
            alt ="heart"
           
            src={heart}
            onClick={changeRecommend}
            />
        )
    } */
  /* const heartImage = heart => {
        return (
            <FontAwesomeIcon 
                icon={faHeart} 
                style={{ color: heart === "empty" ? "#000000" : "#ff0000" }}
                onClick={changeRecommend}
            />
        )
    } */

  let media = <h3>is Loading...</h3>;

  if (isLoading && recommends) {
    media = (
      <div>
        {/* {recommends.recommended ? heartImage(faHeart) : heartImage(faHeart)} */}
        {/*  {recommends.recommended !== undefined && (
  recommends.recommended ? heartImage(faHeart) : heartImage(faHeart)
)} */}
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: recommends.recommended ? "#ff0000" : "#000000" }}
          onClick={changeRecommend}
        />
        <h4>좋아요 {recommends.recommendNum}</h4>
      </div>
    );
  }
  return <div>{media}</div>;
};
export default Recommend;
