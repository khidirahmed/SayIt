import React from "react"

import { db} from "./firebase.js";
import { doc, updateDoc} from "firebase/firestore";


const Complaint = ({ messages }) => {

    const handleUpvote = async (messageId, currentVotes) => {
        const messageRef = doc(db, "nearbyChat", "chatRoom", "messages", messageId);
        await updateDoc(messageRef, {
            votes: currentVotes + 1
        });
    };

    // Function to handle downvoting a message
    const handleDownvote = async (messageId, currentVotes) => {
        const messageRef = doc(db, "nearbyChat", "chxatRoom", "messages", messageId);
        await updateDoc(messageRef, {
            votes: currentVotes - 1
        });
    };
    return (
        <div>
            <div className="messages">
                {messages.map((message) => (
                    message.votes >= 0 ? (
                    <div key={message.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <p style={{ flex: 1 }}>{message.text}</p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                        <button onClick={() => handleUpvote(message.id, message.votes)}>👍</button>
                            <span style={{ margin: "0 5px" }}>{message.votes}</span>
                            <button onClick={() => handleDownvote(message.id, message.votes)}>👎</button>
                        </div>
                    </div>) :
                    <></>
                ))}
            </div>
        </div>
    );
};

export default Complaint;