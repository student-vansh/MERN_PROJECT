import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api/api";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Redirect if no email passed in state
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // Auto-advance to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(apiUrl("/user/verify-otp"), {
        email,
        otp: otpString,
      });

      toast.success("OTP verified!");
      navigate("/reset-password", {
        state: { email, resetToken: res.data.resetToken },
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid or expired OTP.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResending(true);
    setError("");

    try {
      await axios.post(apiUrl("/user/resend-otp"), { email });
      toast.success("New OTP sent to your email!");
      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend OTP.";
      setError(msg);
      toast.error(msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-8 text-center">
          <div className="text-5xl mb-3">📩</div>
          <h2 className="text-3xl font-bold text-white">Verify OTP</h2>
          <p className="text-purple-100 mt-2 text-sm">
            We sent a 6-digit code to{" "}
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 text-center">
              {error}
            </div>
          )}

          {/* OTP Boxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter the 6-digit OTP
            </label>
            <div
              className="flex gap-3 justify-center"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-all
                    ${digit
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-800"
                    }
                    focus:border-primary focus:ring-2 focus:ring-primary/20`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Resend */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-primary font-semibold hover:underline text-sm disabled:opacity-60"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Resend OTP in{" "}
                <span className="font-semibold text-primary">{countdown}s</span>
              </p>
            )}
          </div>

          <p className="text-center text-sm text-gray-600">
            <Link to="/forgot-password" className="text-primary font-semibold hover:underline">
              ← Change Email
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
