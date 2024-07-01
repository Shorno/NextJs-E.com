import {auth} from "@/server/auth";
import UserButton from "@/components/reviews/navigation/user-button";

export default async function Nav() {
    const session = await auth();

    return (
        <>
        <header className={"bg-slate-500 py-4 text-white"}>
            <nav>
                <ul className={"flex justify-between"}>
                    <li>Logo</li>
                    <li><UserButton expires={session?.expires} user={session?.user}/></li>
                </ul>
            </nav>
        </header>
        </>
    )
}