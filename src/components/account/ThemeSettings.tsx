"use client";

import { useTheme } from 'next-themes';
import { Box, Flex, Heading, Text } from '@/components/ui/RadixTheme';
import { Select } from "@radix-ui/themes";
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';
import { useMemo, ReactNode } from 'react';

type ThemeOption = 'light' | 'dark' | 'system';

type ThemeData = {
  [key in ThemeOption]: {
    label: string;
    icon: ReactNode;
  }
};

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  
  const themeData: ThemeData = useMemo(() => ({
    light: { label: "Light Mode", icon: <SunIcon width="16" height="16" /> },
    dark: { label: "Dark Mode", icon: <MoonIcon width="16" height="16" /> },
    system: { label: "System Default", icon: <DesktopIcon width="16" height="16" /> }
  }), []);

  const currentTheme: ThemeOption = (theme as ThemeOption) || 'system';
  
  return (
    <Box>
      <Heading as="h3" size="5" mb="4">Theme Settings</Heading>
      
      <Box>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text as="label" size="3" weight="medium">
              Appearance
            </Text>
            <Box maxWidth="260px">
              <Select.Root 
                value={currentTheme} 
                onValueChange={(value: string) => setTheme(value)}
                size="3"
              >
                <Select.Trigger>
                  <Flex as="span" align="center" gap="2">
                    {themeData[currentTheme].icon}
                    {themeData[currentTheme].label}
                  </Flex>
                </Select.Trigger>
                <Select.Content position="popper">
                  <Select.Item value="light">
                    <Flex align="center" gap="2">
                      {themeData.light.icon}
                      {themeData.light.label}
                    </Flex>
                  </Select.Item>
                  <Select.Item value="dark">
                    <Flex align="center" gap="2">
                      {themeData.dark.icon}
                      {themeData.dark.label}
                    </Flex>
                  </Select.Item>
                  <Select.Item value="system">
                    <Flex align="center" gap="2">
                      {themeData.system.icon}
                      {themeData.system.label}
                    </Flex>
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
          
          <Box>
            <Text size="2" color="gray">
              Select your preferred theme appearance. The System Default option will automatically match your device settings.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ThemeSettings;
