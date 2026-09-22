"use client"
import React from "react"
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";

const FrontEnd = ({children}) => {
    return <>
    <Header />
    {children}
     <Footer />
    </>
};

export default FrontEnd;