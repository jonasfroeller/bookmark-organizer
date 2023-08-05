import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import * as RadixToast from '@radix-ui/react-toast';
import * as React from 'react';
import { useSession } from "next-auth/react";
import { Cross1Icon } from '@radix-ui/react-icons';
import styles from '../styles/Toast.module.scss';

export const Toast = ({ title, description }) => {
    const { data: sessionData } = useSession();

    const [open, setOpen] = React.useState(sessionData?.user);

    return (
        <RadixToast.Provider swipeDirection="right">
            <RadixToast.Root className={`${styles.toast_pos__toast_element}`} open={open} onOpenChange={setOpen}>
                <RadixToast.Title className={`${styles.toast_pos__toast_element__title}`}>{title}</RadixToast.Title>
                <RadixToast.Description className={`${styles.toast_pos__toast_element__description}`}>
                    {description}
                </RadixToast.Description>
                <RadixToast.Close> 
                    <AccessibleIcon.Root label="close">
                        <Cross1Icon className="cursor-pointer" height="15px" width="15px" />
                    </AccessibleIcon.Root>
                </RadixToast.Close>
            </RadixToast.Root>
            <RadixToast.Viewport className={`${styles.toast_pos}`} />
        </RadixToast.Provider>
    );
}