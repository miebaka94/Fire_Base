"use client";
import Link from 'next/link'
import React, { useState } from 'react';
import { useUserAuth } from "./_utils/auth-context"; // Adjust the path as necessary

export default function LoginPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInWithEmail = async (e) => {
    e.preventDefault();
    alert("Signing in with email and password is not implemented yet.");
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    alert("Creating an account is not implemented yet.");
  };

  const handleGitHubSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Failed to sign in with GitHub:", error);
    }
  };

  const handleGoogleSignIn = () => {
    alert("Signing in with Google is not implemented yet.");
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      {!isLoggedIn ? (
        <div className="space-y-8 w-full max-w-xs">
          {/* Form for Email and Password (Placeholder - not functional) */}
          <form onSubmit={handleSignInWithEmail} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignInWithEmail}
              >
                Sign In
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCreateAccount}
              >
                Create Account
              </button>
            </div>
          </form>
          {/* GitHub and Google Sign-in Buttons */}
          <button onClick={handleGitHubSignIn} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Continue with GitHub
          </button>
          <button onClick={handleGoogleSignIn} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Continue with Google
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Welcome to the Application, {user.displayName}!</h1>
          <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
          <Link href="week-8\shopping-list"
          className="text-blue-500 hover:text-blue-700">Go to Shopping List
          </Link>
        </div>
      )}
    </div>
  );
}

