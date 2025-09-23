import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";


interface _Props {
    display: boolean,
    status: boolean,
    message: string,
    errorMsg?: string[],
};

const DisplayRespondsMessage: React.FC<_Props> = ({
    display, status, message, errorMsg
}) => {

    return (
        <>
            {
                display && (
                    <Alert variant={status ? "default" : "destructive"}>
                        {status ? <CheckCircle2Icon /> : <AlertCircleIcon />}

                        <AlertTitle>{message}</AlertTitle>

                        {errorMsg && errorMsg.length ?
                            <AlertDescription>
                                {/* <p>Please verify your billing information and try again.</p> */}
                                <ul className="list-inside list-disc text-sm">
                                    {errorMsg?.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                            : <></>
                        }
                    </Alert>
                )
            }
        </>
    );
}

export default DisplayRespondsMessage;