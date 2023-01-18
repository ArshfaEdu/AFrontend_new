function tryCatch(func) {
  try {
    func();
  } catch (x) {
    //console.log(x);
  }
}

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

  // reference the overview section to insert nav before it and add active class
  const overview = document.querySelector("#overview");
  overview.classList.add("active");
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
    e.preventDefault();
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
      .forEach((content) => content.classList.remove("active"));
    document.querySelector(navContent).classList.add("active");
  }
  links.forEach((el) => el.addEventListener("click", click));
}

function courseContent() {
  // for sidebar
  const chapters = document.querySelectorAll(
    "#chaptersSidebarCollapse .sidebar-collapse-scroll a.m-chapter-item"
  );

  chapters.forEach((chapter) => {
    if (chapter.querySelector("s")) {
      chapter.classList.add("finished");
    }
  });

  // for left side (content)
  const contents = document.querySelectorAll(
    "main > div > section:nth-of-type(1) > .container > .row:last-child > div > *"
  );

  contents.forEach((content) => {
    if (content.querySelector(".plyr")) {
      content.setAttribute("data-order", "1");
    } else if (content.nodeName === "H2") {
      content.setAttribute("data-order", "2");
    } else if (content.classList.contains(".alert-info")) {
      content.setAttribute("data-order", "3");
    } else if (content.querySelector("h2")) {
      content.setAttribute("data-order", "4");
    } else {
      content.setAttribute("data-order", "5");
    }
  });
  // let items = contentSection.children;
  // let contents = [];
  // for (let i in items) {
  //   if (items[i].nodeType === 1) contents.push(items[i]);
  // }

  // let videoPlayer = null;
  // let title = null;
  // let details = null;
  // let cert = null;
  // let alert = null;
  // contents.forEach((content) => {
  // if (content.querySelector(".plyr")) {
  //   videoPlayer = content.cloneNode(true);
  // } else if (content.querySelector("h2")) {
  //   title = content.cloneNode(true);
  // } else if (content.classList.contains(".alert-info")) {
  //   alert = content.clone;
  // } else if (content.querySelector("h2")) {
  // }
  // });
}

