import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { QUESTION_PAPER_ROOT } from "../lib/questionPaperPaths";

const LABELS = {
  bpharm: "B.Pharm",
  bba: "BBA",
  bca: "BCA",
  mca: "MCA",
};

const QuestionPaperOtherCourse = () => {
  const navigate = useNavigate();
  const { course } = useParams();
  const title = LABELS[course] ?? course?.toUpperCase() ?? "Course";

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        <div className="flex-1 w-full box-border px-3 min-[400px]:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 sm:py-10 md:py-12 lg:py-14">
          <div className="max-w-lg mx-auto w-full min-w-0 text-center">
            <button
              type="button"
              onClick={() => navigate(QUESTION_PAPER_ROOT)}
              className="mb-6 block w-full text-left text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              ← Back to question papers
            </button>
            <h1 className="text-2xl min-[400px]:text-3xl font-semibold text-gray-900 text-balance">
              {title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
              Branch and semester papers for this course will be added soon.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionPaperOtherCourse;
