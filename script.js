const bookContainer = document.getElementById("bookContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Preloaded 500 books
let books = [];
for (let i = 1; i <= 500; i++) {
    books.push({
        title: "Book Title " + i,
        author: "Author " + ((i % 20) + 1),
        category: ["Technology","Science","Fiction","Education","History"][i % 5],
        price: "$" + ((i % 50) + 10),
        rating: ((i % 5) + 1),
        image: "https://via.placeholder.com/120x180?text=Book+" + i
    });
}

// Display books
function displayBooks(bookList) {
    if(!bookContainer) return;
    bookContainer.innerHTML = "";
    bookList.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Rating:</strong> ${book.rating}/5</p>
            <p class="category">${book.category}</p>
        `;
        bookContainer.appendChild(bookCard);
    });
}

// Search functionality
if(searchInput){
    searchInput.addEventListener("keyup", () => {
        const searchValue = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue) ||
            book.category.toLowerCase().includes(searchValue)
        );
        displayBooks(filteredBooks);
    });
}

if(categoryFilter){
    categoryFilter.addEventListener("change", () => {
        const category = categoryFilter.value;
        const filteredBooks = category ? books.filter(book => book.category === category) : books;
        displayBooks(filteredBooks);
    });
}

// Admin: Add book
const addBookBtn = document.getElementById("addBookBtn");
if(addBookBtn){
    addBookBtn.addEventListener("click", () => {
        const newBook = {
            title: document.getElementById("bookTitle").value,
            author: document.getElementById("bookAuthor").value,
            category: document.getElementById("bookCategory").value,
            price: document.getElementById("bookPrice").value,
            rating: document.getElementById("bookRating").value,
            image: document.getElementById("bookImage").value || "https://via.placeholder.com/120x180"
        };
        books.push(newBook);
        alert("Book added successfully!");
        displayBooks(books);
    });
}

// Initial Load
displayBooks(books);
