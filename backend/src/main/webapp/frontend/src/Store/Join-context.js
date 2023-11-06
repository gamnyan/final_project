import React, {useState} from "react"

import * as JoinAction from "./Join-action"

const JoinContext = React.createContext({
    joins: undefined,
    isSuccess: false,
    isChangeSuccess: false,
    getclubjoin: ()=>{},
    postclubjoin: ()=>{},
    deleteclubjoin:()=>{}
})

export const JoinContextProvider = props => {
    const [joins,setJoins] = useState()
    const [isSuccess,setIsSuccess] = useState(false)
    const [isChangeSuccess,setIsChangeSuccess] = useState(false)

    const getClubjoinHandler = (param,token)=>{
        setIsSuccess(false)
        const data = token
            ? JoinAction.getJoinedClub(param,token)
            : JoinAction.getJoinedClub(param)
        data.then(result => {
            if(result !== null){
                const joins = result.data
                setJoins(joins)
            }
        })
        setIsSuccess(true)
    }

    const makeClubjoinHandler = async (id, token) => {
        setIsChangeSuccess(false)
        const postData = await JoinAction.JoinClub(id,token)
        const msg = await postData?.data
        console.log(msg)

        const getData = await JoinAction.getJoinedClub(id,token)
        const joins = getData?.data
        setJoins(joins)
        setIsChangeSuccess(true)
    }

    const deleteClubjoinHandler = async (id,token) =>{
        setIsChangeSuccess(false)
        const postData = await JoinAction.deleteJoinClub(id,token)
        const msg = await postData?.data
        console.log(msg)

        const getData = await JoinAction.getJoinedClub(id,token)
        const joins = getData?.data
        setJoins(joins)
        setIsChangeSuccess(true)
    }

    const contextValue ={
        joins,
        isSuccess,
        isChangeSuccess,
        getclubjoin : getClubjoinHandler,
        postclubjoin : makeClubjoinHandler,
        deleteclubjoin : deleteClubjoinHandler
    }

    return (
        <JoinContext.Provider value={contextValue}>
            {props.children}
        </JoinContext.Provider>
    )
}

export default JoinContext