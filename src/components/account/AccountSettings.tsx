"use client";

import React, { useState, type ReactNode, type ChangeEvent } from 'react';
import { Box, Card, Flex, Heading, IconButton } from '@/components/ui/RadixTheme';
import { TextField } from "@radix-ui/themes";
import { GearIcon, PersonIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';

type AccountSettingsProps = {
  children: ReactNode;
  _title?: string;
};

const AccountSettings = ({ children, _title = "Account" }: AccountSettingsProps) => {
  const [, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  
  const isSettingsPage = pathname === '/settings';
  const isAccountPage = pathname === '/account' || (!isSettingsPage);

  return (
    <Box style={{ height: 'calc(100vh - 120px)' }}>
      <Flex justify="between" align="center" mb="6">
        <Heading as="h1" size="6">{isSettingsPage ? 'Settings' : 'Account'}</Heading>
        <Flex align="center" gap="2">
          <TextField.Root 
            size="2" 
            placeholder="search..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Flex>
      </Flex>

      <Flex style={{ height: 'calc(100% - 50px)' }}>
        <Box style={{ flex: 1, position: 'relative' }}>
          <Card size="2" style={{ height: '100%', overflow: 'hidden' }}>
            {/* Background Icon for Account */}
            {isAccountPage && (
              <Box 
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                  width: '400px',
                  height: '400px',
                  opacity: 0.15,
                  zIndex: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: 'translate(20%, 20%)'
                }}
              >
                <PersonIcon width="100%" height="100%" />
              </Box>
            )}
            
            {/* Background Icon for Settings */}
            {isSettingsPage && (
              <Box 
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '0',
                  width: '350px',
                  height: '350px',
                  opacity: 0.15,
                  zIndex: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: 'translate(-30%, 30%)'
                }}
              >
                <GearIcon width="100%" height="100%" />
              </Box>
            )}
            
            {/* Content */}
            <Box py="8" px="6" style={{ position: 'relative', zIndex: 1, height: '100%' }}>
              {children}
            </Box>
          </Card>
        </Box>
        
        <Flex 
          direction="column" 
          gap="2" 
          ml="3"
          className='bg-teal-9 p-4 rounded-3'
        >
          <IconButton 
            size="3" 
            variant={isAccountPage ? 'surface' : 'solid'} 
            onClick={() => router.push('/account')}
            aria-label="Account"
          >
            <PersonIcon width="20" height="20" />
          </IconButton>
          <IconButton 
            size="3" 
            variant={isSettingsPage ? 'surface' : 'solid'} 
            onClick={() => router.push('/settings')}
            aria-label="Settings"
          >
            <GearIcon width="20" height="20" />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountSettings;
