import { useState, useEffect } from 'react';
import backgroundVideo from '../Assets/BUILD_AVG_RES.mp4';
import './Survey.css';
import { useNavigate } from 'react-router-dom';

let mentor = "";
export function getValue() {
  return mentor;
}

function Survey() {
  const navigate = useNavigate();

  const ques = [
    "I am willing to challenge traditional paths and societal norms.",
    "I feel strongly motivated to grow and improve myself.",
    "I regularly engage in creative activities like writing, music, or art.",
    "I find comfort in silence and solitude.",
    "I actively seek meaning in life or the universe.",
    "I feel deeply connected to a higher power, nature, or inner voice.",
    "I am naturally drawn to helping or understanding others.",
    "I rely more on emotion than logic when making decisions.",
    "I often reflect on my past and regret missed opportunities.",
    "I frequently feel restless, anxious, or emotionally overwhelmed.",
  ];

  const [responses, setResponses] = useState({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState("");

  useEffect(() => {
    const vid = document.querySelector(".bg-video");
    if (vid) vid.playbackRate = 2;
  }, []);

  const options = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly disagree"
  ];

  const categoryMap = {
    q1: "reformer",
    q2: "reformer",
    q3: "creative",
    q4: "creative",
    q5: "spiritual",
    q6: "spiritual",
    q7: "emotional",
    q8: "emotional",
    q9: "emotional",
    q10: "emotional"
  };

  const scores = {
    reformer: 0,
    creative: 0,
    spiritual: 0,
    emotional: 0
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setResponses((prev) => ({
      ...prev,
      [name]: value
    }));
    setCurrentResponse(value);
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (!currentResponse) {
      alert("Please select an option");
      return;
    }
    setCurrentQIndex((prev) => prev + 1);
    setCurrentResponse("");
  };

  const handlePrevious = (event) => {
    event.preventDefault();
    if (currentQIndex === 0) {
      alert("You can't go back!");
      return;
    }
    setCurrentQIndex((prev) => prev - 1);
    setCurrentResponse(responses[`q${currentQIndex}`] || "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Object.entries(responses).forEach(([q, value]) => {
      if (["Strongly Agree", "Agree"].includes(value)) {
        const cat = categoryMap[q];
        if (cat) scores[cat] += value === "Strongly Agree" ? 2 : 1;
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const topCategory = Object.keys(scores).find(
      (key) => scores[key] === maxScore
    );

    mentor = maxScore === 0 ? "companion" : topCategory === "spiritual" ? "sage" : topCategory === "creative" ? "creator" : topCategory === "emotional" ? "healer" : "reformer";

    navigate('/Results');
  };

  return (
    <div className="Survey">
      <div className="SurveyContainer">
        <video className="bg-video" src={backgroundVideo} autoPlay loop muted />

        <div className="Left">
          <p className="heading">
            PSYCHO<strong>METRIC</strong><br /><strong>SIGN</strong>ATURE
          </p>
          <p className='description'>
            <strong>Psychometric Signature</strong> is your unique personality blueprint — a reflection of your thoughts, emotions, and behavioral patterns.
            It reveals how you think, what drives you, and how you relate to the world around you. Discover your signature, and let the right mentor find you.
          </p>
        </div>

        <div className="Right">
          <form className='Psychometric'>
            <div className='QuestionBlock'>
              <label className='QuesLabel'>{ques[currentQIndex]}</label>
            </div>

            <div>
              {options.map((opt, index) => (
                <label key={`q${currentQIndex}-o${index}`}>
                  <input
                    className='Opts'
                    value={opt}
                    type='radio'
                    name={`q${currentQIndex + 1}`}
                    checked={responses[`q${currentQIndex + 1}`] === opt}
                    onChange={handleOptionChange}
                  />
                  {opt}
                  <br />
                </label>
              ))}
            </div>

            <div className='Buts'>
              {currentQIndex > 0 && (
                <button className="toggleButtons" onClick={handlePrevious}>Previous</button>
              )}
              {currentQIndex < ques.length - 1 ? (
                <button className="toggleButtons" onClick={handleNext}>Next</button>
              ) : (
                <button className="toggleButtons" onClick={handleSubmit}>Submit</button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Survey;
