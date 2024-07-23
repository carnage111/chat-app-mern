export const getuserName=(loggedUserId,users)=>{
    return users.find(user=>user._id!==loggedUserId).name
}

export const getUser = (loggedUserId, users) => {
    return users.find((user) => user._id !== loggedUserId);
}