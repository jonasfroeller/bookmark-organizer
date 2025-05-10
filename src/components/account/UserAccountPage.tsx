"use client";

import { Box, Flex } from '@/components/ui/RadixTheme';
import AccountSettings from './AccountSettings';
import UserProfile from '@/components/user-profile';
import UserBookmarks from './UserBookmarks';

type UserProps = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | undefined | null;
};

type UserAccountPageProps = {
  user: UserProps;
};

const UserAccountPage = ({ user }: UserAccountPageProps) => {
  const accountContent = (
    <Flex direction="column" gap="6">
      <UserProfile user={user} />
      <UserBookmarks />
    </Flex>
  );

  return (
    <Box py="4">
      <AccountSettings>
        {accountContent}
      </AccountSettings>
    </Box>
  );
};

export default UserAccountPage;
