"use client"
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
import toast from "react-hot-toast";


export default function Login() {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const[userDetails,setUserdetails]=useState({
  email:"",password:""
})
const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (isSubmitting) return;
  const { email, password } = userDetails;
  if (!email || !password) {
    toast.error("Enter email and password");
    return;
  }

  setIsSubmitting(true);
  try {
    const result = await signIn("credentials", {
      email: email.trim().toLowerCase(), password, redirect: false, callbackUrl: "/dashboard",
    });
    if (result?.error) {
      toast.error(result.error === "CredentialsSignin"
        ? "Incorrect email or password"
        : "Login is unavailable. Please try again shortly.");
    } else if (result?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error("Login failed. Please try again.");
    }
  } catch {
    toast.error("Unable to reach the server. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <input value={userDetails.email} onChange={(e)=>setUserdetails({...userDetails,email:e.target.value})}
            type="email"
            name="email"
            aria-label="Email"
            autoComplete="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
          <input  value={userDetails.password} onChange={(e)=>setUserdetails({...userDetails,password:e.target.value})}
            type="password"
            name="password"
            aria-label="Password"
            autoComplete="current-password"
            placeholder="Password"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-800"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          
          <p className="text-center text-sm text-gray-600">
            Not registered? Click here to{" "}
            <Link href="/register" className="text-blue-700 hover:underline">
              register
            </Link>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
}
