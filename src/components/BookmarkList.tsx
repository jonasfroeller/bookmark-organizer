"use client";

import { useState } from 'react';
import { api } from '@/trpc/react';
import { Box, Button, Card, Flex, Heading, Text, TextField, Dialog, IconButton, Spinner } from '@/components/ui/RadixTheme';
import * as Form from '@radix-ui/react-form';
import { StarIcon, TrashIcon } from '@radix-ui/react-icons';

export const BookmarkList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBookmarkUrl, setNewBookmarkUrl] = useState('');
  const [newBookmarkName, setNewBookmarkName] = useState('');
  const utils = api.useUtils();

  const { data: bookmarks, isLoading } = api.bookmark.getAll.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });
  
  const createBookmark = api.bookmark.create.useMutation({
    onSuccess: () => {
      setNewBookmarkUrl('');
      setNewBookmarkName('');
      setIsAddDialogOpen(false);
      utils.bookmark.getAll.invalidate();
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBookmarkUrl) return;
    
    createBookmark.mutate({
      url: newBookmarkUrl,
      name: newBookmarkName || newBookmarkUrl,
    });
  };

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
      <Flex align="center" justify="center" p="4">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Card size="2" className="w-full">
      <Flex direction="column" gap="4" p="4">
        <Flex justify="between" align="center">
          <Heading as="h3" size="5">Your Bookmarks</Heading>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            size="2"
            variant="solid"
            color="amber"
          >
            Add Bookmark
          </Button>
        </Flex>
        
        {bookmarks && bookmarks.length > 0 ? (
          <Flex direction="column" gap="2">
            {bookmarks.map((bookmark) => (
              <Card key={bookmark.id} size="1">
                <Flex justify="between" align="center" p="2">
                  <Flex direction="column" gap="1">
                    <Text asChild>
                      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
                        {bookmark.name}
                      </a>
                    </Text>
                    <Text size="1" color="gray">{bookmark.url}</Text>
                  </Flex>
                  <Flex gap="2">
                    <IconButton 
                      size="1" 
                      variant={bookmark.isFavorite ? "solid" : "outline"} 
                      color="amber"
                      onClick={() => handleToggleFavorite(bookmark.id, bookmark.isFavorite)}
                    >
                      <StarIcon />
                    </IconButton>
                    <IconButton 
                      size="1" 
                      variant="outline" 
                      color="crimson"
                      onClick={() => handleDelete(bookmark.id)}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        ) : (
          <Box py="6">
            <Text align="center" color="gray">No bookmarks yet. Add your first one!</Text>
          </Box>
        )}
      </Flex>

      <Dialog.Root open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <Dialog.Content>
          <Dialog.Title>Add New Bookmark</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Enter the URL and name for your new bookmark.
          </Dialog.Description>

          <Form.Root onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
              <Box>
                <Form.Field name="url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control asChild>
                    <TextField.Root
                      size="3"
                      placeholder="https://example.com"
                      value={newBookmarkUrl}
                      onChange={(e) => setNewBookmarkUrl(e.target.value)}
                      type="url"
                      required
                    />
                  </Form.Control>
                  <Form.Message match="valueMissing">Please enter a URL</Form.Message>
                  <Form.Message match="typeMismatch">Please enter a valid URL</Form.Message>
                </Form.Field>
              </Box>

              <Box>
                <Form.Field name="name">
                  <Form.Label>Name (Optional)</Form.Label>
                  <Form.Control asChild>
                    <TextField.Root
                      size="3"
                      placeholder="My Bookmark"
                      value={newBookmarkName}
                      onChange={(e) => setNewBookmarkName(e.target.value)}
                    />
                  </Form.Control>
                </Form.Field>
              </Box>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">Cancel</Button>
                </Dialog.Close>
                <Form.Submit asChild>
                  <Button type="submit" disabled={createBookmark.isPending}>
                    {createBookmark.isPending ? <Spinner /> : 'Add Bookmark'}
                  </Button>
                </Form.Submit>
              </Flex>
            </Flex>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Root>
    </Card>
  );
};

export default BookmarkList;
