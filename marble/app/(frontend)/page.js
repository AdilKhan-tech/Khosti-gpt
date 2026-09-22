"use client"
import Home  from "../../components/frontend/home/Landing";
import Occassions from "../../components/frontend/home/Occasions"
import MoreGift from "../../components/frontend/home/Moregift"



export default function Page() {
  return (
    <main className="">
      {/* <Header/> */}
      <Home/>
      <Occassions />
      <MoreGift/>
      {/* <Footer/> */}
    </main>
  );
}