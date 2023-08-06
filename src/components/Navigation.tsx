import styles from '../styles/Navigation.module.scss';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import * as Toolbar from '@radix-ui/react-toolbar';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Label from '@radix-ui/react-label';
import { LogInButton } from "~/components/LogInButton";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import {
    StarIcon,
    StarFilledIcon,
    LayersIcon,
    BadgeIcon,
    Link2Icon,
    TextAlignLeftIcon,
    TextIcon,
    MagnifyingGlassIcon,
    GearIcon,
    AvatarIcon,
    DashboardIcon
} from '@radix-ui/react-icons';

interface PageProps {
    route: {
        isDashboardPage: boolean;
        isAccountPage: boolean;
        isSettingsPage: boolean;
    };
}

const iconSize = 30;

export const Navigation = () => {
    const { data: sessionData } = useSession();
    const router = useRouter();
    const isDashboardPage = router.pathname === '/dashboard';
    const isAccountPage = router.pathname === '/account';
    const isSettingsPage = router.pathname === '/settings';

    return (
        <nav className="sticky top-0">
            <Toolbar.Root className={`${styles.toolbar}`} aria-label="navigation">
                <Toolbar.Link className="text-3xl font-bold" href="/">Bookmark Organizer</Toolbar.Link>

                {sessionData?.user !== undefined && isDashboardPage && <Actions />}

                <div className="flex items-center gap-8">
                    {sessionData?.user !== undefined && <AccountSettings route={{
                        isDashboardPage,
                        isAccountPage,
                        isSettingsPage
                    }} />}

                    <LogInButton />
                </div>
            </Toolbar.Root>
        </nav>
    );
}

function AccountSettings(page: PageProps) {
    return (
        <div className="flex items-center gap-2">
            <Toolbar.Link href="/dashboard">
                <Label.Root htmlFor="dashboard">
                    <AccessibleIcon.Root label="dashboard">
                        <DashboardIcon className={`cursor-pointer ${page?.route?.isDashboardPage ? "text-tertiary-600" : ""}`} height={`${iconSize}px`} width={`${iconSize}px`} />
                    </AccessibleIcon.Root>
                </Label.Root>
            </Toolbar.Link>

            <Toolbar.Link href="/account">
                <Label.Root htmlFor="account">
                    <AccessibleIcon.Root label="account">
                        <AvatarIcon className={`cursor-pointer ${page?.route?.isAccountPage ? "text-tertiary-600" : ""}`} height={`${iconSize}px`} width={`${iconSize}px`} />
                    </AccessibleIcon.Root>
                </Label.Root>
            </Toolbar.Link>

            <Toolbar.Link href="/settings">
                <Label.Root htmlFor="settings">
                    <AccessibleIcon.Root label="settings">
                        <GearIcon className={`cursor-pointer ${page?.route?.isSettingsPage ? "text-tertiary-600" : ""}`} height={`${iconSize}px`} width={`${iconSize}px`} />
                    </AccessibleIcon.Root>
                </Label.Root>
            </Toolbar.Link>
        </div>
    );
}