function category() {
  // get the title to replace
  const title = document.querySelector(
    "main .container > div:first-of-type h1"
  );

  // create img for the logo
  const logo = document.createElement("img");

  // get the acronym (short name) of the university
  let currentUniversity = location.pathname.split("/").pop();

  // set the path of the logo image using the acronym
  logo.setAttribute(
    "src",
    `https://cdn.jsdelivr.net/gh/AbdulazizYas/AFrontend/dist/images/${currentUniversity}.svg`
  );

  // set the alt
  logo.setAttribute("alt", currentUniversity);

  // replace the title with the new created image
  title.parentElement.replaceChild(logo, title);

  /* Add suggest course button */
  const suggestBtn = document.createElement("button");
  suggestBtn.setAttribute("type", "button");
  suggestBtn.setAttribute("class", "btn btn-primary btn-suggestCourse");
  suggestBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="stroke:none;stroke-width:0;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:none;fill-rule:nonzero;opacity:1" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 45 90 c -4.418 0 -8 -3.582 -8 -8 V 8 c 0 -4.418 3.582 -8 8 -8 c 4.418 0 8 3.582 8 8 v 74 C 53 86.418 49.418 90 45 90 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:#fff;fill-rule:nonzero;opacity:1" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/><path d="M 82 53 H 8 c -4.418 0 -8 -3.582 -8 -8 c 0 -4.418 3.582 -8 8 -8 h 74 c 4.418 0 8 3.582 8 8 C 90 49.418 86.418 53 82 53 z" style="stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;fill:#fff;fill-rule:nonzero;opacity:1" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/></g></svg>`;

  logo.parentElement.appendChild(suggestBtn);

  const popupWrapper = document.createElement("div");
  popupWrapper.innerHTML = `<div class="popup" id="suggestCourse"><div class="popup-body"><header><span class="close-button">&times;</span><svg width="296" height="33" viewBox="0 0 296 33" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_3)"><path d="M49.4526 28.6646C48.2435 30.7527 45.9992 32.0314 43.5739 32.0223L21.3744 31.9391L39.4147 1.14831L65.4225 1.14228L49.4526 28.6646ZM23.3153 30.5783L43.5564 30.6541C45.7686 30.6624 47.813 29.4955 48.9172 27.5915L63.4771 2.50307L39.7632 2.50869L23.3153 30.5783Z" fill="url(#paint0_linear_1_3)"/><path d="M43.932 32.0236L21.7325 31.9404C19.3072 31.9313 17.0726 30.6314 15.8791 28.5388L0.11603 0.902009L26.1231 1.10299L43.932 32.0236Z" fill="white"/></g><g clip-path="url(#clip1_1_3)"><path d="M92.7277 4.20475C93.9369 2.11665 96.1811 0.837986 98.6064 0.847077L120.806 0.930283L102.766 31.721L76.7579 31.7271L92.7277 4.20475ZM118.865 2.29109L98.624 2.21523C96.4117 2.20693 94.3674 3.37384 93.2632 5.27782L78.7032 30.3663L102.417 30.3607L118.865 2.29109Z" fill="url(#paint1_linear_1_3)"/><path d="M98.2483 0.845734L120.448 0.928939C122.873 0.93803 125.108 2.23798 126.301 4.33058L142.064 31.9673L116.057 31.7664L98.2483 0.845734Z" fill="white"/></g><g clip-path="url(#clip2_1_3)"><path d="M202.967 28.8159C201.758 30.904 199.513 32.1826 197.088 32.1735L174.889 32.0903L192.929 1.29957L218.937 1.29354L202.967 28.8159ZM176.829 30.7295L197.07 30.8054C199.283 30.8137 201.327 29.6468 202.431 27.7428L216.991 2.65433L193.277 2.65995L176.829 30.7295Z" fill="url(#paint2_linear_1_3)"/><path d="M197.446 32.1749L175.247 32.0917C172.821 32.0826 170.587 30.7826 169.393 28.69L153.63 1.05327L179.637 1.25425L197.446 32.1749Z" fill="white"/></g><g clip-path="url(#clip3_1_3)"><path d="M246.242 4.35601C247.451 2.26791 249.695 0.989247 252.121 0.998337L274.32 1.08154L256.28 31.8723L230.272 31.8783L246.242 4.35601ZM272.379 2.44235L252.138 2.36649C249.926 2.35819 247.882 3.5251 246.777 5.42908L232.217 30.5175L255.931 30.5119L272.379 2.44235Z" fill="url(#paint3_linear_1_3)"/><path d="M251.762 0.996994L273.962 1.0802C276.387 1.08929 278.622 2.38924 279.815 4.48184L295.578 32.1186L269.571 31.9176L251.762 0.996994Z" fill="white"/></g><defs><linearGradient id="paint0_linear_1_3" x1="21.4324" y1="16.4583" x2="65.3645" y2="16.623" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.43" stop-color="#4493D0"/><stop offset="0.75" stop-color="#5BC3B5"/></linearGradient><linearGradient id="paint1_linear_1_3" x1="120.748" y1="16.411" x2="76.8159" y2="16.2463" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.43" stop-color="#4493D0"/><stop offset="0.75" stop-color="#5BC3B5"/></linearGradient><linearGradient id="paint2_linear_1_3" x1="174.947" y1="16.6096" x2="218.879" y2="16.7743" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.43" stop-color="#4493D0"/><stop offset="0.75" stop-color="#5BC3B5"/></linearGradient><linearGradient id="paint3_linear_1_3" x1="274.262" y1="16.5623" x2="230.33" y2="16.3976" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.43" stop-color="#4493D0"/><stop offset="0.75" stop-color="#5BC3B5"/></linearGradient><clipPath id="clip0_1_3"><rect width="65.3069" height="30.9572" fill="white" transform="matrix(0.999993 0.00374807 0.00374807 -0.999993 0 31.859)"/></clipPath><clipPath id="clip1_1_3"><rect width="65.3069" height="30.9572" fill="white" transform="matrix(-0.999993 -0.00374807 -0.00374807 0.999993 142.18 1.0104)"/></clipPath><clipPath id="clip2_1_3"><rect width="65.3069" height="30.9572" fill="white" transform="matrix(0.999993 0.00374807 0.00374807 -0.999993 153.514 32.0102)"/></clipPath><clipPath id="clip3_1_3"><rect width="65.3069" height="30.9572" fill="white" transform="matrix(-0.999993 -0.00374807 -0.00374807 0.999993 295.694 1.16166)"/></clipPath></defs></svg></header><form onsubmit="suggestCourse(event)" id="suggestForm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h4 style="margin:0 0 20px 0">اقترح مادة في هذه الجامعة</h4><input type="text" placeholder="أسم المادة أو اختصارها ؟" required name="entry.975169254" id="name"> <input type="hidden" name="entry.1203211413" value="${currentUniversity}"><button type="submit">اقتراح</button></form></div></div><script>const popup=document.querySelector(".popup"),trigger=document.querySelector("body > button"),closeButton=document.querySelector(".close-button");function togglePopup(){popup.classList.toggle("show-popup")}function windowOnClick(o){o.target===popup&&togglePopup()}trigger.addEventListener("click",togglePopup),closeButton.addEventListener("click",togglePopup),window.addEventListener("click",windowOnClick);const suggestForm=document.getElementById("suggestForm");suggestForm.addEventListener("submit",(e=>{e.preventDefault();const o=new URLSearchParams(new FormData(suggestForm));fetch("https://docs.google.com/forms/u/9/d/e/1FAIpQLSdWJQcS861hpEvUS7GSusSRe5cPdavtPpwhLCeH07aLqJifsA/formResponse",{method:"POST",body:o}).then((e=>{suggestForm.innerHTML='<h4 style="font-size:2em;font-weight:bold;color:green;">وصلنا اقتراحك!</h4>'})).catch((e=>{console.log(e),suggestForm.innerHTML='<h4 style="font-size:2em;font-weight:bold;color:green;">وصلنا اقتراحك!</h4>'}))})</script>`;
  document.querySelector(".app-layout").appendChild(popupWrapper);
}

