import React, { useState } from "react";
import * as clubAction from "./Club-action";

const ClubContext = React.createContext({
   club: undefined,
   page: [],
   isSuccess: false,
   isGetUpdateSuccess: false,
   totalPages: 0,
   geyMyClubList:()=>{},
   getClubPageList: () => {},
   getClubPageLoggedList:()=>{},
   getClubWithImg: () => {},
   createClubWithImg: () => {},
   getUpdateClubWithImg: () => {},
   updateClubWithImg: () => {},
   deleteClub: () => {},
});

export const ClubContextProvider = props => {
   const [club, setClub] = useState();
   const [page, setPage] = useState([]);
   const [totalPages, setTotalPages] = useState(0);
   const [isSuccess, setIsSuccess] = useState(false);
   const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);

   const getClubPageHandler = async pageId => {
      setIsSuccess(false);
      const data = await clubAction.getClubPageList(pageId);
      const page = data?.data.content;
      const pages = data?.data.totalPages;
      setPage(page);
      setTotalPages(pages);
      setIsSuccess(true);
   };

   const getMyClubPageHandler = async pageId => {
      setIsSuccess(false);
      const token = localStorage.getItem('token');
    
      const data = await clubAction.getMyClubPage(pageId, token);
    
      const page = data?.data.content;
      const pages = data?.data.totalPages;
      setPage(page);
      setTotalPages(pages);
      setIsSuccess(true);
   }

   const getClubPageLoggedInHandler = async pageId => {
      setIsSuccess(false);
      const token = localStorage.getItem('token');
    
      const data = await clubAction.getClubPageListLoggedIn(pageId, token);
    
      const page = data?.data.content;
      const pages = data?.data.totalPages;
      setPage(page);
      setTotalPages(pages);
      setIsSuccess(true);
    };
    

   const getClubHandler = (param, token) => {
      setIsSuccess(false);
      const data = token ? clubAction.getOneClubWithImg(param, token) : clubAction.getOneClubWithImg(param);
      data.then(result => {
         if (result !== null) {
            const club = result.data;
            console.log(club);
            setClub(club);
         }
      });
      setIsSuccess(true);
   };

   const createClubHandler = (club, token, file) => {
      setIsSuccess(false);

      const formData = new FormData();
      formData.append("name", club.name);
      formData.append("category", club.category);
      formData.append("clubinfo", club.clubinfo);
      formData.append("address", club.address);
      formData.append("file", file);

      const data = clubAction.makeClubWithFiles(token, formData);

      data.then(result => {
         if (result !== null) {
            console.log(isSuccess);
         }
      });
      setIsSuccess(true);
   };

   const getUpdateClubHandler = async (token, param) => {
      setIsGetUpdateSuccess(false);
      const updateData = await clubAction.getChangeClubWithFile(token, param);
      const club = updateData?.data;
      setClub(club);
      setIsGetUpdateSuccess(true);
   };

   const updateClubHandler = (club, token, file) => {
      setIsSuccess(false);

      const formData = new FormData();
      formData.append("name", club.name);
      formData.append("category", club.category);
      formData.append("clubinfo", club.clubinfo);
      formData.append("address", club.address);
      formData.append("file", file);
      formData.append("id", club.id);

      const data = clubAction.changeClubWithFile(token, formData);

      data.then(result => {
         if (result !== null) {
            console.log(isSuccess);
         }
      });
      setIsSuccess(true);
   };

   const deleteClubHandler = (token, param) => {
      setIsSuccess(false);
      const data = clubAction.deleteClub(token, param);
      data.then(result => {
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
      geyMyClubList: getMyClubPageHandler,
      getClubPageList: getClubPageHandler,
      getClubPageLoggedList:getClubPageLoggedInHandler,
      getClubWithImg: getClubHandler,
      createClubWithImg: createClubHandler,
      getUpdateClubWithImg: getUpdateClubHandler,
      updateClubWithImg: updateClubHandler,
      deleteClub: deleteClubHandler,
   };

   return <ClubContext.Provider value={contextValue}>{props.children}</ClubContext.Provider>;
};

export default ClubContext;
