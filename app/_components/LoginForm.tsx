"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setNetworkError(false);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");
    setNetworkError(false);

    try {
      const result = await signIn("credentials", {
        username: formData.username.trim(),
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // Handle specific error cases
        if (result.error.includes("502")) {
          setNetworkError(true);
          setError(
            "Server is temporarily unavailable. Please try again in a few minutes."
          );
        } else if (result.error.includes("401")) {
          setError("Invalid email or password");
        } else {
          setError(result.error);
        }
        return;
      }

      if (result?.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setNetworkError(true);
      setError(
        "Cannot connect to the server. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      {/* {error && (
        <Alert
          variant={networkError ? "destructive" : "default"}
          className="animate-fadeIn"
        >
          <AlertTitle>
            {networkError ? "Connection Error" : "Authentication Error"}
          </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full text-black border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-all"
            placeholder="Email"
            disabled={loading}
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full text-black border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-all"
            placeholder="Password"
            disabled={loading}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          disabled={loading || !formData.username || !formData.password}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
