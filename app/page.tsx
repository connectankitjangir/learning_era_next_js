

import WelcomeSection from "./welcome_section";
import PhotoSlider from "./photoslider";
import AnswerKeySection from "./answerkey";
import ExamReviewSection from "./exam_review";
import VideoSection from "./videosection";
import SSCResult from "./ssc_result";

export default function Home() {
  return (
   <>
    <WelcomeSection />
    <SSCResult />
    <PhotoSlider />
    <AnswerKeySection />
    <ExamReviewSection />
    <VideoSection />
  
   </>
  );
}
