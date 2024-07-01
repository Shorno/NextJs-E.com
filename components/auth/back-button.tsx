"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function BackButton({href, label}: { href: string, label: string }) {
    return (
        <>
            <div className={"w-full flex items-center justify-center"}>
                <Button className={"font-medium"}>
                    <Link href={"/"}>{label}</Link>
                </Button>
            </div>
        </>
    )
}
