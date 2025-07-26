import { useState, useEffect, useRef } from 'react';
import { getValue } from '../Survey/Survey';
import './Results.css';
import backgroundVideo from '../Assets/Background_Video.mp4';
import SageIntro from './Audios/SageIntro.wav';
import ReformerIntro from './Audios/ReformerIntro.wav';
import CreatorIntro from './Audios/CreatorIntro.wav';
import HealerIntro from './Audios/HealerIntro.wav';
import CompanionIntro from './Audios/CompanionIntro.wav';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';


function Results() {
  const audioRef = useRef(null);
  const mentor = getValue();
  const [fadeOut, setFadeOut] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [prompt, setPrompt] = useState("");

  const mentorIntros = {
    Sage: "In the stillness of your soul, you’ve searched for answers beyond the visible. Your quiet strength lies in reflection, depth, and timeless wisdom. Welcome, seeker of truth — The Sage walks with you now.",
    Reformer: "You carry a fire that questions, challenges, and dares to change the course of things. Growth is not a phase for you — it's a purpose. Your mentor is The Reformer — bold, relentless, and transformative.",
    Creator: "Your spirit dances with ideas, sketches dreams, and finds beauty in silence. The world is your canvas, and your thoughts are colors waiting to unfold. The Creator within you now meets their guide.",
    Healer: "You feel deeply, notice the invisible wounds in others, and respond with compassion. Emotions are not your weakness — they’re your compass. The Healer recognizes your gift and steps in beside you.",
    Companion: "Sometimes, we don’t need direction — just presence. You’ve stood in many shades of thought, quietly observing, never fully swaying. In this journey, The Companion walks beside you — not to lead, but to understand."
  };

  const mentorMap = {
    reformer: { name: "The Reformer", intro: mentorIntros.Reformer, audio: ReformerIntro },
    creator: { name: "The Creator", intro: mentorIntros.Creator, audio: CreatorIntro },
    sage: { name: "The Sage", intro: mentorIntros.Sage, audio: SageIntro },
    healer: { name: "The Healer", intro: mentorIntros.Healer, audio: HealerIntro },
    companion: { name: "The Companion", intro: mentorIntros.Companion, audio: CompanionIntro }
  };

  const mentorData = mentorMap[mentor];

  useEffect(() => {
  const audioEl = audioRef.current;

  if (audioEl) {
    const tryPlay = () => {
      audioEl.play()
        .then(() => setPulse(true))
        .catch(() => console.warn("Autoplay failed. User interaction required."));
    };

    tryPlay();

    const handleAudioEnd = () => {
      setFadeOut(true);
      setPulse(false);
    };

    audioEl.addEventListener('ended', handleAudioEnd);
    audioEl.addEventListener('canplaythrough', tryPlay); 

    return () => {
      audioEl.removeEventListener('ended', handleAudioEnd);
      audioEl.removeEventListener('canplaythrough', tryPlay);
    };
  }
}, []);


  const handleAnimationEnd = () => {
    if (fadeOut) setShowDiv(false);
  };

  async function handleSendPrompt() {
  if (prompt.trim() === "") {
    alert("Please enter a prompt");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/voiceControl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, mentor }),
    });


    const { audioFile } = await response.json();
    console.log("Audio file received:", audioFile);
    const audio = new Audio(audioFile);
    audio.play();
    setPulse(true);

    audio.addEventListener("ended", () => {
      setPulse(false);
      document.querySelector(".UserQuestions").value = "";
      setPrompt("");

    });

  } catch (err) {
    alert("Voice generation failed.");
    console.error(err);
  }
}


  return (
    <div className="results">
         <video className="bg-video" src={backgroundVideo} autoPlay loop muted />
      <div className={`circle ${pulse ? 'pulse' : ''} 
      ${mentor === 'sage' ? 'violet': ''}
      ${mentor === 'reformer' ? 'red': ''}
      ${mentor === 'creator' ? 'white': ''}
      ${mentor === 'healer' ? 'blue': ''}
      ${mentor === 'companion' ? 'red-pink': ''}`}></div>

      {mentorData && (
        <>
          {showDiv ? (
            <div className={`MentorBar ${fadeOut ? 'fade-out' : ''}`} onAnimationEnd={handleAnimationEnd}>
              <div className="Head">Your Mentor is "{mentorData.name}"</div>
              <div className="DescMent">{mentorData.intro}</div>
              <audio ref={audioRef} src={mentorData.audio}></audio>
            </div>
          ) : (
            <div className="PromptBar fade-in">
              <input type='text' className='UserQuestions'value={prompt} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendPrompt();
                }
              }} onChange={(e) => setPrompt(e.target.value)} placeholder='Your Prompt' />
              <SendIcon className='SendIcon' onClick = {handleSendPrompt} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Results;
