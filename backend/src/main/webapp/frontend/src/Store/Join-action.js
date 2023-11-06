import { GET,POST,PUT,DELETE } from "./Fetch-auth-action"

const createTokenHeader = token => {
  return {
    headers: {
      Authorization: "Bearer " + token
    }
  }
}

export const getJoinedClub = (param,token)=>{
    const URL = "/clubjoin/list?id=" + param
    const response = token ? GET(URL,createTokenHeader(token)) : GET(URL,{})
    return response
}

export const JoinClub = async (id_str,token) => {
    const URL = "/clubjoin/"
    const id = +id_str
    const response = POST(URL,{id:id},createTokenHeader(token))
    return response
}

export const deleteJoinClub = (param,token) => {
    const URL = "/clubjoin/delete?id=" + param
    const response = DELETE(URL,createTokenHeader(token))
    return response
}
