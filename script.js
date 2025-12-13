
// const books = [
//     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "fiction", status: "available", icon: "📖" },
//     { title: "To Kill a Mockingbird", author: "Harper Lee", category: "fiction", status: "checked-out", icon: "🦅" },
//     { title: "1984", author: "George Orwell", category: "fiction", status: "available", icon: "👁️" },
//     { title: "A Brief History of Time", author: "Stephen Hawking", category: "science", status: "available", icon: "🌌" },
//     { title: "The Selfish Gene", author: "Richard Dawkins", category: "science", status: "available", icon: "🧬" },
//     { title: "Sapiens", author: "Yuval Noah Harari", category: "history", status: "checked-out", icon: "🏛️" },
//     { title: "The Diary of Anne Frank", author: "Anne Frank", category: "history", status: "available", icon: "📔" },
//     { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "fiction", status: "available", icon: "⚡" },
//     { title: "Cosmos", author: "Carl Sagan", category: "science", status: "checked-out", icon: "🔭" },
//     { title: "The Hobbit", author: "J.R.R. Tolkien", category: "fiction", status: "available", icon: "🗡️" },
//     { title: "A People's History of the United States", author: "Howard Zinn", category: "history", status: "available", icon: "🗽" },
//     { title: "The Origin of Species", author: "Charles Darwin", category: "science", status: "available", icon: "🦖" }
// ];

// import { books } from "./books";

let currentFilter = 'all';

function renderBooks(booksToRender) {

    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';

    if (booksToRender.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                Nuk u gjetën rezultate për kërkimin tuaj.
            </div>
        `;
        return;
    }

    booksToRender.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
    <div class="book-cover">
        <img src="./imazhe/${book.icon}" alt="${book.title} kopertina" />
        
    </div>
    <div class="book-title">${book.title}</div>
    <div class="book-author">nga ${book.author} <span class="book-status">Sasia: ${book.quantity}</span></div>
    <div class="book-meta">
        <span class="book-category">${book.category}</span>
        <span class="book-status">Çmimi: ${book.price != null ? book.price + 'ALL' : '-'}</span>
    </div>
    `;
        grid.appendChild(card);
    });
}

function filterBooks(category) {
    currentFilter = category;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let filtered = books;
    if (category === 'available') {
        filtered = books.filter(book => book.status === 'available');
    } else if (category !== 'all') {
        filtered = books.filter(book => book.category === category);
    }

    renderBooks(filtered);
}

function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
    renderBooks(filtered);
}

document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchBooks();
    }
});


renderBooks(books);