function Actions() {
    return (
        <div className="flex gap-10">
            <div className={`${styles.toolbar__search_bar} flex items-center gap-1`}>
                <input type="search" className={`${styles.toolbar__search_bar__input} bg-white/10 hover:bg-white/20`} defaultValue="" />
                <Label.Root htmlFor="search">
                    <AccessibleIcon.Root label="search">
                        <MagnifyingGlassIcon className={`${styles.toolbar__search_bar__icon}`} height={`${iconSize}px`} width={`${iconSize}px`} />
                    </AccessibleIcon.Root>
                </Label.Root>
            </div>

            <Toolbar.ToggleGroup className={`${styles.toolbar__actions}`} type="multiple" aria-label="Search Settings">
                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Portal>
                            <Tooltip.Content className={`${styles.toolbar__actions__tool_tip}`} sideOffset={5}>
                                only not starred
                                <Tooltip.Arrow className={`${styles.toolbar__actions__tool_tip__icon}`} />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                        <Tooltip.Trigger asChild>
                            <Toolbar.ToggleItem className={`${styles.toolbar__actions__action}`} value="star" aria-label="Star">
                                <StarIcon height={`${iconSize}px`} width={`${iconSize}px`} />
                            </Toolbar.ToggleItem>
                        </Tooltip.Trigger>
                    </Tooltip.Root>
                </Tooltip.Provider>

                <Toolbar.Separator className={`${styles.toolbar__actions__divider}`} />

                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Portal>
                            <Tooltip.Content className={`${styles.toolbar__actions__tool_tip}`} sideOffset={5}>
                                only starred
                                <Tooltip.Arrow className={`${styles.toolbar__actions__tool_tip__icon}`} />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                        <Tooltip.Trigger asChild>
                            <Toolbar.ToggleItem className={`${styles.toolbar__actions__action}`} value="star-filled" aria-label="Star Filled">
                                <StarFilledIcon height={`${iconSize}px`} width={`${iconSize}px`} />
                            </Toolbar.ToggleItem>
                        </Tooltip.Trigger>
                    </Tooltip.Root>
                </Tooltip.Provider>

                <Toolbar.Separator className={`${styles.toolbar__actions__divider}`} />

                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Portal>
                            <Tooltip.Content className={`${styles.toolbar__actions__tool_tip}`} sideOffset={5}>
                                by group name
                                <Tooltip.Arrow className={`${styles.toolbar__actions__tool_tip__icon}`} />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                        <Tooltip.Trigger asChild>
                            <Toolbar.ToggleItem className={`${styles.toolbar__actions__action}`} value="layers" aria-label="Layers">
                                <LayersIcon height={`${iconSize}px`} width={`${iconSize}px`} />
                            </Toolbar.ToggleItem>
                        </Tooltip.Trigger>
                    </Tooltip.Root>
                </Tooltip.Provider>

                <Toolbar.Separator className={`${styles.toolbar__actions__divider}`} />

                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Portal>
                            <Tooltip.Content className={`${styles.toolbar__actions__tool_tip}`} sideOffset={5}>
                                by url
                                <Tooltip.Arrow className={`${styles.toolbar__actions__tool_tip__icon}`} />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                        <Tooltip.Trigger asChild>
                            <Toolbar.ToggleItem className={`${styles.toolbar__actions__action}`} value="link" aria-label="Link">
                                <Link2Icon height={`${iconSize}px`} width={`${iconSize}px`} />
                            </Toolbar.ToggleItem>
                        </Tooltip.Trigger>
                    </Tooltip.Root>
                </Tooltip.Provider>

                <Toolbar.Separator className={`${styles.toolbar__actions__divider}`} />

                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Portal>
                            <Tooltip.Content className={`${styles.toolbar__actions__tool_tip}`} sideOffset={5}>
                                by badge (tag)
                                <Tooltip.Arrow className={`${styles.toolbar__actions__tool_tip__icon}`} />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                        <Tooltip.Trigger asChild>
                            <Toolbar.ToggleItem className={`${styles.toolbar__actions__action}`} value="badge" aria-label="Badge">
                                <BadgeIcon height={`${iconSize}px`} width={`${iconSize}px`} />
                            </Toolbar.ToggleItem>
                        </Tooltip.Trigger>
                    </Tooltip.Root>
                </Tooltip.Provider>

                <Toolbar.Separator className={`${styles.toolbar__actions__divider}`} />

                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Portal>
                            <Tooltip.Content className={`${styles.toolbar__actions__tool_tip}`} sideOffset={5}>
                                by description
                                <Tooltip.Arrow className={`${styles.toolbar__actions__tool_tip__icon}`} />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                        <Tooltip.Trigger asChild>
                            <Toolbar.ToggleItem className={`${styles.toolbar__actions__action}`} value="text-align-left" aria-label="Text Align Left">
                                <TextAlignLeftIcon height={`${iconSize}px`} width={`${iconSize}px`} />
                            </Toolbar.ToggleItem>
                        </Tooltip.Trigger>
                    </Tooltip.Root>
                </Tooltip.Provider>

                <Toolbar.Separator className={`${styles.toolbar__actions__divider}`} />

                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Portal>
                            <Tooltip.Content className={`${styles.toolbar__actions__tool_tip}`} sideOffset={5}>
                                by title
                                <Tooltip.Arrow className={`${styles.toolbar__actions__tool_tip__icon}`} />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                        <Tooltip.Trigger asChild>
                            <Toolbar.ToggleItem className={`${styles.toolbar__actions__action}`} value="text" aria-label="Text">
                                <TextIcon height={`${iconSize}px`} width={`${iconSize}px`} />
                            </Toolbar.ToggleItem>
                        </Tooltip.Trigger>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </Toolbar.ToggleGroup>
        </div>
    );
}