import { useState } from "react";
import { useNavigate, Link } from "react-router";
import * as Label from "@radix-ui/react-label";
import { PersonIcon, EnvelopeClosedIcon, LockClosedIcon, EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { signUp } from "../lib/auth-client";
import "../Styles/Signup.css"

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
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
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (result.error) {
        setError(result.error.message || "Signup failed");
      } else {
        // Navigate to dashboard on successful signup
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome to Steady</h1>
          <p>Create your account to get started</p>
        </div>

        {error && (
          <div className="error-alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <Label.Root htmlFor="name" className="field-label">
              Full Name
            </Label.Root>
            <div className="input-wrapper">
              <PersonIcon className="input-icon" />
              <input
                type="text"
                id="name"
                className="field-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
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

          <div className="form-field">
            <Label.Root htmlFor="confirmPassword" className="field-label">
              Confirm Password
            </Label.Root>
            <div className="input-wrapper">
              <LockClosedIcon className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="field-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;