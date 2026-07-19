import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api/api";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import ReactMarkdown from "react-markdown";
import Mermaid from "../components/Mermaid";

const Toggle = ({ label, checked, onChange }) => (
  <label className="group flex items-center justify-between gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-primary/40 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-zinc-100">{label}</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        checked ? "bg-primary" : "bg-zinc-600"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </label>
);

 const markDownComponent = {
      h1: ({children})=>(
        <h1 className="text-2xl font-bold text-indigo-700 mt-6 mb-4 border-b pb-2">
          {children}
        </h1>
      ),
      h2:({children})=>(
        <h2 className="text-xl font-semibold text-indigo-600 mt-5 mb-3">
          {children}
        </h2>
      ),
      h3:({children})=>(
        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
          {children}
        </h3>
      ),
      p:({children})=>(
        <p className=" text-gray-700 leading-relaxed mb-3">
          {children}
        </p>
      ),
      ul:({children})=>(
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          {children}
        </ul>
      ),
      li:({children})=>(
        <li className="marker:text-indigo-500">
          {children}
        </li>
      ),
   }

const Prompt = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagrams, setIncludeDiagrams] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);
  /* ---------------------------------------------------------- */
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [quickrevision,setquickrevision] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a topic to generate notes.");
      return;
    }

    setLoading(true);
    setError("");
    setNotes(null);

    try {
      const res = await axios.post(
        apiUrl("/notes/generate-notes"),
        {
          topic,
          classLevel,
          examType,
          revisionMode,
          includeDiagrams,
          includeCharts,
        },
        { withCredentials: true },
      );

      console.log(res.data);

      const generatedNotes = res.data.notes;

      setNotes(generatedNotes);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate notes. Please try again.",
      );
    } finally {
      setLoading(false); // IMPORTANT
    }
  };

  const handleCopy = async () => {
    if (!notes) return;

    try {
      await navigator.clipboard.writeText(notes.notes);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy to clipboard.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* <Navbar /> */}

        <main className="px-4 sm:px-8 md:px-12 py-8 pb-16">
          <div className="w-full max-w-[1400px] mx-auto ">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("/home")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
              >
                <span>Back to home</span>
              </button>

              <button
                onClick={() => navigate("/my-downloads")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
              >
                <span>Your Notes</span>
              </button>
            </div>
            <div className="text-center mb-10 mt-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                <img
                  src={assets.robotAi}
                  alt=""
                  className="w-4 h-4 rounded object-cover"
                />
                AI-Powered
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Generate Study Notes
              </h1>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                Enter your topic and preferences — get tailored notes for your
                class and exam in seconds.
              </p>
            </div>

            <div className="flex flex-col items-center gap-8">
              {/* Centered Form */}
              <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-black/20 hover:border-zinc-700/80 transition-colors duration-300">
                <h2 className="text-lg font-semibold text-white mb-6 text-center">
                  AI Notes
                </h2>

                <form
                  id="noteForm"
                  onSubmit={handleGenerate}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-zinc-300 mb-2"
                    >
                      Topic <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="topic"
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Operating Systems, Photosynthesis"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="classLevel"
                      className="block text-sm font-medium text-zinc-300 mb-2"
                    >
                      Class / Level
                    </label>
                    <input
                      id="classLevel"
                      type="text"
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      placeholder="e.g. B.Tech 3rd Year, Class 12"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="examType"
                      className="block text-sm font-medium text-zinc-300 mb-2"
                    >
                      Exam Type
                    </label>
                    <input
                      id="examType"
                      type="text"
                      value={examType}
                      onChange={(e) => setExamType(e.target.value)}
                      placeholder="e.g. CBSE,JEE, Board Exam"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3 pt-1">
                    <p className="text-sm font-medium text-zinc-300">Options</p>
                    <Toggle
                      label="Revision Mode"
                      description="Concise, exam-focused summaries"
                      checked={revisionMode}
                      onChange={setRevisionMode}
                    />
                    <Toggle
                      label="Include Diagrams"
                      description="Text-based diagrams for key concepts"
                      checked={includeDiagrams}
                      onChange={setIncludeDiagrams}
                    />
                    <Toggle
                      label="Include Charts"
                      description="Tables and comparison charts"
                      checked={includeCharts}
                      onChange={setIncludeCharts}
                    />
                  </div>

                  {error && (
                    <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
                      {error}
                    </div>
                  )}
                </form>
              </div>

              {/* Generate Button — form ke niche, center */}
              <button
                type="submit"
                form="noteForm"
                disabled={loading}
                className="w-full max-w-md py-3.5 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Notes
                    <img src={assets.arrow} alt="" className="w-3 invert" />
                  </>
                )}
              </button>

              {/* Output — notes & charts neeche */}
              {(loading || notes) && (
                <div className="w-full mx-auto rounded-2xl border border-yellow-700 bg-zinc-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-black/20 hover:border-zinc-700/80 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Generated Notes
                    </h2>
                    {notes && (
                      <button
                        onClick={handleCopy}
                        className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-primary/40 hover:text-white transition-all duration-200"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                  {/* this is the Notes show in the code in your website */}
                  <div className="rounded-xl bg-zinc-950/50 border border-zinc-800/80 p-5 sm:p-6 min-h-[400px]">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center text-zinc-500 gap-3 py-12">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                        </div>
                        <p className="text-sm">
                          Generated notes will appear here...
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col lg:flex-row gap-6 text-zinc-500 min-h-[200px] ">
                        {/* Sidebar */}
                        <div className="w-full lg:w-[350px] lg:flex-shrink-0">
                          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 space-y-6">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">📌</span>
                              <h3 className="text-lg font-semibold text-indigo-600">
                                Quick Exam View
                              </h3>
                            </div>

                            <section>
                              <p className="text-sm font-semibold text-gray-700 mb-3">
                                ⭐ Sub Topic (Priority Wise)
                              </p>

                              {Object.entries(notes.subTopics).map(
                                ([star, topics]) => (
                                  <div
                                    key={star}
                                    className="mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3"
                                  >
                                    <p className="text-sm font-semibold text-yellow-600 mb-1">
                                      {star} Priority
                                    </p>

                                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                                      {topics.map((t, i) => (
                                        <li key={i}>{t}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ),
                              )}
                            </section>
                            <section className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
                              <p className="text-sm font-semibold text-gray-700 mb-1">
                                🔥 Exam Importance
                              </p>
                              <span className="text-yellow-700 font-bold text-sm">
                                {notes.importance}
                              </span>
                              <p className="text-sm mt-2 font-semibold text-gray-700 mb-3">
                                ❓Important Questions
                              </p>
                              <div className="mb-4 rounded-lg bg-indigo-50 border border-indigo-200 p-3">
                                 <p className="text-sm font-semibold text-yellow-600 mb-2">
                                      Short Questions
                                    </p>

                                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                                      {notes.questions.short.map((t, i) => (
                                        <li key={i}>{t}</li>
                                      ))}
                                    </ul>
                              </div>



                              <div className="mb-4 rounded-lg bg-purple-50 border border-purple-200 p-3">
                                 <p className="text-sm font-semibold text-purple-700 mb-1">
                                      Long Questions
                                    </p>

                                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                                      {notes.questions.long.map((t, i) => (
                                        <li key={i}>{t}</li>
                                      ))}
                                    </ul>
                              </div>


                              <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
                                 <p className="text-sm font-semibold text-blue-700 mb-1">
                                      Diagram Question
                                    </p>

                                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                                       <li>{notes.questions.diagram}</li>
                                    </ul>
                              </div>
                            </section>
                            
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-full flex-1 rounded-2xl bg-white p-4 sm:p-6 min-w-0 ">
                          {/* rightbar */}
                           <div className="flex flex-col md:flex-row md:justify-between gap-4">
                              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                📘 Generated Notes
                              </h2>
                              <div className="flex gap-3">
                                <button onClick={()=>setquickrevision(!quickrevision)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${quickrevision ? "bg-green-700 text-white":"bg-green-100 bg-green-700 hover:bg-green-200"}`}>
                                  {quickrevision ? "Exit Revision Mode" : "Quick Revision (5 min)"}
                                </button>
                                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700">
                                  ⬇️ Download Pdf
                                </button>
                              </div>

                           </div>


                          {!quickrevision && <section>
                                  {Object.entries(notes.subTopics).map(
                                ([star, topics]) => (
                                  <div
                                    key={star}
                                    className="mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3"
                                  >
                                    <p className="text-sm font-semibold text-yellow-600 mb-1">
                                      {star} Priority
                                    </p>

                                    <ul className="list-disc ml-6 text-gray-700">
                                      {topics.map((t, i) => (
                                        <li key={i}>{t}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ),
                              )}
                           </section>}


                           {!quickrevision && <section>
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                              <ReactMarkdown components={markDownComponent}>
                                  {notes.notes}
                              </ReactMarkdown>
                            </div>
                           </section>}

                           {quickrevision && 
                              <section className="rounded-xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200 p-6">
                                <h3 className="font-bold text-green-700 mb-3 text-lg">
                                    ⚡Exam Quick Revision Points
                                </h3>
                                <ul className="list-disc ml-6 space-y-1 text-gray-800">
                                  {notes.revisionPoints.map((p,i)=>(
                                    <li key={i}>{p}</li>
                                  ))}
                                </ul>

                              </section>
                           }

                           {notes.diagram?.data && <section>
                                   <h3 className="mt-6 rounded-lg font-bold text-green-700 mb-3 bg-cyan-300 text-lg">
                                   📊 Daigram
                                    </h3>
                                    <Mermaid diagram={notes.diagram?.data}></Mermaid>
                                    <p className="mt-3 text-xs text-gray-500 italic">
                                      ℹ️ if you need this diagram for future refrerence or revision, you can save it by taking a screenshot
                                    </p>
                           </section>}
                         
                           <section>
                            <h3 className="mt-6 rounded-lg font-bold text-green-700 mb-3 bg-rose-300 text-lg">
                                   ❓Important Questions
                            </h3>
                              <p className="font-medium">short Question:</p>
                              <ul className="list-disc ml-6 text-gray-700">
                                {notes.questions.short.map((q,i)=>(
                                  <li key={i}>{q}</li>
                                ))}
                              </ul>
                                 
                                  <p className="font-medium mt-4">Diagram Question:</p>
                              <ul className="list-disc ml-6 text-gray-700">
                                <li>{notes.questions.diagram}</li>
                              </ul>
                              
                           </section>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Prompt;