// const suggestForm = document.getElementById("suggestForm");
// suggestForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const payload = new URLSearchParams(new FormData(suggestForm));
//   fetch(
//     "https://docs.google.com/forms/u/9/d/e/1FAIpQLSdWJQcS861hpEvUS7GSusSRe5cPdavtPpwhLCeH07aLqJifsA/formResponse",
//     {
//       method: "POST",
//       body: payload,
//     }
//   )
//     .then((res) => {
//       suggestForm.innerHTML = `<h4 style="font-size:2em;font-weight:bold;color:green;">وصلنا اقتراحك!</h4>`;
//     })
//     .catch((err) => {
//       console.log(err);
//       suggestForm.innerHTML = `<h4 style="font-size:2em;font-weight:bold;color:green;">وصلنا اقتراحك!</h4>`;
//     });
// });

function cards() {
  const cards = document.querySelectorAll(".card.lift");
  if (cards.length === 0) {
    return;
  }
  cards.forEach((card) => {
    const btns = card.querySelectorAll(
      ".card-footer>div:last-child>div button.btn"
    );

    if (btns.length !== 2) {
      return;
    }
    const browseBtn = btns[1];

    browseBtn.textContent = "تصفح المادة";

    browseBtn.addEventListener("click", (e) => {
      const target = e.target;
      const cardBody =
        target.parentElement.parentElement.parentElement.previousElementSibling;
      const titleLink = cardBody.querySelector("a.stretched-link");

      titleLink.click();
    });
  });
}

function addStyle(pagesToObserve, pageName) {
  const main = document.querySelector("main");
  if (pagesToObserve[pageName] === undefined) {
    return;
  }
  if (main.classList.contains(pagesToObserve[pageName])) {
    return;
  }

  main.setAttribute("class", "");
  main.classList.add(pagesToObserve[pageName]);
}

