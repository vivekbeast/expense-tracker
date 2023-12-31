import { useState } from "react";
import { useAddTransactions } from "../hooks/useAddTransactions"
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom"
import img from "../Untitled design.png";

export const ExpenseTracker = () =>{

    const { addTransaction } = useAddTransactions();
    const { transactions, transactionTotals } = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();




    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, settransactionType] = useState("");

    const {balance, expense, income} = transactionTotals;

    const signUserOut = async () =>{
        try{
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        }
        catch(err){
            console.error(err);
        }
    }




    const onSubmit = (e) =>{
        e.preventDefault();
        addTransaction({description, transactionAmount, transactionType});
        setDescription("");
        setTransactionAmount("");
    }

    



   
    

    return (<>
    <div>
    <header className="w-full text-center bg-white shadow-lg p-1 flex flex-row items-center md:flex-row md:p-4 ">
      <img
        className="h-16 w-auto rounded-full border-2 border-gray-300 shadow-lg md:mb-0"
        src={img}
        alt="logo"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">VGrow</h1>
    </header>
    
    <div className="expense-tracker bg-gray-900 p-4 md:p-8">
    {profilePhoto && (
        <div className="flex items-center mb-4 md:mb-10">
            <img
                src={profilePhoto}
                alt="NoProfile"
                className="rounded-full h-12 w-12 object-cover mr-2"
            />
            <h1 className=" text-white text-2xl font-bold">{name}'s Expense Tracker</h1>
        </div>
    )}

    <div className="balance bg-white p-4 rounded-md mt-4 md:mt-0">
        <h3 className="text-lg font-semibold mb-2">YOUR BALANCE</h3>
        <h2 className={balance >= 0 ? "text-green-600" : "text-red-600"}>
            {balance >= 0 ? `₹${balance}` : `-₹${balance * -1}`}
        </h2>
    </div>

    <div className="summary mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="income bg-green-100 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Income</h4>
            <p className="text-green-600">₹ {income}</p>
        </div>
        <div className="expenses bg-red-100 p-4 rounded-md">
            <h4 className="text-lg font-semibold">Expense</h4>
            <p className="text-red-600">₹ {expense}</p>
        </div>
    </div>

    <form onSubmit={onSubmit} className="mt-4">
        <input
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={(e) => { setDescription(e.target.value) }}
            className="p-2 border border-gray-300 rounded-md mb-2 md:mr-2 md:mb-0"
        />
        <input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            required
            onChange={(e) => { setTransactionAmount(e.target.value) }}
            className="p-2 border border-gray-300 rounded-md mb-2 md:mr-2 md:mb-0"
        />
        <div className=" p-4">
        <input
            type="radio"
            id="expense"
            value="expense"
            checked={transactionType === "expense"}
            onChange={(e) => { settransactionType(e.target.value) }}
            className="mr-1"
        />
        <label htmlFor="expense" className="mr-2 text-white">Expense</label>
        <input
            type="radio"
            id="income"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => { settransactionType(e.target.value) }}
            className="mr-1"
        />
        <label htmlFor="income" className="mr-2 text-white">Income</label>
        </div>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
            Add Transaction
        </button>
    </form>

    {profilePhoto && (
        <div className="mt-4 flex items-center justify-center">
            {/* <img
                src={profilePhoto}
                alt="NoProfile"
                className="rounded-full h-12 w-12 object-cover mr-2"
            /> */}
            <button
                onClick={signUserOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded items-center justify-center"
            >
                Sign Out
            </button>
        </div>
    )}

    <div className="transactions mt-8">
        <h2 className="text-xl font-bold mb-4 text-white">Transactions</h2>
        <ul>
            {transactions.map((transaction, index) => (
                <li key={index} className="bg-white p-4 mb-4 rounded shadow-md">
                    <h4 className="text-lg font-semibold">{transaction.description}</h4>
                    <p className={`text-${transaction.transactionType === "expense" ? "red" : "green"}-600`}>
                        ₹ {transaction.transactionAmount} ==
                        <label>{transaction.transactionType.charAt(0).toUpperCase() + transaction.transactionType.slice(1)}</label>
                    </p>
                </li>
            ))}
        </ul>
    </div>
</div>
</div>
    </>) 
}