import {auth} from "@/server/auth";
import UserButton from "@/components/reviews/navigation/user-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from "lucide-react";

export default async function Nav() {
    const session = await auth();


    return (
        <>
            <header className={"py-8 text-white"}>
                <nav>
                    <ul className={"flex justify-between"}>
                        <li className={"text-black"}>
                            <Link href={"/"}>Logo</Link>
                        </li>
                        {!session ? (
                            <li>
                                <Button asChild>
                                    <Link className={"flex gap-2 "} href={"/auth/login"}><LogIn
                                        size={15}/><span>Login</span></Link>
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
