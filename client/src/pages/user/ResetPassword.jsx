import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const resetToken = location.state?.resetToken;

  // Redirect if no email/token passed in state
  useEffect(() => {
    if (!email || !resetToken) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, resetToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(apiUrl("/user/reset-password"), {
        email,
        newPassword,
        resetToken,
      });

      toast.success("Password reset successfully! Please login.");
      navigate("/login", {
        replace: true,
        state: { message: "Password reset successfully! Please login." },
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const strength = () => {
    if (!newPassword) return null;
    if (newPassword.length < 6) return { label: "Too short", color: "bg-red-400", width: "w-1/4" };
    if (newPassword.length < 8) return { label: "Weak", color: "bg-orange-400", width: "w-2/4" };
    if (/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword))
      return { label: "Strong", color: "bg-green-500", width: "w-full" };
    return { label: "Medium", color: "bg-yellow-400", width: "w-3/4" };
  };

  const s = strength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-8 text-center">
          <div className="text-5xl mb-3">🔑</div>
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="text-purple-100 mt-2 text-sm">
            Create a new strong password for{" "}
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition text-lg"
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Strength bar */}
            {s && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${s.color} ${s.width}`}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Strength:{" "}
                  <span
                    className={
                      s.label === "Strong"
                        ? "text-green-600 font-semibold"
                        : s.label === "Medium"
                        ? "text-yellow-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {s.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition ${
                confirmPassword && newPassword !== confirmPassword
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200"
              }`}
              required
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || (confirmPassword && newPassword !== confirmPassword)}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            <Link to="/login" className="text-primary font-semibold hover:underline">
              ← Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
