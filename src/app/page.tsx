"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email || !password || (isSigningUp && !username)) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    if (isSigningUp) {
      // Sign up flow
      // const { data: existingUsers, error: fetchError } = await supabase
      //   .from("users")
      //   .select("*")
      //   .eq("userName", username);

      // if (fetchError) {
      //   setErrorMessage("Error checking username availability.");
      //   setIsLoading(false);
      //   return;
      // }

      // if (existingUsers.length > 0) {
      //   setErrorMessage(
      //     "That username is already taken. Please choose another."
      //   );
      //   setIsLoading(false);
      //   return;
      // }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setErrorMessage("Signup succeeded but no user object returned.");
        setIsLoading(false);
        return;
      }

      // Insert into custom 'users' table
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id,
          email,
          userName: username,
        },
      ]);

      if (insertError) {
        // setErrorMessage("Signed up, but failed to save user data.");
        // setIsLoading(false);
        // return;
        console.error(
          "Insert into users table failed:",
          JSON.stringify(insertError, null, 2)
        );

        setErrorMessage("Signed up, but failed to save user data.");
        setIsLoading(false);
        return;
      }
      //after creating main page
      router.push("/home");
    } else {
      // Login flow
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }
      //after creating main page
      router.push("/main");
    }

    setIsLoading(false);
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md border-4 border-yellow-400"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 drop-shadow-md">
          🎮 exQuizzit
        </h1>

        {/* Email */}
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <div className="flex items-center border-2 border-blue-400 rounded mb-4 px-3 py-2">
          <span className="text-xl text-gray-600 mr-2">👤</span>
          <input
            type="email"
            className="w-full focus:outline-none bg-transparent"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <label className="block mb-2 font-semibold text-gray-700">
          Password
        </label>
        <div className="flex items-center border-2 border-blue-400 rounded mb-4 px-3 py-2">
          <span className="text-xl text-gray-600 mr-2">🔒</span>
          <input
            type="password"
            className="w-full focus:outline-none bg-transparent"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Username (only for sign-up) */}
        {isSigningUp && (
          <>
            <label className="block mb-2 font-semibold text-gray-700">
              Username
            </label>
            <div className="flex items-center border-2 border-blue-400 rounded mb-4 px-3 py-2">
              <span className="text-xl text-gray-600 mr-2">🧑‍🎤</span>
              <input
                type="text"
                className="w-full focus:outline-none bg-transparent"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Remember me + toggle */}
        <div className="flex items-center justify-between mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <span
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            {isSigningUp
              ? "Already have an account? Log in"
              : "Don’t have an account? Sign up"}
          </span>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-sm font-semibold mb-4">
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-blue-900 font-bold py-2 rounded hover:bg-yellow-300 transition duration-200 shadow-md disabled:opacity-50"
          disabled={isLoading}
        >
          {isSigningUp
            ? isLoading
              ? "Creating account..."
              : "🚀 Sign Up"
            : isLoading
            ? "Logging in..."
            : "🔓 Log In"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="mt-4 w-full bg-gray-200 text-gray-800 font-bold py-2 rounded hover:bg-gray-300 transition duration-200 shadow-md"
        >
          🎯 Continue as Guest
        </button>
      </form>
    </main>
  );
}
