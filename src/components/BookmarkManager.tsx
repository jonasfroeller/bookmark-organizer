"use client";

import React, { useState } from 'react';
import { Box, Button, Card, Flex, Heading, TextArea, TextField } from '@/components/ui/RadixTheme';

const BookmarkManager = () => {
    const [folderName, setFolderName] = useState('');
    const [bookmarkUrls, setBookmarkUrls] = useState('');
    const [bookmarkNames, setBookmarkNames] = useState('');
    const [bookmarkTitle, setBookmarkTitle] = useState('Bookmarks');

    const download = () => {
        const urls = bookmarkUrls.split('\n').filter(url => url.trim() !== '');
        const names = bookmarkNames.split('\n');
        let output = `<!DOCTYPE netscape-bookmark-file-1>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <title>${bookmarkTitle ?? 'Bookmarks'}</title>
                        <h1>${bookmarkTitle ?? 'Bookmarks'}</h1>
                        <dl><p>`;

        if (folderName) {
            output += `<dt><h3>${folderName}</h3><dl><p>`;
        }

        urls.forEach((url, index) => {
            const name = names[index]?.trim() ?? url;
            output += `<dt><a href="${url}">${name}</a>`;
        });

        if (folderName) {
            output += `</dl></p>`;
        }

        output += `</dl></p>`;

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
        element.setAttribute('download', 'bookmarks.html');
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Card size="2" className="w-full">
            <Flex direction="column" gap="4" p="4">
                <Heading as="h3" size="5">Bookmark Manager</Heading>
                
                <Box>
                    <TextArea
                        placeholder="Enter URLs (one per line)"
                        value={bookmarkUrls}
                        onChange={(e) => setBookmarkUrls(e.target.value)}
                        size="3"
                        rows={5}
                    />
                </Box>
                
                <Box>
                    <TextArea
                        placeholder="Enter Names (one per line, optional)"
                        value={bookmarkNames}
                        onChange={(e) => setBookmarkNames(e.target.value)}
                        size="3"
                        rows={5}
                    />
                </Box>
                
                <Box>
                    <TextField.Root
                        size="3"
                        placeholder="Folder Name (optional)"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                </Box>
                
                <Box>
                    <TextField.Root
                        size="3"
                        placeholder="Bookmark Title (default: 'Bookmarks')"
                        value={bookmarkTitle}
                        onChange={(e) => setBookmarkTitle(e.target.value)}
                    />
                </Box>
                
                <Flex justify="center">
                    <Button 
                        onClick={download} 
                        disabled={!bookmarkUrls.trim()}
                        size="3"
                        variant="solid"
                        color="amber"
                    >
                        Download Bookmarks
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};

export default BookmarkManager;
