import Link from "next/link";
import { LoginButtons } from "./components/Buttons/LoginButton";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center gap-10">
      <LoginButtons />
    </div>
  );
}
