"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";


export default function Register() {
    const [userDetails, setUserdetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    const router=useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        const { name, email, password } = userDetails;
        if (!name || !email || !password) {
            toast.error("Please fill the form completely");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userDetails),
            });
            const serverResponse = await res.json();
            if (res.status === 201) {
                toast.success(serverResponse.message);
                setUserdetails({ name: "", email: "", password: "" });
                router.push("/login");
            } else {
                toast.error(serverResponse.message);
            }
        } catch {
            toast.error("Unable to reach the server. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Register</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input value={userDetails.name}
                        onChange={(e) => setUserdetails({ ...userDetails, name: e.target.value })}
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />

                    <input value={userDetails.email}
                        onChange={(e) => setUserdetails({ ...userDetails, email: e.target.value })}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />

                    <input value={userDetails.password}
                        onChange={(e) => setUserdetails({ ...userDetails, password: e.target.value })}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-700 px-3 py-2 font-semibold text-white hover:bg-blue-800"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Login link */}
                <div className="mt-5 text-center text-gray-600">
                    Already registered?{" "}
                    <a href="/login" className="text-blue-700 hover:underline">
                        Click here to login
                    </a>
                </div>
            </div>
        </div>
    );
}
