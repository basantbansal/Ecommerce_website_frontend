import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { resetPassword } from "../api";

function ResetPasswordPage() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    try {
      const response = await resetPassword(params.get("token"), password);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to reset password.");
    }
  };

  return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose a new password</h2>
    <p className="text-sm text-gray-600 mb-5">Use at least 8 characters, with uppercase, lowercase, and a number.</p>
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
    {message && <p className="text-sm text-gray-600 mt-3">{message}</p>}
    <Button primary onClick={submit} className="mt-4 w-full justify-center">Reset password</Button>
    <p className="text-sm text-center text-gray-500 mt-4"><Link to="/login" className="text-blue-500 hover:underline">Back to login</Link></p>
  </div></div>;
}

export default ResetPasswordPage;
