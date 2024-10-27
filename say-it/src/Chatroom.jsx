import React, { useState, useEffect } from "react";
import { db, serverTimestamp } from "./firebase";
import './App.css';
import { collection, addDoc, onSnapshot, orderBy, query, doc, updateDoc } from "firebase/firestore";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Fetch messages in real-time
    useEffect(() => {
        const chatRoomRef = collection(db, "nearbyChat", "chatRoom", "messages");
        const q = query(chatRoomRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messagesData);
        });
        return unsubscribe; // Unsubscribe on cleanup
    }, []);

    // Function to handle sending a new message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const chatRoomRef = collection(db, "nearbyChat", "chatRoom", "messages");

            await addDoc(chatRoomRef, {
                text: newMessage,
                timestamp: serverTimestamp(),
                votes: 0 // Initialize votes to 0
            });
            setNewMessage(""); // Clear input field
        }
    };

    // Function to handle upvoting a message
    const handleUpvote = async (messageId, currentVotes) => {
        const messageRef = doc(db, "nearbyChat", "chatRoom", "messages", messageId);
        await updateDoc(messageRef, {
            votes: currentVotes + 1
        });
    };

    // Function to handle downvoting a message
    const handleDownvote = async (messageId, currentVotes) => {
        const messageRef = doc(db, "nearbyChat", "chatRoom", "messages", messageId);
        await updateDoc(messageRef, {
            votes: currentVotes - 1
        });
    };

    return (
        <div>
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <p style={{ flex: 1 }}>{message.text}</p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <button onClick={() => handleUpvote(message.id, message.votes)}>👍</button>
                            <span style={{ margin: "0 5px" }}>{message.votes}</span>
                            <button onClick={() => handleDownvote(message.id, message.votes)}>👎</button>
                        </div>
                    </div>
                ))}
            </div>
            <form className="submit" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;
