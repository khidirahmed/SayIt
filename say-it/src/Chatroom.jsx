import React, { useState, useEffect } from "react";
import { db, serverTimestamp } from "./firebase";
import './App.css';
import Complaint from "./complaint";
import BluetoothProx from "./Bluetoothprox";  // Import BluetoothProx
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

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
        return unsubscribe;
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const chatRoomRef = collection(db, "nearbyChat", "chatRoom", "messages");

            await addDoc(chatRoomRef, {
                text: newMessage,
                timestamp: serverTimestamp(),
                votes: 0 
            });
            setNewMessage("");
        }
    };

    return (
        <div>
            <BluetoothProx />  {/* Render BluetoothProx component */}
            <Complaint messages={messages} />
            <form className="submit" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Sendss</button>
                
            </form>
        </div>
    );
};
export default ChatRoom;