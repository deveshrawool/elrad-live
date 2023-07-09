import AxiosInstance from "services/AxiosInstance"
export const getProfessionalSkills= ()=>{
    return AxiosInstance.get("GetProfessionalSkillsResponse.json")
    .then((res)=>res.data)
    .catch((error)=> error)
}
export const getHobbies= ()=>{
    return AxiosInstance.get("GetHobbiesResponse.json")
    .then((res)=>res.data)
    .catch((error)=> error)
}


export const getSubjects= ()=>{
    return AxiosInstance.get("GetSubjectsResponse.json")
    .then((res)=>res.data)
    .catch((error)=> error)
}
export const getEthicalCodeRatings = ()=>{
    return AxiosInstance.get("RatingsEthicalCodeResponse.json")
    .then((res)=>res.data)
    .catch((error)=> error)
}

export const getVirtuallyMetRatings = ()=>{
    return AxiosInstance.get("RatingsVirtuallyMetResponse.json")
    .then((res)=>res.data)
    .catch((error)=> error)
}