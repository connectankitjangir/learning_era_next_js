const ExamReviewPage = () => {
  return (
    <div className="m-6 py-6 bg-white text-black rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Exam Review Section</h2>
      <p className="text-lg">Welcome to the exam review page. Here you can find resources and links to help you prepare for your exams.</p>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">Helpful Resources</h3>
        <ul className="list-disc list-inside">
          <li>
            <a href="https://www.example.com/resource1" className="text-blue-500 hover:underline">Resource 1</a>
          </li>
          <li>
            <a href="https://www.example.com/resource2" className="text-blue-500 hover:underline">Resource 2</a>
          </li>
          <li>
            <a href="https://www.example.com/resource3" className="text-blue-500 hover:underline">Resource 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExamReviewPage;
