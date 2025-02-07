
import MessageDetails from "../../components/messages/messageDetails"
import "./messagepage.css"
import SideMessages from "../../components/messages/sideMessages"

export default function MessagesPage() {

    return (
        <div className="messages-container">
            <SideMessages />
            <MessageDetails />
        </div>
    )
}