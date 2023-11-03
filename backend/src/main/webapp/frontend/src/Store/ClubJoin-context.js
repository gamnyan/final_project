import React, {useState} from "react"

import * as clubjoinAction from "./ClubJoin-action"

const ClubjoinContext = React.createContext({
    clubjoins: undefined,
    isSuccess: false,
    isChangeSuccess: false,
    getclubjoin: ()=>{},
    postclubjoin: ()=>{},
    deleteclubjoin:()=>{}
})

export const ClubjoinContextProvider = props => {
    const [clubjoins,setClubjoins] = useState()
    const [isSuccess,setIsSuccess] = useState(false)
    const [isChangeSuccess,setIsChangeSuccess] = useState(false)

    const getClubjoinHandler = (param,token)=>{
        setIsSuccess(false)
        const data = token
            ? clubjoinAction.getJoinedClub(param,token)
            : clubjoinAction.getJoinedClub(param)
        data.then(result => {
            if(result !== null){
                const clubjoins = result.data
                setClubjoins(clubjoins)
            }
        })
        setIsSuccess(true)
    }

    const makeClubjoinHandler = async (id, token) => {
        setIsChangeSuccess(false)
        const postData = await clubjoinAction.JoinClub(id,token)
        const msg = await postData?.data
        console.log(msg)

        const getData = await clubjoinAction.getJoinedClub(id,token)
        const clubjoins = getData?.data
        setClubjoins(clubjoins)
        setIsChangeSuccess(true)
    }

    const deleteClubjoinHandler = async (id,token) =>{
        setIsChangeSuccess(false)
        const postData = await clubjoinAction.deleteJoinClub(id,token)
        const msg = await postData?.data
        console.log(msg)

        const getData = await clubjoinAction.getJoinedClub(id,token)
        const clubjoins = getData?.data
        setClubjoins(clubjoins)
        setIsChangeSuccess(true)
    }

    const contextValue ={
        clubjoins,
        isSuccess,
        isChangeSuccess,
        getclubjoin : getClubjoinHandler,
        postclubjoin : makeClubjoinHandler,
        deleteclubjoin : deleteClubjoinHandler
    }

    return (
        <ClubjoinContext.Provider value={contextValue}>
            {props.children}
        </ClubjoinContext.Provider>
    )
}

export default ClubjoinContext