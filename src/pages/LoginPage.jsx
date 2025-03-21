import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCollegeUser, isCollegeRegistered } from "../services/auth.service";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ collegeName: "", email: "", password: "" });
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
      console.log("Verifying College:", formData);

      const { collegeName, email, password } = formData;
      if (!collegeName || !email || !password) {
        throw new Error("All fields are required.");
      }

      const collegeExists = await isCollegeRegistered(collegeName, email);
      if (!collegeExists) {
        throw new Error("College not found or email does not match records.");
      }

      const user = await loginCollegeUser(email, password);
      await localStorage.setItem('user', JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700">College Login</h2>

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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          New here?{" "}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
