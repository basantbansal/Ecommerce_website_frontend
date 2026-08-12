import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api";

function VerifyEmailPage() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    const token = params.get("token");
    if (!token) { setMessage("This verification link is invalid."); return; }
    verifyEmail(token)
      .then((response) => setMessage(response.data.message))
      .catch((error) => setMessage(error.response?.data?.message || "Unable to verify email."));
  }, [params]);

  return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Email verification</h2>
    <p className="text-sm text-gray-600">{message}</p>
    <Link to="/login" className="inline-block mt-5 text-blue-500 hover:underline">Go to login</Link>
  </div></div>;
}

export default VerifyEmailPage;
