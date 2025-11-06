import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("New user signup:", form);
    alert("Signup successful! Redirecting to cooperative creation...");
    navigate("/create-cooperative");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section (Info) */}
      <div className="hidden md:flex md:w-100 bg-gradient-to-br from-black to-gray-950 text-white items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">
              Cofinity
            </span>
          </h1>
          <p className="text-gray-200 text-lg">
            Manage your cooperative with ease — registration, members, finance,
            and more.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-10">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create Your Account
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full py-2 outline-none text-gray-700"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="mb-4">
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

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className="w-full py-2 outline-none text-gray-700"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center justify-center text-gray-500">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-3 text-sm">or</span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          {/* Google Signup */}
          <button
            type="button"
            onClick={() => navigate("/create-cooperative")}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
