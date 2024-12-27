import Image from "next/image";

import WelcomeSection from "./welcome_section";
import PhotoSlider from "./photoslider";
import AnswerKeySubmission from "./answerkey";
import ExamReview from "./exam_review";

export default function Home() {
  return (
   <>
    <WelcomeSection />
    <PhotoSlider />
    <AnswerKeySubmission />
    <ExamReview />
   
   </>
  );
}
