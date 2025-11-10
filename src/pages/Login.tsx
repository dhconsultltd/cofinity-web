import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy credentials
    if (form.email === "admin@cofinity.com" && form.password === "123456") {
      alert("Login successful!");
      navigate("/cooperative-selection");
    } else {
      alert("Invalid credentials. Try admin@cofinity.com / 123456");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login successful! Redirecting...");
    navigate("/cooperative-selection");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-100 relative overflow-hidden items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9v2X_v5QtAZs0uxEzL-7WAS5HoIn3vo7wsz3tbCM82ax1uliliAuMI59p7Hku6xSl4Y&usqp=CAU"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

        <div className="relative z-10 text-center px-10">
          <div className="flex justify-center mb-6">
            <img
              src=""
              alt="Cofinity Logo"
              className="w-20 h-20 object-contain drop-shadow-lg"
            />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-300">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Sign in to continue managing your{" "}
            <span className="text-indigo-400">Cooperative</span> — securely and
            efficiently.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Log in to Cofinity
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full py-2 outline-none text-gray-700"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full py-2 outline-none text-gray-700"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Log In
          </button>

          <div className="my-4 flex items-center justify-center text-gray-500">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-3 text-sm">or</span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
            <button
              type="button"
              onClick={() => alert("Password reset coming soon!")}
              className="hover:text-indigo-600"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="hover:text-indigo-600"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
