import Link from "next/link"
import { LoginButtons } from "./Buttons/LoginButton"

export const Navbar = () => {
    return (
        <div className="flex justify-between items-center px-10 border rounded-sm w-screen h-20 font-bold">
            <Link href={'/'}>Logo</Link>
            <span>Assignmnet Submission</span>
            <LoginButtons />
        </div>
    )
}