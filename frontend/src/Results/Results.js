import {getValue} from '../Survey/Survey';
import './Results.css';
import SageIntro from './Audios/SageIntro.wav';
import ReformerIntro from './Audios/ReformerIntro.wav';
import CreatorIntro from './Audios/CreatorIntro.wav';
import HealerIntro from './Audios/HealerIntro.wav';
import CompanionIntro from './Audios/CompanionIntro.wav';

function Results(){
    let reformer = false;
    let creator = false;
    let sage = false;
    let healer = false;
    let companion = false;

    const mentor = getValue();
   if(mentor === "reformer"){
        reformer = true;
    }else if(mentor === "creator"){
        creator = true;
    }else if(mentor === "sage"){
        sage = true;
    }else if(mentor === "healer"){
        healer = true;
    }else if(mentor === "companion"){
        companion = true;
    }

const mentorIntros = {
  Sage: "In the stillness of your soul, you’ve searched for answers beyond the visible. Your quiet strength lies in reflection, depth, and timeless wisdom. Welcome, seeker of truth — The Sage walks with you now.",

  Reformer: "You carry a fire that questions, challenges, and dares to change the course of things. Growth is not a phase for you — it's a purpose. Your mentor is The Reformer — bold, relentless, and transformative.",

  Creator: "Your spirit dances with ideas, sketches dreams, and finds beauty in silence. The world is your canvas, and your thoughts are colors waiting to unfold. The Creator within you now meets their guide.",

  Healer: "You feel deeply, notice the invisible wounds in others, and respond with compassion. Emotions are not your weakness — they’re your compass. The Healer recognizes your gift and steps in beside you.",

  Companion: "Sometimes, we don’t need direction — just presence. You’ve stood in many shades of thought, quietly observing, never fully swaying. In this journey, The Companion walks beside you — not to lead, but to understand."
};




    return (
        <div className="results">
              <div className="circle"></div>
              {reformer && <><div className="Head">Your Mentor is "The Reformer"</div><div className='DescMent'>{mentorIntros.Reformer}</div></>
              }
              {creator && <><div className="Head">Your Mentor is "The Creator"</div><div className='DescMent'>{mentorIntros.Creator}</div></>}
              {sage && <><div className="Head">Your Mentor is "The Sage"</div><div className='DescMent'>{mentorIntros.Sage}</div></>}
              {healer && <><div className="Head">Your Mentor is "The Healer"</div><div className='DescMent'>{mentorIntros.Healer}</div></>}
              {companion && <><div className="Head">Your Mentor is "The Companion"</div><div className='DescMent'>{mentorIntros.Companion}</div></>}


               {reformer && <div> <audio src={ReformerIntro}></audio></div>}
               {creator && <div> <audio src={CreatorIntro}></audio></div>}
               {sage && <div> <audio src={SageIntro}></audio></div>}
               {healer && <div> <audio src={HealerIntro}></audio></div>}
               {companion && <div> <audio src={CompanionIntro}></audio></div>}

        </div>
      );
}

export default Results;