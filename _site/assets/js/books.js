function handleResponse(response) {
  "use strict";
  document.getElementById("content").innerHTML = "";
  if (response.totalItems === 0) {
    document.getElementById("content").innerHTML = "No Results Found";
  }
  response.items.forEach(function (item) {
    var book = document.createElement("div");
    var titleLink = document.createElement("a");
    titleLink.href = item.volumeInfo.infoLink;
    titleLink.target = "_blank";
    var title = document.createElement("h4");
    title.innerHTML = item.volumeInfo.title;
    var authorLink = document.createElement("a");
    authorLink.href = item.volumeInfo.infolink;
    authorLink.target = "_blank";
    var author = document.createElement("div");
    author.innerHTML = item.volumeInfo.authors;
    var publisherLink = document.createElement("a");
    publisherLink.href = item.volumeInfo.infoLink;
    publisherLink.target = "_blank";
    var publisher = document.createElement("div");
    publisher.innerHTML = item.volumeInfo.publisher;
    var imgLink = document.createElement("a");
    imgLink.href = item.volumeInfo.infoLink;
    imgLink.target = "_blank";
    var image = document.createElement("IMG");
    image.src = item.volumeInfo.imageLinks.thumbnail;
    image.alt = "No Image Available";

    book.appendChild(document.createElement("hr"));
    titleLink.appendChild(title);
    book.appendChild(titleLink);
    authorLink.appendChild(author);
    book.appendChild(authorLink);
    publisherLink.appendChild(publisher);
    book.appendChild(publisherLink);
    imgLink.appendChild(image);
    book.appendChild(imgLink);
    document.getElementById("content").appendChild(book);
  });
}

function bookSearch() {
  "use strict";
  var script = document.createElement("script");
  var searchCriteria = document.getElementById("bookInput").value;
  script.src = "https://www.googleapis.com/books/v1/volumes?q=" + searchCriteria + "&callback=handleResponse";
  document.body.appendChild(script);
}

document.getElementById("bookInput").addEventListener("keyup", function (event) {
  "use strict";
  event.preventDefault();
  if (event.keyCode === 13) {
      document.getElementById("bookSearch").click();
  }
});
