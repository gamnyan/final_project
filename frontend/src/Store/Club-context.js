import React, { useState } from "react";
import * as clubAction from "./Club-action";

const ClubContext = React.createContext({
  club: undefined,
  page: [],
  isSuccess: false,
  isGetUpdateSuccess: false,
  totalPages: 0,
  getPageList: () => {},
  getClub: () => {},
  createClub: () => {},
  getUpdateClub: () => {},
  updateClub: () => {},
  deleteClub: () => {},
});

export const ClubContextProvider = (props) => {
  const [club, setClub] = useState();
  const [page, setPage] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);

  const getPageHandler = async (pageId) => {
    setIsSuccess(false);
    const data = await clubAction.getPageList(pageId);
    const page = data?.data.content;
    const pages = data?.data.totalPages;
    setPage(page);
    setTotalPages(pages);
    setIsSuccess(true);
  };

  const getClubHandler = (param, token) => {
    setIsSuccess(false);
    const data = token ? clubAction.getOneClub(param, token) : clubAction.getOneClub(param);
    data.then((result) => {
      if (result !== null) {
        const club = result.data;
        setClub(club);
      }
    });
    setIsSuccess(true);
  };

  const createClubHandler = (clubData, token) => {
    setIsSuccess(false);
    const data = clubAction.createClub(clubData, token);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
      }
    });
    setIsSuccess(true);
  };

  const getUpdateClubHandler = async (id, token) => {
    setIsGetUpdateSuccess(false);
    const updateData = await clubAction.getChangeClub(id, token);
    const club = updateData?.data;
    setClub(club);
    setIsGetUpdateSuccess(true);
  };

  const updateClubHandler = (clubData, token) => {
    setIsSuccess(false);
    const data = clubAction.changeClub(clubData, token);
    data.then((result) => {
      if (result !== null) {
      }
    });
    setIsSuccess(true);
  };

  const deleteClubHandler = (id, token) => {
    setIsSuccess(false);
    const data = clubAction.deleteClub(id, token);
    data.then((result) => {
      if (result !== null) {
      }
    });
    setIsSuccess(true);
  };

  const contextValue = {
    club,
    page,
    isSuccess,
    isGetUpdateSuccess,
    totalPages,
    getPageList: getPageHandler,
    getClub: getClubHandler,
    createClub: createClubHandler,
    getUpdateClub: getUpdateClubHandler,
    updateClub: updateClubHandler,
    deleteClub: deleteClubHandler,
  };

  return <ClubContext.Provider value={contextValue}>{props.children}</ClubContext.Provider>;
};

export default ClubContext;
