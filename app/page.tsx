import Image from "next/image";

import WelcomeSection from "./welcome_section";
import PhotoSlider from "./photoslider";
import AnswerKeySection from "./answerkey";
import ExamReviewSection from "./exam_review";
import VideoSection from "./videosection";


export default function Home() {
  return (
   <>
    <WelcomeSection />
    <PhotoSlider />
    <AnswerKeySection />
    <ExamReviewSection />
    <VideoSection />
  
   </>
  );
}
