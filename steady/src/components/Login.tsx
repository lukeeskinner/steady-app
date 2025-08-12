import { useState } from "react";
import { useNavigate, Link } from "react-router";
import * as Label from "@radix-ui/react-label";
import { EnvelopeClosedIcon, LockClosedIcon, EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { signIn } from "../lib/auth-client";
import "../Styles/Login.css"

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email";
    if (!formData.password.trim()) return "Password is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
      } else {
        // Navigate to dashboard on successful login
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Steady account</p>
        </div>

        {error && (
          <div className="error-alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <Label.Root htmlFor="email" className="field-label">
              Email Address
            </Label.Root>
            <div className="input-wrapper">
              <EnvelopeClosedIcon className="input-icon" />
              <input
                type="email"
                id="email"
                className="field-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <Label.Root htmlFor="password" className="field-label">
              Password
            </Label.Root>
            <div className="input-wrapper">
              <LockClosedIcon className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="field-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                disabled={isLoading}
              />
              <span className="checkbox-label">Remember me</span>
            </label>
            <button type="button" className="auth-link">
              Forgot password?
            </button>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;