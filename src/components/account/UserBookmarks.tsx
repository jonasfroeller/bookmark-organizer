"use client";

import { Box, Button, Flex, Heading, Text, Table, Spinner } from '@/components/ui/RadixTheme';
import { TrashIcon, ExternalLinkIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { api } from '@/trpc/react';

const UserBookmarks = () => {
  const utils = api.useUtils();
  
  const { data: bookmarks, isLoading } = api.bookmark.getAll.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });
  
  const deleteBookmark = api.bookmark.delete.useMutation({
    onSuccess: () => {
      utils.bookmark.getAll.invalidate();
    }
  });
  
  const toggleFavorite = api.bookmark.update.useMutation({
    onSuccess: () => {
      utils.bookmark.getAll.invalidate();
    }
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      deleteBookmark.mutate({ id });
    }
  };
  
  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    toggleFavorite.mutate({
      id,
      isFavorite: !isFavorite
    });
  };

  if (isLoading) {
    return (
      <Box>
        <Heading as="h3" size="4" mb="3">Your Bookmarks</Heading>
        <Flex align="center" justify="center" p="6">
          <Spinner size="3" />
        </Flex>
      </Box>
    );
  }

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <Box>
        <Heading as="h3" size="4" mb="3">Your Bookmarks</Heading>
        <Text size="2" color="gray">You haven't created any bookmarks yet.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading as="h3" size="4" mb="3">Your Bookmarks</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>URL</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="1">Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookmarks.map((bookmark) => (
            <Table.Row key={bookmark.id}>
              <Table.Cell>
                <Flex align="center" gap="2">
                  <Button 
                    size="1" 
                    variant="ghost" 
                    onClick={() => handleToggleFavorite(bookmark.id, bookmark.isFavorite)}
                  >
                    {bookmark.isFavorite ? <StarFilledIcon /> : <StarIcon />}
                  </Button>
                  {bookmark.name}
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <Flex align="center" gap="2">
                  <Text size="2" truncate style={{ maxWidth: '300px' }}>
                    {bookmark.url}
                  </Text>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    <Button size="1" variant="ghost">
                      <ExternalLinkIcon />
                    </Button>
                  </a>
                </Flex>
              </Table.Cell>
              <Table.Cell>{new Date(bookmark.createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Button 
                  size="1" 
                  color="red" 
                  variant="soft" 
                  onClick={() => handleDelete(bookmark.id)}
                >
                  <TrashIcon />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default UserBookmarks;
