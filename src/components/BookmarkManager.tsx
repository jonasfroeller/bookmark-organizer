"use client";

import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';

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
                        <title>${bookmarkTitle || 'Bookmarks'}</title>
                        <h1>${bookmarkTitle || 'Bookmarks'}</h1>
                        <dl><p>`;

        if (folderName) {
            output += `<dt><h3>${folderName}</h3><dl><p>`;
        }

        urls.forEach((url, index) => {
            const name = names[index] && names[index].trim() ? names[index] : url;
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
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Bookmark Manager</h2>
            <textarea
                className="w-full p-2 border rounded mb-2"
                rows={5}
                placeholder="Enter URLs (one per line)"
                value={bookmarkUrls}
                onChange={(e) => setBookmarkUrls(e.target.value)}
            />
            <textarea
                className="w-full p-2 border rounded mb-2"
                rows={5}
                placeholder="Enter Names (one per line, optional)"
                value={bookmarkNames}
                onChange={(e) => setBookmarkNames(e.target.value)}
            />
            <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Folder Name (optional)"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Bookmark Title (default: 'Bookmarks')"
                value={bookmarkTitle}
                onChange={(e) => setBookmarkTitle(e.target.value)}
            />
            <Button onClick={download} disabled={!bookmarkUrls.trim()}>
                Download Bookmarks
            </Button>
        </div>
    );
};

export default BookmarkManager;
