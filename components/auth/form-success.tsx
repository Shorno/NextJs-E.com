import {AlertCircle, CheckCircle2} from "lucide-react";

export default function FormSuccess({message}: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <>
            <div className={"bg-teal-400 flex items-center text-sm gap-2 my-2 text-secondary-foreground p-3"}>
                <CheckCircle2 className={"w-4 h-4"}/>
                <p>
                    {message}
                </p>
            </div>
        </>
    )
}
