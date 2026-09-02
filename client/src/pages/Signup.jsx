import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-7">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-bg font-medium">D</div>
          <span className="text-text font-medium text-lg">DevMate</span>
        </div>

        <h1 className="text-text text-base font-medium text-center mb-1">Create your account</h1>
        <p className="text-muted text-sm text-center mb-6">Start using DevMate for free</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <p className="text-red-400 text-xs bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="text-muted text-xs mb-1.5 block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text text-sm outline-none focus:border-accent"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="text-muted text-xs mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text text-sm outline-none focus:border-accent"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="text-muted text-xs mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text text-sm outline-none focus:border-accent"
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="bg-accent text-bg font-medium text-sm rounded-lg py-2.5 mt-1 hover:opacity-90 transition"
          >
            Create account
          </button>
        </form>

        <p className="text-muted text-xs text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-accent">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signup