function clearOther(pagesToObserve) {
  const main = document.querySelector("main");
  for (const page in pagesToObserve) {
    main.classList.remove(pagesToObserve[page]);
  }
}

function headerLinks() {
  if (!document.querySelector(".app-layout > header")) {
    return;
  }

  const navLinks = document.querySelectorAll(
    "header nav .navbar-collapse .nav-link"
  );
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  let path = "/" + location.pathname.split("/")[1];
  if (path === "/") {
    navLinks.item(0).classList.add("active");
  } else if (
    path === "/university" ||
    path === "/categories" ||
    path === "/courses"
  ) {
    navLinks.item(1).classList.add("active");
  } else if (location.pathname === "/account/courses") {
    navLinks.item(2).classList.add("active");
  }
}

function Footer() {
  // check if the the div is the payments div
  if (
    !document
      .querySelector("footer .row > div > div:first-of-type")
      .children[0].classList.contains("payment-logo")
  ) {
    return;
  }

  // save clone for payments methods
  let paymentsMethods = document
    .querySelector("footer .row > div > div:first-of-type")
    .cloneNode(true);

  // make style changes for the cloned
  paymentsMethods.style.padding = "1rem 0 1.5rem";
  paymentsMethods.style.flexWrap = "wrap";
  paymentsMethods.style.justifyContent = "center";

  // add  the cloned to the page (after footer tag)
  document.querySelector(".app-layout").appendChild(paymentsMethods);

  // remove the original one
  document.querySelector("footer .row > div > div:first-of-type").remove();

  //=============== Add logo ===============//

  let logo = `<svg class="logo" width="154" height="73" viewBox="0 0 154 73" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_51_105)"><path d="M116.585 7.96962C113.752 3.03503 108.471 0 102.752 0H50.4033L92.6715 72.7665L154 73.0106L116.585 7.96962ZM54.9679 3.22605H102.699C107.915 3.22605 112.726 5.99579 115.313 10.4953L149.425 69.7846L93.5054 69.5617L54.9679 3.22605Z" fill="url(#paint0_linear_51_105)"/><path d="M103.597 0H51.2478C45.5287 0 40.2478 3.04565 37.415 7.96962L0 73L61.3285 72.7559L103.597 0Z" fill="white"/></g><defs><linearGradient id="paint0_linear_51_105" x1="50.4033" y1="36.5053" x2="154" y2="36.5053" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.43" stop-color="#4493D0"/><stop offset="0.75" stop-color="#5BC3B5"/></linearGradient><clipPath id="clip0_51_105"><rect width="154" height="73" fill="white"/></clipPath></defs></svg>`;
  let footer = document.querySelector("footer");
  footer.innerHTML = footer.innerHTML + logo.repeat(2);
}

function auth() {
  const header = document.querySelector(".app-layout > header");
  if (!header) {
    return;
  }

  let navLinks = document.querySelectorAll(
    "header nav .navbar-collapse .navbar-nav .nav-item"
  );

  if (document.querySelector("body > .popper-container")) {
    // logged in
    navLinks.forEach((el) => {
      if (el.children[0].getAttribute("href").includes("account/courses")) {
        el.style.display = "block";
      }
    });

    header.classList.add("logged-in");
  } else {
    navLinks.forEach((el) => {
      // logged out
      if (el.children[0].getAttribute("href").includes("account/courses")) {
        el.style.display = "none";
      }
    });

    header.classList.remove("logged-in");
  }
}
function getPageName(path) {
  if (path.includes("account")) {
    return path.includes("courses") ? "userCourses" : "account";
  } else if (path.includes("courses")) {
    return path.includes("contents") ? "contents" : "courses";
  } else if (path.includes("categories")) {
    return "category";
  } else if (path.startsWith("/@")) {
    return "profile";
  } else {
    return "unknown";
  }
}

function redirect(links) {
  for (let link in links) {
    if (link === location.pathname) {
      document.body.innerHTML = "";
      location.href = "https://arshfa.net" + links[link];
    }
  }
}
