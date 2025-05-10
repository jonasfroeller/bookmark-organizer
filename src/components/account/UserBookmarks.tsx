"use client";

import { useState } from 'react';
import { Box, Button, Flex, Heading, Text, Table } from '@/components/ui/RadixTheme';
import { TrashIcon } from '@radix-ui/react-icons';

type Bookmark = {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
};

const UserBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {
      id: '1',
      title: 'Example Bookmark 1',
      url: 'https://example.com/1',
      createdAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      title: 'Example Bookmark 2',
      url: 'https://example.com/2',
      createdAt: new Date('2023-01-02'),
    },
  ]);

  const handleDelete = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  if (bookmarks.length === 0) {
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
              <Table.Cell>{bookmark.title}</Table.Cell>
              <Table.Cell>
                <Text size="2" truncate>
                  {bookmark.url}
                </Text>
              </Table.Cell>
              <Table.Cell>{bookmark.createdAt.toLocaleDateString()}</Table.Cell>
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
