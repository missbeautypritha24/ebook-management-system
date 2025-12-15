const bookContainer = document.getElementById("bookContainer");
const searchInput = document.getElementById("searchInput");

let books = [];

// Generate 500 preloaded books
for (let i = 1; i <= 500; i++) {
    books.push({
        title: "Book Title " + i,
        author: "Author " + ((i % 20) + 1),
        category: ["Technology", "Science", "Fiction", "Education", "History"][i % 5]
    });
}

// Display books
function displayBooks(bookList) {
    bookContainer.innerHTML = "";
    bookList.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p class="category">${book.category}</p>
        `;
        bookContainer.appendChild(bookCard);
    });
}

// Search functionality
searchInput.addEventListener("keyup", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
    );
    displayBooks(filteredBooks);
});

// Initial Load
displayBooks(books);
