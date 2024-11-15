const apiBaseURL = "https://my-json-server.typicode.com/Wusixuan803/myproject";

if (window.location.pathname.includes("index.html")) {
  fetch(apiBaseURL + "/books")
    .then((response) => response.json())
    .then((books) => {
      const bookList = document.getElementById("book-list");
      books.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        bookItem.innerHTML = `
          <img src="${book.image_url}" alt="${book.title}" class="book-image">
          <div class="book-info">
            <a href="book.html?id=${book.id}">${book.title}</a>
            <p class="book-author">by ${book.author}</p>
          </div>`;

        bookList.appendChild(bookItem);
      });
    })
    .catch((error) => console.error("Error fetching books:", error));
}

if (window.location.pathname.includes("book.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");
  fetch(apiBaseURL + "/books/" + bookId)
    .then((response) => response.json())
    .then((book) => {
      const bookDetails = document.getElementById("book-details");
      bookDetails.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.image_url}" alt="${
        book.title
      }" class="book-detail-image">
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Published:</strong> ${book.publish_date}</p>
        <p><strong>Pages:</strong> ${book.page_count}</p>
        <p><strong>Subjects:</strong> ${book.subjects.join(", ")}</p>`;
    })
    .catch((error) => console.error("Error fetching book details:", error));
}

if (window.location.pathname.includes("create.html")) {
  document
    .getElementById("create-book-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const newBook = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        publish_date: document.getElementById("publish_date").value,
        page_count: document.getElementById("page_count").value,
        subjects: document
          .getElementById("subjects")
          .value.split(",")
          .map((subject) => subject.trim()),
        image_url: document.getElementById("image_url")
          ? document.getElementById("image_url").value
          : "",
      };

      console.log("Simulated book creation:", newBook);
      alert("Book created successfully!");

      document.getElementById("create-book-form").reset();
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
}
