import { useRef } from 'react';

const Start = ({ setUsername }) => {
  const nameInputRef = useRef();

  const handleGetUserAndStart = () => {
    nameInputRef.current.value && 
    nameInputRef.current.value.length >= 5 &&
    setUsername(nameInputRef.current.value);
  };

  return (
    <div className="startContainer">
      <p className='startTitle'>Type atleast 5 Letters</p>
      <input 
        type="text"
        ref={ nameInputRef }
        className="nameInput" 
        placeholder="Enter Your Name..." 
      />
      <button
        onClick={ handleGetUserAndStart }
        className="startBtn">Start</button>
    </div>
  );
};

export default Start;