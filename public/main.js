document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#details")
    .addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();
    updateLocalStorage = true;

    const destinationName = event.target.elements["name"].value;
    const destinationLocation = event.target.elements["location"].value;
    const destinationDesc = event.target.elements["description"].value;

    resetFormValues(event.target);

    const destinationCard = await createDestinationCard({
      name: destinationName,
      location: destinationLocation,
      description: destinationDesc,
    });
    appendCard(destinationCard);
  }

  function appendCard(destinationCard) {
    const wishListContainer = document.querySelector("#destinations");

    if (wishListContainer.children.length === 0) {
      document.querySelector("#title").innerHTML = "My Wish List";
    }

    destinationCard.classList.add("col-md-3");
    document.querySelector("#destinations").appendChild(destinationCard);
  }

  function resetFormValues(form) {
    for (let i = 0; i < form.length; i++) {
      form.elements[i].value = "";
    }
  }

  async function createDestinationCard({
    name,
    location,
    description,
    imageURL,
  }) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.height = "fit-content";
    card.style.margin = "20px";

    let img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", name);

    if (imageURL === undefined) {
      imageURL = await getPhotoAPI(imageURL);
      img.setAttribute("src", imageURL);
    } else {
      img.setAttribute("src", imageURL);
    }

    card.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-title");

    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = name;
    cardBody.appendChild(cardTitle);

    let cardSubtitle = document.createElement("h6");
    cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
    cardSubtitle.innerText = location;
    cardBody.appendChild(cardSubtitle);

    if (description.length != 0) {
      let cardText = document.createElement("p");
      cardText.setAttribute("class", "card-text");
      cardText.innerText = description;
      cardBody.appendChild(cardText);
    }

    let buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "buttons_container");

    let cardEditBtn = document.createElement("button");
    cardEditBtn.setAttribute("class", "btn btn-warning");
    cardEditBtn.innerText = "Edit";
    cardEditBtn.addEventListener("click", editDestination);

    let cardDeleteBtn = document.createElement("button");
    cardDeleteBtn.setAttribute("class", "btn btn-danger");
    cardDeleteBtn.innerText = "Remove";
    cardDeleteBtn.addEventListener("click", removeDestination);

    buttonsContainer.appendChild(cardEditBtn);
    buttonsContainer.appendChild(cardDeleteBtn);

    cardBody.appendChild(buttonsContainer);

    card.appendChild(cardBody);

    return card;
  }

  async function editDestination(event) {
    let cardBody = event.target.parentElement.parentElement;
    let title = cardBody.children[0];
    let subTitle = cardBody.children[1];
    let description = cardBody.children[2];

    let card = cardBody.parentElement;
    let photoURL = card.children[0];

    let newTitle = window.prompt("Enter new name");
    let newSubtitle = window.prompt("Enter new location");
    let newDescription = window.prompt("Enter new description");

    if (newTitle.length > 0) {
      title.innerText = newTitle;
      photoURL.setAttribute("src", await getPhotoAPI(newTitle));
    }

    if (newSubtitle.length > 0) {
      subTitle.innerText = newSubtitle;
    }

    if (newDescription.length > 0) {
      description.innerText = newDescription;
    }
  }

  function removeDestination(event) {
    let cardBody = event.target.parentElement.parentElement;
    let card = cardBody.parentElement;
    card.remove();
  }

  function getPhotoAPI(query) {
    let baseURL = "https://api.unsplash.com";
    let apiResponse = fetch(
      baseURL +
        "/photos/random/?client_id=" +
        process.env.ACCESS_KEY +
        "&query=" +
        query
    );
    return apiResponse
      .then((data) => data.json())
      .then((results) => results.urls.thumb);
  }
});
