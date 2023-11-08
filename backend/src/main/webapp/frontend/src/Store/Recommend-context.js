import React, { useState } from "react";

import * as recommendAction from "./Recommend-action";

const RecommendContext = React.createContext({
  recommends: undefined,
  isSuccess: false,
  isChangeSuccess: false,
  getRecommends: () => {},
  postRecommend: () => {},
  deleteRecommend: () => {},
});

export const RecommendContextProvider = (props) => {
  const [recommends, setRecommends] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChangeSuccess, setIsChangeSuccess] = useState(false);

  const getRecommendsHandler = (param, token) => {
    setIsSuccess(false);
    const data = token
      ? recommendAction.getRecommends(param, token)
      : recommendAction.getRecommends(param);
    data.then((result) => {
      if (result !== null) {
        const recommends = result.data;
        setRecommends(recommends);
      }
    });
    setIsSuccess(true);
  };

  const postRecommendHandler = async (id, token) => {
    setIsChangeSuccess(false);
    const postData = await recommendAction.makeRecommend(id, token);
    const msg = await postData?.data;
    console.log(msg);

    const getData = await recommendAction.getRecommends(id, token);
    const recommends = getData?.data;
    setRecommends(recommends);
    setIsChangeSuccess(true);
  };

  const deleteRecommendHancler = async (param, token) => {
    setIsChangeSuccess(false);
    const deleteData = await recommendAction.deleteRecommend(param, token);
    const msg = await deleteData?.data;

    const getData = await recommendAction.getRecommends(param, token);
    const recommends = getData?.data;
    setRecommends(recommends);
    setIsChangeSuccess(true);
  };

  const contextValue = {
    recommends,
    isSuccess,
    isChangeSuccess,
    getRecommends: getRecommendsHandler,
    postRecommend: postRecommendHandler,
    deleteRecommend: deleteRecommendHancler,
  };

  return (
    <RecommendContext.Provider value={contextValue}>
      {props.children}
    </RecommendContext.Provider>
  );
};

export default RecommendContext;
