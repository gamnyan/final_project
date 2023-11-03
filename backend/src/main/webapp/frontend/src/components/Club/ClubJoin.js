import React, {useCallback, useContext,useEffect,useState} from "react";

import AuthContext from "../../Store/Auth-context";
import ClubJoinContext from "../../Store/ClubJoin-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const ClubJoin = props => {
    const [isLoading,setIsLoading] = useState(false);
    const [clubjoins,setClubjoins] = useState();

    const authCtx = useContext(AuthContext);
    const clubjoinCtx = useContext(ClubJoinContext);

    let isLogin = authCtx.isLoggedIn;
    const id = String(props.item);

    const getContext = useCallback(()=>{
        setIsLoading(false)
        isLogin
            ? clubjoinCtx.getclubjoin(id,authCtx.token)
            : clubjoinCtx.getclubjoin(id)
    },[isLogin]);

    useEffect(()=>{
        getContext()
    },[getContext]);

    useEffect(()=>{
        if(clubjoinCtx.isSuccess){
            setClubjoins(clubjoinCtx.clubjoins);
            setIsLoading(true);
        }
    },[clubjoinCtx,clubjoins])  

    useEffect(()=>{
        if(clubjoinCtx.isChangeSuccess){
            setClubjoins(clubjoinCtx.clubjoins)
            setIsLoading(true);
        }
    },[clubjoinCtx.isChangeSuccess]);


    const changeClubjoin = () =>{
        if(!isLogin){
            return alert("로그인 하세요");
        }else{
            clubjoins.joined
            ? clubjoinCtx.deleteclubjoin(id,authCtx.token)
            : clubjoinCtx.postclubjoin(id,authCtx.token)
        }
    }

    let media = <h3>is Loading...</h3>

    if(isLoading && clubjoins){
        media = (
            <div>
                
                {/* {recommends.recommended ? heartImage(faHeart) : heartImage(faHeart)} */}
               {/*  {recommends.recommended !== undefined && (
  recommends.recommended ? heartImage(faHeart) : heartImage(faHeart)
)} */}
 <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: clubjoins.joined ? "#ff0000" : "#000000" }}
                    onClick={clubjoins}
                />
                <h4>좋아요  {clubjoins.joinedNum}</h4>
            </div>
        )
    }
    return <div >{media}</div>

}

export default ClubJoin