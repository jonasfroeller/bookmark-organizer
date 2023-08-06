import { Toast } from "~/components/Toast";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export const Notification = () => {
    const { data: sessionData } = useSession();

    const displayNotification = sessionData?.user !== undefined;

    const { data: secretMessage } = api.main.getSecretMessage.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined }
    );

    return (
        <>
            {displayNotification && <Toast title={sessionData?.user?.name ?? ""} description={secretMessage ?? ""} />}
        </>
    );
};