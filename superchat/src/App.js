import logo from './logo.svg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyCGpq4HSTkZ-ANlsSEj21mQXw66DDvBPrU",
  authDomain: "super-chat-a5c8d.firebaseapp.com",
  projectId: "super-chat-a5c8d",
  storageBucket: "super-chat-a5c8d.appspot.com",
  messagingSenderId: "956804054697",
  appId: "1:956804054697:web:74fb7133213002c4d333b8",
  measurementId: "G-MZG9R3ZVE8"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>Super Chat</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy =useRef()
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const[formValue,setFormValue]=useState('');
  const sendMessage =async(e)=>{
    e.preventDefault();
    const{uid,photoURL}=auth.currentUser;
    await messageRef.add({
      text:formValue,
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('');
    dummy.current.scrollIntoView({behaviour:'smooth'});

  }

  return (
    <>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      <div ref={dummy}></div>
    </main>
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>
      <button type='submit'>send</button>
    </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid ,photoURL} = props.message;
  const messageClass =uid===auth.currentUser.uid ? 'send' : 'received';
  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  ) 
    
}

export default App;
