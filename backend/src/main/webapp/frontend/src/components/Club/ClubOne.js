import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ClubContext from "../../Store/Club-context";
import AuthContext from "../../Store/Auth-context";
import Club from "./Club";

const ClubOne = (props) => {
  let navigate = useNavigate();

  const [club, setClub] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const clubCtx = useContext(ClubContext);

  let isLogin = authCtx.isLoggedIn;
  const id = String(props.item);
  console.log(id + "clubone id");
  const deleteHandler = (id) => {
    clubCtx.deleteClub(authCtx.token, id);
    alert("삭제되었습니다.");
    navigate("/club/clubpage/1");
  };

  const getContext = useCallback(() => {
    setIsLoading(false);
    isLogin
      ? clubCtx.getClubWithImg(id, authCtx.token)
      : clubCtx.getClubWithImg(id);
  }, [isLogin]);

  useEffect(() => {
    getContext();
  }, [getContext]);

  useEffect(() => {
    if (clubCtx.isSuccess) {
      setClub(clubCtx.club);
      setIsLoading(true);
    }
  }, [clubCtx.isSuccess, clubCtx.club]);

  console.log(club + "clubone");
  let content = <p>Loading</p>;

  if (isLoading && club) {
    content = <Club item={club} onDelete={deleteHandler} />;
  }
  return <div>{content}</div>;
};
export default ClubOne;
