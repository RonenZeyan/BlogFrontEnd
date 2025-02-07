
import { useState } from "react"
import "./header.css"
import HeaderLeft from "./HeaderLeft";
import NavBar from "./NavBar";
import HeaderRight from "./HeaderRight";
import Notifications from "../notifications/Notifcations";
import { useSelector } from "react-redux";
import Messages from "../messages/Messages";
import DarkMode from "../darkmode/DarkMode";

export default function Header() {

    const [toggle, setToggle] = useState(false);

    const { user } = useSelector(state => state.auth)

    return (
        <header className="header">
            <HeaderLeft toggle={toggle} setToggle={setToggle} />
            <NavBar toggle={toggle} setToggle={setToggle} />
            <div style={{display:"flex",gap:"15px"}}>
                <HeaderRight />
                {user && <Notifications />}
                {user && <Messages />}
                <DarkMode/>
            </div>
        </header >
    )
}