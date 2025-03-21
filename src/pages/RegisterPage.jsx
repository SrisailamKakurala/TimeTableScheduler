import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCollegeUser } from "../services/auth.service";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collegeName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Registering College:", formData);

      const { collegeName, email, password, confirmPassword } = formData;
      if (!collegeName || !email || !password || !confirmPassword) {
        throw new Error("All fields are required.");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      await registerCollegeUser({ collegeName, email, password });
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700">Register Your College</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <Link to="/" className="text-blue-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
