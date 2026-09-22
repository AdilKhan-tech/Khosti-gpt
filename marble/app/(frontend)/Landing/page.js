import React from 'react'
import Landing from "@/components/frontend/home/Landing";
import Occasion from "@/components/frontend/home/Occasions";
import Moregift from "@/components/frontend/home/Moregift";
function Page() {
  return (
    <main>
        <Landing />

        <Occasion />
        <Moregift />
        <a href="https://wa.me/+966594064708" className="whatsapp-chat" target="_blank">
            <img style={{ width: "60px" }} src="/assets/images/whatsapp_chat.png"/>
          </a>
    </main>
  )
}

export default Page