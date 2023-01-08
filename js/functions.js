function courseInfo() {
  // save the nav
  const nav = document
    .querySelector("main > .container > .row > div:first-child #overview > nav")
    .cloneNode(true);

  // remove all the  pre-navs
  document
    .querySelectorAll(
      "main > .container > .row > div:first-child > div:not(:first-of-type) nav"
    )
    .forEach((el) => el.remove());

  // Hide all sections' contents except overview section
  document
    .querySelectorAll(
      "main > .container > .row > div:first-child > div:not(:first-of-type)"
    )
    .forEach((el) => {
      if (el.getAttribute("id") !== "overview") el.style.display = "none";
    });

  // reference the overview section to insert nav before it
  const overview = document.querySelector("#overview");

  console.log("overview: " + (overview ? "exist" : "does not exist"));
  console.log("nav: " + (nav ? "exist" : "does not exist"));

  // insert the saved node before overview section
  document
    .querySelector("main > .container > .row > div:first-child")
    .insertBefore(nav, overview);

  // reference the nav links to add click listener
  const links = document.querySelectorAll(
    "main > .container > .row > div:first-child nav .nav-item .nav-link"
  );

  // click listener for nav links
  function click(e) {
    // toggle active class for nav links
    links.forEach((el) => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    // display the nav link content
    let navContent = e.target.getAttribute("href");
    document
      .querySelectorAll(
        "main > .container > .row > div:first-child > div:not(:first-of-type)"
      )
      .forEach((content) => (content.style.display = "none"));
    document.querySelector(navContent).style.display = "block";

    console.log("clicked");
  }
  links.forEach((el) => el.addEventListener("click", click));
}

function courseContent() {}

function addStyle(pagesToObserve, pageRoute) {
  const main = document.querySelector("main");

  if (pagesToObserve[pageRoute] === undefined) {
    return;
  }

  if (main.classList.contains(pagesToObserve[pageRoute])) {
    return;
  }
  main.setAttribute("class", "");
  main.classList.add(pagesToObserve[pageRoute]);
}

function clearOther(pagesToObserve) {
  const main = document.querySelector("main");
  for (const page in pagesToObserve) {
    main.classList.remove(pagesToObserve[page]);
  }
}
