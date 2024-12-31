import Link from "next/link";
import { LoginButtons } from "./components/Buttons/LoginButton";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 h-screen">
      <Navbar />
      <div className="flex font-bold text-[#0056d2] text-5xl">
        Welcome to AssignMate
      </div>
      <p className="px-10 text-2xl">
        Your trusted platform for seamless assignment submissions. Whether you're a student aiming to submit your work on time or an educator managing multiple assignments, our easy-to-use web app streamlines the entire process. With a user-friendly interface, you can upload your assignments, track deadlines, and receive instant feedback—all in one place. Stay organized, meet your academic goals, and never miss a submission deadline again. Join the thousands of users who trust Assignment Submittor to simplify their academic journey.
      </p>
    </div>
  );
}
