function clearResults(section) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
}

function displayResults(response, section) {
  "use strict";
  const OPENNEWTAB = "_blank";

  clearResults(section);

  response.items.forEach(function (item) {
    var book = document.createElement("div");

    var titleLink = document.createElement("a");
    titleLink.href = item.volumeInfo.infoLink;
    titleLink.target = OPENNEWTAB;
    titleLink.textContent = item.volumeInfo.title
    var title = document.createElement("h4");

    var authorLink = document.createElement("a");
    authorLink.href = item.volumeInfo.infoLink;
    authorLink.target = OPENNEWTAB;
    authorLink.textContent = item.volumeInfo.authors
    var author = document.createElement("div");

    var publisherLink = document.createElement("a");
    publisherLink.href = item.volumeInfo.infoLink;
    publisherLink.target = OPENNEWTAB;
    publisherLink.textContent = item.volumeInfo.publisher
    var publisher = document.createElement("div");

    var imageLink = document.createElement("a");
    imageLink.href = item.volumeInfo.infoLink;
    imageLink.target = OPENNEWTAB;
    var image = document.createElement("img");
    image.src = item.volumeInfo.imageLinks.thumbnail;
    image.alt = "No Image Available";

    book.appendChild(document.createElement("hr"));

    book.appendChild(title);
    title.appendChild(titleLink);

    book.appendChild(author);
    author.appendChild(authorLink);

    book.appendChild(publisher);
    publisher.appendChild(publisherLink);

    imageLink.appendChild(image);
    book.appendChild(imageLink);

    section.appendChild(book);
  });
}

function handleResponse(response) {
  "use strict";
  var section = document.querySelector('section');

  if (response.totalItems === 0) {
    section.innerHTML = "No Results Found";
  } else {
    displayResults(response, section);
  }
}

function bookSearch() {
  "use strict";

  // The maximum number of results the API will return is 40
  const MAXDISPLAYSIZE = 15;

  var script = document.createElement("script");
  var searchCriteria = document.getElementById("bookInput").value;
  script.src = "https://www.googleapis.com/books/v1/volumes?q=" + searchCriteria + "&maxResults=" + MAXDISPLAYSIZE + "&callback=handleResponse";
  document.body.appendChild(script);
}

const ENTERKEY = 13;

document.getElementById("bookInput").addEventListener("keyup", function (event) {
  "use strict";
  event.preventDefault();
  if (event.keyCode === ENTERKEY) {
      document.getElementById("bookSearch").click();
  }
});
