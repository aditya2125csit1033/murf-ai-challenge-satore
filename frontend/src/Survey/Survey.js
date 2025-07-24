// import React, { useState, useEffect } from 'react';
import backgroundVideo from '../Assets/BUILD_AVG_RES.mp4';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Survey.css';
import { useNavigate } from 'react-router-dom';


let mentor = "";

export function getValue() {
return mentor;
}

function Survey() {
  
  const Navigate = useNavigate();
  

  const ques = [
  "I actively seek meaning in life or the universe.",
  "I often reflect on my past and regret missed opportunities.",
  "I feel strongly motivated to grow and improve myself.",
  "I am naturally drawn to helping or understanding others.",
  "I find comfort in silence and solitude.",
  "I frequently feel restless, anxious, or emotionally overwhelmed.",
  "I feel deeply connected to a higher power, nature, or inner voice.",
  "I rely more on emotion than logic when making decisions.",
  "I regularly engage in creative activities like writing, music, or art.",
  "I am willing to challenge traditional paths and societal norms."
];


  const [responses, setResponses] = useState({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState("");
  function handleOptionChange(event) {
    const { name, value } = event.target;

    setResponses((prev) => ({
      ...prev,
      [name]: value
    }));
    setCurrentResponse(value);

  }


  const priorityList = {
    q1: "reformer",
    q2: "reformer",
    q3: "creative",
    q4: "creative",
    q5: "spiritual",
    q6: "spiritual",
    q7: "emotional:",
    q8: "emotional",
    q9: "emotional",
    q10: "emotional"    
  };


  const CategoryList = {
  reformer: ["q1", "q2"],         
  creative: ["q2", "q4", "q3"],          
  spiritual: ["q4","q5", "q6"],         
  emotional: ["q7", "q8", "q9", "q10"]    
  };
  
  
  const Positives = {
  reformer: 0,         
  creative: 0,          
  spiritual: 0,         
  emotional: 0    
  };
  

  const options = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly disagree"
  ]

  function handleNext(event) {
    event.preventDefault();
    if(currentResponse === ""){
      alert("Please select an option");
      return; 
    }

    setCurrentQIndex((prev) => prev + 1);
    setCurrentResponse("");
  }
 

  function handlePrevious(event){
    event.preventDefault();
    if (currentQIndex === 0){
      alert("You can't got back!");
      return;
    }else{

      setCurrentQIndex((prev) => prev - 1);
      setCurrentResponse("");
    }
    
  }

  function handleSubmit(event) {
  event.preventDefault();
  console.log(responses);
  
  for (let [q, value] of Object.entries(responses)) {
    if (["Strongly Agree", "Agree"].includes(value)) {

      if (CategoryList["reformer"].includes(q)) {
        if (priorityList[q] === "reformer" || priorityList[q] === 0) {
          Positives["reformer"] += value === "Strongly Agree" ? 2 : 1;
        }
      }

      if (CategoryList["creative"].includes(q)) {
        if (priorityList[q] === "creative" || priorityList[q] === 0) {
          Positives["creative"] += value === "Strongly Agree" ? 2 : 1;
        }
      }

      if (CategoryList["spiritual"].includes(q)) {
        if (priorityList[q] === "spiritual" || priorityList[q] === 0) {
          Positives["spiritual"] += value === "Strongly Agree" ? 2 : 1;
        }
      }

      if (CategoryList["emotional"].includes(q)) {
        if (priorityList[q] === "emotional" || priorityList[q] === 0) {
          Positives["emotional"] += value === "Strongly Agree" ? 2 : 1;
        }
      }
    }
  }

  if (
    Positives["reformer"] === 0 &&
    Positives["creative"] === 0 &&
    Positives["spiritual"] === 0 &&
    Positives["emotional"] === 0
  ) {
    console.log("companion");

    mentor = "companion";
  }else{
    if(Positives["reformer"] > Positives["creative"] && Positives["reformer"] > Positives["spiritual"] && Positives["reformer"] > Positives["emotional"]){
      console.log("reformer")
      mentor = "reformer";
    }else if(Positives["creative"] > Positives["reformer"] && Positives["creative"] > Positives["spiritual"] && Positives["creative"] > Positives["emotional"]){
      console.log("creator")
      mentor = "creator";
    }else if(Positives["spiritual"] > Positives["reformer"] && Positives["spiritual"] > Positives["creative"] && Positives["spiritual"] > Positives["emotional"]){
      console.log("sage");
      mentor = "sage";
    }else{
      console.log("emotional");
      mentor = "healer";
    }

    
  }
  Navigate('/Results');
  
  // export {mentor};

  

}

let vid = document.querySelector(".bg-video");
vid.playbackRate = 2;




  return (
    <div className="Survey">
      <div className="SurveyContainer">
        <video className="bg-video" src={backgroundVideo} autoPlay loop muted />
        <div className="Left">
          <p className="heading">
            PSYCHO<strong>METRIC</strong> <br /> <strong>SIGN</strong>ATURE
          </p>

          <p className='description'>
            <strong>Psychometric Signature</strong> is your unique personality blueprint — a reflection of your thoughts, emotions, and behavioral patterns.
            It reveals how you think, what drives you, and how you relate to the world around you.
            Through subtle patterns uncovered in your answers, we decode the core of who you are — not just labels, but the essence that shapes your journey.
            Discover your signature, and let the right mentor find you.
          </p>
        </div>

        <div className="Right">
          <form action="submit" className='Psychometric'>
            <div className='QuestionBlock' key={`q${currentQIndex}`}>
              <label className='QuesLabel'>{ques[currentQIndex]}</label>
            </div>

            <div>
              
                 {options.map((opt, oIndex) => (
                <label key={`q${currentQIndex}-o${oIndex}`}>
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

            {currentQIndex < ques.length - 1 ? (
              <div className='Buts' >
                <div><button className="Prev toggleButtons" onClick={handlePrevious}>Previous</button></div>
                <div><button className="toggleButtons" onClick={handleNext}>Next</button></div>
              </div>
            ) : (
              <div className='Buts'><button className="Prev toggleButtons" onClick={handlePrevious}>Previous</button><button className="toggleButtons" onClick={handleSubmit}>Submit</button></div>
            )}

          </form>

        </div>

      </div>
    </div>



  );
}

export default Survey;
