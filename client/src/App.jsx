import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import FourOFour from "./pages/FourOFour";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import QuestionPaper from "./pages/questionpaper/QuestionPaper";
import Semester from "./pages/questionpaper/Semester";
import AllCourse from "./pages/allcourse/AllCourse";
import BtechBranches from "./pages/questionpaper/BtechBranches";
import BtechBranch from "./pages/allcourse/BtechBranch";
import AllSemester from "./pages/allcourse/AllSemester";
import Upload from "./pages/admin/Upload";
import NotePage from "./pages/allcourse/NotePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PyqPage from "./pages/questionpaper/PyqPage";
import Download from "./pages/Download";
import Prompt from "./pages/Prompt";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/user/ForgotPassword";
import VerifyOtp from "./pages/user/VerifyOtp";
import ResetPassword from "./pages/user/ResetPassword";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/allcourse"
          element={
            <ProtectedRoute>
              <AllCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allcourse/btech"
          element={
            <ProtectedRoute>
              <BtechBranch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allcourse/btech/:branch"
          element={
            <ProtectedRoute>
              <AllSemester />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allcourse/btech/:branch/semester/:num"
          element={
            <ProtectedRoute>
              <NotePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questionpaper"
          element={
            <ProtectedRoute>
              <QuestionPaper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questionpaper/btech-branch"
          element={
            <ProtectedRoute>
              <BtechBranches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questionpaper/btech-branch/:branch"
          element={
            <ProtectedRoute>
              <Semester />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questionpaper/btech-branch/:branch/semesters/:num"
          element={
            <ProtectedRoute>
              <PyqPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-downloads"
          element={
            <ProtectedRoute>
              <Download />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ainotes"
          element={
            <ProtectedRoute>
              <Prompt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <AdminRoute>
              <Upload />
            </AdminRoute>
          }
        />
        <Route path="/verify-email/:token" element={<VerifyEmail/>} />

        <Route path="*" element={<FourOFour />} />
         
      </Routes>
      <ToastContainer />
    </AuthProvider>
  
  );
}

export default App;
