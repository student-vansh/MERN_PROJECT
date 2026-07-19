import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

const BRANCH_LABELS = {
  it: "IT",
  cse: "CSE",
  "cs-ds": "CS-DS",
  iot: "IOT",
  aiml: "AIML",
};

const SEMESTERS = Array.from({ length: 8 }, (_, i) => ({
  num: i + 1,
  label: `Semester ${i + 1}`,
}));

const SemesterIcon = ({ n }) => (
  <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center">
    <span className="text-base min-[400px]:text-lg font-bold text-primary tabular-nums">
      {n}
    </span>
  </div>
);

const Semester = () => {
  const navigate = useNavigate();
  const { branch } = useParams();
  const branchLabel =
    (branch && BRANCH_LABELS[branch]) ?? branch?.toUpperCase() ?? "Branch";


  return (
    <>
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        <div className="flex-1 w-full box-border px-3 min-[400px]:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 sm:py-10 md:py-12 lg:py-14">
          <div className="max-w-6xl mx-auto w-full min-w-0">
            <button
              type="button"
              onClick={() => navigate("/questionpaper/btech-branch")}
              className="mb-4 text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              ← Back to branches
            </button>

            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-[2.5rem] font-semibold text-center text-gray-900 mb-2 px-1 text-balance leading-tight">
              Select semester
            </h1>
            <p className="text-center text-xs min-[400px]:text-sm sm:text-base text-gray-500 mb-2 max-w-lg mx-auto px-2">
              B.Tech · <span className="font-medium text-gray-700">{branchLabel}</span>
            </p>
            <p className="text-center text-xs min-[400px]:text-sm text-gray-500 mb-8 sm:mb-10 md:mb-12 max-w-md sm:max-w-lg mx-auto px-2 leading-relaxed">
              Choose a semester to view notes and question papers
            </p>

           

            <div
              className="grid w-full gap-3 min-[400px]:gap-4 sm:gap-5
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4"
            >
              {SEMESTERS.map(({ num, label }) => (
                <button
                  key={num}
                  type="button"
                  onClick={() =>
                    navigate(`/questionpaper/btech-branch/${branch}/semesters/${num}`)
                  }
                  className="group flex min-h-[100px] min-[400px]:min-h-[110px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 min-[400px]:p-4 sm:p-5 shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:shadow-sm enabled:active:scale-[0.98] enabled:hover:border-primary/40 enabled:hover:shadow-md enabled:hover:shadow-primary/10 sm:enabled:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full"
                >
                  <div className="w-11 h-11 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 mb-2 sm:mb-2.5 shrink-0 overflow-hidden rounded-xl">
                    <SemesterIcon n={num} />
                  </div>
                  <span className="text-xs min-[400px]:text-sm sm:text-base font-medium text-center leading-snug text-gray-800 group-hover:text-primary transition-colors">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>




          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Semester;
