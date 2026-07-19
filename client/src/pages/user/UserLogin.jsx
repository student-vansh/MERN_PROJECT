import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn, isAdmin } = useAuth();
  const successMsg = location.state?.message;
  const redirectTo = location.state?.from || "/home";

  useEffect(() => {
    if (isLoggedIn) {
      navigate(isAdmin ? "/admin" : "/home", { replace: true });
    }
  }, [isLoggedIn, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        apiUrl("/user/login"),
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      const userRes = await axios.get(apiUrl("/user/me"), {
        withCredentials: true,
      });

      login(userRes.data.user);
      toast.success(`Welcome, ${userRes.data.user.name}!`);

      if (userRes.data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      // toast.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 403) {
        setError("Please verify your email.");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-primary p-8 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-purple-100 mt-2">Login to access all features</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {successMsg && (
            <div className="rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3">
              {successMsg}
            </div>
          )}

          {redirectTo !== "/home" && (
            <div className="rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm px-4 py-3">
              Please login to continue to your selected feature.
            </div>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-all"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="text-primary font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
