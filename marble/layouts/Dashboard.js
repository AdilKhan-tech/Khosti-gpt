"use client"
import Header from "@/components/dashboard/Header";

const Dashboard = ({children}) => {
    return <>
    <div className="bg-light">
    <Header />
    {children}
     </div>
    </>
};

export default Dashboard;