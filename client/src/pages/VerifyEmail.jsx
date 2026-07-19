import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../api/api";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(apiUrl(`/user/verify-email/${token}`));

        setSuccess(true);
        setMessage(res.data.message);
      } catch (err) {
        setSuccess(false);

        setMessage(err.response?.data?.message || "Email verification failed.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden text-center">
        <div className="bg-primary p-8">
          <h2 className="text-3xl font-bold text-white">Email Verification</h2>
        </div>
        <div className="p-8 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Verifying your email...</p>
            </div>
          ) : (
            <>
              <div className="text-5xl mb-2">{success ? "✅" : "❌"}</div>
              <h3 className={`text-xl font-bold ${success ? "text-green-600" : "text-red-600"}`}>
                {success ? "Email Verified!" : "Verification Failed"}
              </h3>
              <p className="text-gray-600">{message}</p>

              {success && (
                <button
                  className="mt-4 w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-all"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              )}

              {!success && (
                <button
                  className="mt-4 w-full border border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
