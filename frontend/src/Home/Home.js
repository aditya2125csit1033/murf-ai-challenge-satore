import { useState, useEffect} from 'react';
import './Home.css';
import backgroundVideo from '../Assets/BUILD_AVG_RES.mp4';
import { useNavigate } from 'react-router-dom';


const SENTENCE =
  "Step into Satorē — a serene space designed to awaken your inner self. Through gentle reflection and meaningful conversation, Satorē helps you uncover your true interests, understand your personality, and connect with a mentor who speaks to your journey. Begin your path to clarity, growth, and mindful living — one question at a time.";

const TYPING_SPEED_MS = 30;
const DELETING_SPEED_MS = 20;
const PAUSE_BEFORE_DELETE_MS = 12000;
const PAUSE_AFTER_DELETE_MS = 2000;

function Home() {
  const [overview, setOverview] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausedAfterDelete, setIsPausedAfterDelete] = useState(false); // New state for 2s pause
  // By convention, variables should start with a lowercase letter.
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (isPausedAfterDelete) {
      timer = setTimeout(() => {
        setIsPausedAfterDelete(false);
        setIsDeleting(false);
        setIndex(0);
      }, PAUSE_AFTER_DELETE_MS);
    } else if (!isDeleting && index < SENTENCE.length) {
      // Typing logic
      timer = setTimeout(() => {
        setOverview((prev) => prev + SENTENCE[index]);
        setIndex((prev) => prev + 1);
      }, TYPING_SPEED_MS);
    } else if (!isDeleting && index === SENTENCE.length) {
      // Pause before starting to delete
      timer = setTimeout(() => {
        setIsDeleting(true);
        // The setIndex call here was redundant and has been removed for clarity.
        // The next effect run will handle the index decrement correctly.
      }, PAUSE_BEFORE_DELETE_MS);
    } else if (isDeleting && index >= 0) {
      // Deleting logic
      timer = setTimeout(() => {
        setOverview((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, DELETING_SPEED_MS);
    } else if (isDeleting && index < 0) {
      // Done deleting → wait 2s before restarting
      setIsPausedAfterDelete(true);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, isPausedAfterDelete]);

  const handleBeginClick = () =>{
     navigate('/Survey');
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
