import { addDoc , collection, serverTimestamp} from "firebase/firestore"
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";




export const useAddTransactions = () =>{

    const transactionCollectRef = collection(db, "transactions");

    const {userId} = useGetUserInfo();



    const addTransaction = async ({description, transactionAmount, transactionType}) =>{
        await addDoc(transactionCollectRef, {
            userId,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        })
    };
    return { addTransaction };
};