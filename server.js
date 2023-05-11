const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
let books = [];
app.get('/books', (req, res) => {
    res.json(books);
});
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = {
        id: uuidv4(),
        title,
        author,
        publishedDate: publishedDate || new Date().toISOString(),
    };

    books.push(book);

    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(bookIndex, 1);

    res.json({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
