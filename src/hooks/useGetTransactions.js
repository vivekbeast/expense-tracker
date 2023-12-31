import { useEffect, useState } from "react";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";



export const useGetTransactions = () =>{
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotal] = useState({balance: 0.0, income: 0.0, expense: 0.0});

    const transactionCollectRef = collection(db, "transactions");

    const { userId } = useGetUserInfo();




    const getTransactions = async ()=>{
        let unsubscribe;
        try{
            const queryTransactions = query(transactionCollectRef, 
                where("userId", "==", userId),
                orderBy("createdAt")
                );
                unsubscribe = onSnapshot(queryTransactions, (snapshot)=>{
                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;

                 snapshot.forEach((doc)=>{
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({...data, id});

                    if(data.transactionType === "expense"){
                        totalExpense += Number(data.transactionAmount);
                    }
                    else{
                        totalIncome += Number(data.transactionAmount);
                    }
                    
                });
                setTransactions(docs);
                let balance = totalIncome - totalExpense;
                setTransactionTotal({
                    balance,
                    expense: totalExpense,
                    income: totalIncome,
                });
            });
        }
        catch(err){
            console.error(err);
        };
        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }); 
    





    return { transactions , transactionTotals }; 
}
