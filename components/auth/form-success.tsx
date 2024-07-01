import {CheckCircle} from "lucide-react";

export default function FormSuccess({message}: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <>
            <div className={"bg-teal-400 text-secondary-foreground p-3"}>
                <CheckCircle className={"w-4 h-4"}/>
                <p>
                    {message}
                </p>
            </div>
        </>
    )
}
