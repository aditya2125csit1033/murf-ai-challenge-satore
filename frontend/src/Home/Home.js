import React, { useState, useEffect } from 'react';
import './Home.css';
import backgroundVideo from '../Assets/BUILD_AVG_RES.mp4';
import { useNavigate } from 'react-router-dom';

function Home() {
  const Sentence =
    "Step into Satorē — a serene space designed to awaken your inner self. Through gentle reflection and meaningful conversation, Satorē helps you uncover your true interests, understand your personality, and connect with a mentor who speaks to your journey. Begin your path to clarity, growth, and mindful living — one question at a time.";

  const [overview, setOverview] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausedAfterDelete, setIsPausedAfterDelete] = useState(false); // New state for 2s pause

  useEffect(() => {
    let timer;

    if (isPausedAfterDelete) {
      timer = setTimeout(() => {
        setIsPausedAfterDelete(false);  
        setIsDeleting(false);
        setIndex(0);
      }, 2000);
    }

    else if (!isDeleting && index < Sentence.length) {
      timer = setTimeout(() => {
        setOverview((prev) => prev + Sentence[index]);
        setIndex((prev) => prev + 1);
      }, 30);
    }

    else if (!isDeleting && index === Sentence.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
        setIndex((prev) => prev - 1);
      }, 12000);
    }

    else if (isDeleting && index >= 0) {
      // Deleting
      timer = setTimeout(() => {
        setOverview((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, 20);
    }

    else if (isDeleting && index < 0) {
      // Done deleting → wait 2s before restarting
      setIsPausedAfterDelete(true);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, isPausedAfterDelete]);
  
  const Navigate = useNavigate();

  const handleBeginClick = () =>{
     Navigate('/Survey');
  }

  return (
    <div className="Home">
      <video className="bg-video" src={backgroundVideo} autoPlay loop muted />

      <p className='Name'>Sat<strong>or</strong>ē</p>
      <button className='BeginButton' onClick={handleBeginClick}>Begin Satorē</button>

      <div className='Overview'>
        {overview}
        <span className="blinking-cursor">|</span>
      </div>
    </div>
  );
}

export default Home;
