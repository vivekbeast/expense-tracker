// export const useGetUserInfo = () =>{
//     const {name, profilePhoto, userId, isAuth} = JSON.parse(localStorage.getItem("auth"));
//     return {name, profilePhoto, userId, isAuth};
// }
export const useGetUserInfo = () => {
    try {
        const authData = JSON.parse(localStorage.getItem("auth")) || {};
        const { name, profilePhoto, userId, isAuth } = authData;

        return { name, profilePhoto, userId, isAuth };
    } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
        return {};
    }
};
