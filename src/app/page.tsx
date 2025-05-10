import Link from "next/link";
import { HydrateClient } from "@/trpc/server";
import { getSession } from "@/server/auth";
import { Box, Button, Card, Container, Flex, Grid, Heading, Section, Separator, Text } from "@/components/ui/RadixTheme";
import BookmarkManager from '@/components/BookmarkManager';
import BookmarkList from '@/components/BookmarkList';

export default async function Home() {
  const session = await getSession();

  return (
    <HydrateClient>
      {!session?.user ? (
        <Container size="4">
          <Section size="3" className="py-12 md:py-24">
            <Flex direction="column" align="center" gap="6">
              <Heading as="h1" size="9" align="center" className="max-w-3xl">
                Are Your Bookmarks<br />Out Of Control?
              </Heading>
              
              <Link href="/login" className="cursor-pointer">
                <Button size="4" variant="solid" color="amber" highContrast>
                  Yes! Sign in to organize them
                </Button>
              </Link>
            </Flex>
          </Section>

          <Separator size="4" />
          
          <Section size="3" className="py-12">
            <Flex direction="column" align="center" gap="8">
              <Heading as="h2" size="8">Features</Heading>
              
              <Grid columns={{initial: "1", sm: "3"}} gap="6" width="100%">
                <Card size="3">
                  <Flex direction="column" gap="3" align="center" className="p-4">
                    <Heading as="h3" size="6">Viewing</Heading>
                    <Text align="center">Read, reorder, sort, and search your bookmarks.</Text>
                  </Flex>
                </Card>
                
                <Card size="3">
                  <Flex direction="column" gap="3" align="center" className="p-4">
                    <Heading as="h3" size="6">Saving</Heading>
                    <Text align="center">Export and import your bookmarks easily.</Text>
                  </Flex>
                </Card>
                
                <Card size="3">
                  <Flex direction="column" gap="3" align="center" className="p-4">
                    <Heading as="h3" size="6">Managing</Heading>
                    <Text align="center">Create, update, and delete bookmarks effortlessly.</Text>
                  </Flex>
                </Card>
              </Grid>
            </Flex>
          </Section>

          <Separator size="4" />
          
          <Section size="3" className="py-12">
            <Flex direction="column" align="center" gap="8">
              <Heading as="h2" size="8">MVP Demo</Heading>
              <Box className="w-full max-w-xl">
                <BookmarkManager />
              </Box>
            </Flex>
          </Section>
        </Container>
      ) : (
        <Container size="3">
          <Section size="3" className="py-12">
            <Flex direction="column" align="center" gap="6">
              <BookmarkList />
            </Flex>
          </Section>
        </Container>
      )}
    </HydrateClient>
  );
}
