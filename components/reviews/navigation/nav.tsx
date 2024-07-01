import {auth} from "@/server/auth";
import UserButton from "@/components/reviews/navigation/user-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from "lucide-react";

export default async function Nav() {
    const session = await auth();


    return (
        <>
            <header className={"bg-slate-500 py-4 text-white px-10"}>
                <nav>
                    <ul className={"flex justify-between"}>
                        <li>Logo</li>
                        {!session ? (
                            <li>
                                <Button asChild>
                                    <Link className={"flex gap-2 "} href={"/auth/login"}><LogIn size={15}/><span>Login</span></Link>
                                </Button>
                            </li>
                        ) : (<li><UserButton expires={session?.expires} user={session?.user}/></li>)
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}
