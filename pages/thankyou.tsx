import exp from "constants";
import { useEffect } from "react";

export const ThankYouPage = () => {
    useEffect(()=>{
        localStorage.removeItem("shoppingCart")
    },[])
    // thank you for your purchase
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
            <p className="text-lg mt-4">You will receive an text confirmation shortly.</p>
        </div>
    );
}

export default ThankYouPage;