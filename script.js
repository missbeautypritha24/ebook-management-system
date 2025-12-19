/* ================= GLOBAL ================= */

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const bookGrid = document.getElementById("bookGrid");

let books = [];

/* ================= AUTH ================= */

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "admin" && pass === "admin") {
    loginPage.style.display = "none";
    dashboard.style.display = "block";
    loadBooks();
  } else {
    alert("❌ Invalid username or password");
  }
}

function logout() {
  localStorage.removeItem("books");
  location.reload();
}

/* ================= LOAD BOOKS ================= */

async function loadBooks() {
  bookGrid.innerHTML = `<p style="opacity:.7">⏳ Loading 500 real books…</p>`;

  const cached = localStorage.getItem("books");
  if (cached) {
    books = JSON.parse(cached);
    renderBooks();
    return;
  }

  books = [];
  const subjects = [
    "computer_science",
    "artificial_intelligence",
    "machine_learning",
    "data_science",
    "programming",
    "software_engineering",
    "algorithms",
    "databases",
    "networks",
    "operating_systems"
  ];

  const seen = new Set();

  for (const subject of subjects) {
    try {
      const res = await fetch(
        `https://openlibrary.org/subjects/${subject}.json?limit=80`
      );
      const data = await res.json();

      for (const b of data.works) {
        if (
          b.title &&
          b.authors?.length &&
          b.cover_id &&
          !seen.has(b.key)
        ) {
          seen.add(b.key);

          books.push({
            name: b.title,
            author: b.authors[0].name,
            price: 250 + Math.floor(Math.random() * 750),
            image: `https://covers.openlibrary.org/b/id/${b.cover_id}-L.jpg`
          });
        }

        if (books.length >= 500) break;
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }

    if (books.length >= 500) break;
  }

  books = books.slice(0, 500);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

/* ================= RENDER BOOKS ================= */

function renderBooks() {
  bookGrid.innerHTML = "";

  books.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.image}" alt="${book.name}">
      <h4 title="${book.name}">${book.name}</h4>
      <span>${book.author}</span><br>
      <span>₹${book.price}</span>

      <div class="book-actions">
        <button class="delete-btn" onclick="deleteBook(${index})">
          Delete
        </button>
      </div>
    `;

    bookGrid.appendChild(card);
  });
}

/* ================= DELETE BOOK ================= */

function deleteBook(index) {
  const confirmDelete = confirm(
    `🗑 Are you sure you want to delete:\n"${books[index].name}" ?`
  );

  if (!confirmDelete) return;

  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

/* ================= ADD BOOK ================= */

function addBook() {
  const name = bookName.value.trim();
  const auth = author.value.trim();
  const pr = price.value.trim();
  const img = image.value.trim();

  if (!name || !auth || !pr) {
    alert("⚠ Please fill all required fields");
    return;
  }

  books.unshift({
    name,
    author: auth,
    price: pr,
    image: img || "https://picsum.photos/300/450"
  });

  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();

  bookName.value = "";
  author.value = "";
  price.value = "";
  image.value = "";

  alert("✅ Book added successfully");
}
