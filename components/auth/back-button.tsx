"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function BackButton({href, label}: { href: string, label: string }) {
    return (
        <>
            <div>
                <Button className={"font-medium w-full"}>
                    <Link href={"/"}>{label}</Link>
                </Button>
            </div>
        </>
    )
}
