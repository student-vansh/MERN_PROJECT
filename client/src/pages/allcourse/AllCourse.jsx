import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const icons = {
  
  bpharm: (
    <svg
      viewBox="0 0 48 48"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="48" height="48" rx="12" className="fill-primary/10" />
      <path
        d="M24 14v6m-3-3h6M18 22h12v14H18V22zm6 4v6"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="32" r="2" className="fill-primary" />
    </svg>
  ),
  btech: (
    <svg
      viewBox="0 0 48 48"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="48" height="48" rx="12" className="fill-primary/10" />
      <path
        d="M16 28l8-14 8 14M20 26h8"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="32" r="2" className="fill-primary" />
    </svg>
  ),
  bba: (
    <svg
      viewBox="0 0 48 48"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="48" height="48" rx="12" className="fill-primary/10" />
      <path
        d="M16 20h16v14H16V20zm4-4h8v4h-8v-4z"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 26h8M20 30h5"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  bca: (
    <svg
      viewBox="0 0 48 48"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="48" height="48" rx="12" className="fill-primary/10" />
      <rect
        x="14"
        y="16"
        width="20"
        height="14"
        rx="2"
        className="stroke-primary"
        strokeWidth="2"
      />
      <path
        d="M18 24h4m4 0h4M24 18v12"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  mca: (
    <svg
      viewBox="0 0 48 48"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="48" height="48" rx="12" className="fill-primary/10" />
      <path
        d="M16 30l8-16 8 16M20 26h8"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="14" r="3" className="fill-primary" />
    </svg>
  ),
};

const courses = [
  { key: "bpharm", label: "B.Pharm", icon: icons.bpharm },
  { key: "btech", label: "B.Tech", icon: icons.btech },
  { key: "bba", label: "BBA", icon: icons.bba },
  { key: "bca", label: "BCA", icon: icons.bca },
  { key: "mca", label: "MCA", icon: icons.mca },
];

const AllCourse = () => {
  const navigate = useNavigate();
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      <div className="flex-1 w-full box-border px-3 min-[400px]:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 sm:py-10 md:py-12 lg:py-14">
        <div className="max-w-6xl mx-auto w-full min-w-0">
           <button
              type="button"
              onClick={() => navigate("/home")}
              className="mb-4 text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              ← Back to home
            </button>
          <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-[2.5rem] font-semibold text-center text-gray-900 mb-2 px-1 text-balance leading-tight">
            Question paper
          </h1>
          <p className="text-center text-xs min-[400px]:text-sm sm:text-base text-gray-500 mb-8 sm:mb-10 md:mb-12 max-w-md sm:max-w-lg mx-auto px-2 leading-relaxed">
            Choose your course to browse previous year papers
          </p>

          <div
            className="grid w-full gap-3 min-[400px]:gap-4 sm:gap-5
            grid-cols-1 min-[400px]:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5"
          >
            {courses.map(({ key, label, icon }) => (
              <button
               onClick={() => {
                    if (key === "btech") {
                      navigate("/allcourse/btech");
                    } else {
                      navigate(`/allcourse/${key}`);
                    }
                  }}
                key={key}
                type="button"
                className="group flex min-h-[120px] min-[400px]:min-h-0 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 min-[400px]:p-4 sm:p-5 shadow-sm transition-all duration-300 active:scale-[0.98] hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 sm:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full"
              >
                <div className="w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 sm:w-16 sm:h-16 mb-2.5 sm:mb-3 shrink-0 overflow-hidden rounded-xl">
                  {icon}
                </div>
                <span className="text-sm min-[400px]:text-base font-medium text-gray-800 group-hover:text-primary transition-colors text-center leading-snug">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
     <Footer></Footer>
     </>
  );
};
export default AllCourse;
