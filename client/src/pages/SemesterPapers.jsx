import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { qpBtechBranch } from "../lib/questionPaperPaths";

const BRANCH_LABELS = {
  it: "IT",
  cse: "CSE",
  "cs-ds": "CS-DS",
  iot: "IOT",
  aiml: "AIML",
};

const SemesterPapers = () => {
  const navigate = useNavigate();
  const { branch, semesterId } = useParams();
  const branchLabel = BRANCH_LABELS[branch] ?? branch?.toUpperCase() ?? branch;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        <div className="flex-1 w-full box-border px-3 min-[400px]:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 sm:py-10 md:py-12">
          <div className="max-w-2xl mx-auto w-full min-w-0 text-center">
            <button
              type="button"
              onClick={() => navigate(qpBtechBranch(branch))}
              className="mb-6 block w-full text-left text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              ← Back to semesters
            </button>
            <h1 className="text-2xl min-[400px]:text-3xl font-semibold text-gray-900 text-balance">
              B.Tech · {branchLabel} · Semester {semesterId}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
              Subject-wise papers and notes will appear here. This section is
              ready for your content.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SemesterPapers;
