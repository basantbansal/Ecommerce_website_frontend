import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { forgotPassword } from "../api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    try {
      const response = await forgotPassword(email);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Forgot password error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Unable to request a reset link. Please try again.");
    }
  };

  return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">Forgot password?</h2>
    <p className="text-sm text-gray-600 mb-5">Enter your verified email and we’ll send a reset link.</p>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
    {message && <p className="text-sm text-gray-600 mt-3">{message}</p>}
    <Button primary onClick={submit} className="mt-4 w-full justify-center">Send reset link</Button>
    <p className="text-sm text-center text-gray-500 mt-4"><Link to="/login" className="text-blue-500 hover:underline">Back to login</Link></p>
  </div></div>;
}

export default ForgotPasswordPage;
