import './App.css';
import ChatRoom from './Chatroom';
import headerImage from './IMG_0390.jpg'

function App() {

  return (
    <div className="App" style={{ textAlign: 'center', padding: '50px' }}>
      <img src={headerImage} alt="Header"
      style ={{ width: '65px', height: '85px' }}/>
      <header className="App-header">
      <h1>Say It!</h1>
      <div class="button-container">
        <button className="button">
          Have a complaint?
        </button>
        <button className="button">
          What kind of Complaint?
        </button>
      </div>
        <ChatRoom/>
      </header>
    </div>
  );
}

export default App;
