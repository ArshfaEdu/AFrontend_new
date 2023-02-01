/*
=================================
        Helper Functions
=================================
*/

function tryCatch(func) {
  try {
    func();
  } catch (x) {
    //console.log(x);
  }
}

function editPrice(priceContent) {
  let price = priceContent.textContent.replace(" ", "").replace("ر.س.", "");

  priceContent.textContent = " SAR " + price.split(",")[0];
}

function setLogoCategory(logo) {
  // get the acronym (short name) of the university
  let currentUniversity = location.pathname.split("/").pop();

  // set the path of the logo image using the acronym
  logo.setAttribute(
    "src",
    `https://cdn.jsdelivr.net/gh/AbdulazizYas/AFrontend/dist/images/${currentUniversity}.svg`
  );

  // set the alt
  logo.setAttribute("alt", currentUniversity);

  // set styles for the image
  logo.setAttribute("style", "width: 192px;height:192px");
}

function setSuggestBtnCategory(suggestBtn) {
  // get the acronym (short name) of the university
  let currentUniversity = location.pathname.split("/").pop();

  suggestBtn.setAttribute(
    "href",
    `/suggest-course?university=${currentUniversity}`
  );
  suggestBtn.setAttribute("target", "_blank");
  suggestBtn.setAttribute("class", "btn btn-primary mb-6 suggestBtn");
  suggestBtn.setAttribute("style", "width: 30vmin");
  suggestBtn.textContent = "اقترح مادة";
}

/*
================================
   General Purposes Functions
================================
*/

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

function getPageName(path) {
  if (path.includes("account")) {
    return path.includes("courses") ? "userCourses" : "account";
  } else if (path.includes("courses")) {
    return path.includes("contents") ? "contents" : "courses";
  } else if (path.includes("categories")) {
    return "category";
  } else if (path.startsWith("/@")) {
    return "profile";
  } else if (path.startsWith("/difficulties")) {
    return "level";
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

/*
================================
   Main Components Functions
================================
*/

function cards() {
  const cards = document.querySelectorAll(".card.lift");
  if (cards.length === 0) {
    return;
  }
  cards.forEach((card) => {
    // for editing the price
    let priceContent = card.querySelector(".card-footer > div:first-child ins");
    editPrice(priceContent);

    // for editing the buttons
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
  } else if (location.pathname === "/instructor") {
    navLinks.item(3).classList.add("active");
  }
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

function Footer() {
  let footer = document.querySelector(".app-layout > footer.footer");

  footer.innerHTML = `<div><div class="footer-content px-6"><div class="logo-and-information"><div class="logo"><img src="https://a-frontend-kappa.vercel.app/dist/images/logolight.svg" alt="شعار أرشفة"></div><ul class="social"><li><a href="https://twitter.com/ArshfaEdu" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve"><path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm-45.091,392.158c113.283,0 175.224,-93.87 175.224,-175.223c0,-2.682 0,-5.364 -0.128,-7.919c12.005,-8.684 22.478,-19.54 30.779,-31.928c-10.983,4.853 -22.861,8.174 -35.377,9.706c12.772,-7.663 22.478,-19.668 27.076,-34.099c-11.878,7.024 -25.032,12.132 -39.081,14.942c-11.239,-12.005 -27.203,-19.412 -44.955,-19.412c-33.972,0 -61.558,27.586 -61.558,61.558c0,4.853 0.511,9.578 1.66,14.048c-51.213,-2.554 -96.552,-27.075 -126.947,-64.368c-5.237,9.068 -8.302,19.668 -8.302,30.907c0,21.328 10.856,40.23 27.459,51.213c-10.09,-0.255 -19.541,-3.065 -27.842,-7.662l0,0.766c0,29.885 21.2,54.661 49.425,60.409c-5.108,1.404 -10.6,2.171 -16.219,2.171c-3.96,0 -7.791,-0.383 -11.622,-1.15c7.79,24.521 30.523,42.274 57.471,42.784c-21.073,16.476 -47.637,26.31 -76.501,26.31c-4.981,0 -9.834,-0.256 -14.687,-0.894c26.948,17.624 59.387,27.841 94.125,27.841Z"/></svg></a></li><li><a href="http://youtube.com/@kfupmarshfa598" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve"><path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm153.315,178.978c-3.68,-13.769 -14.522,-24.61 -28.29,-28.29c-24.958,-6.688 -125.025,-6.688 -125.025,-6.688c0,0 -100.067,0 -125.025,6.688c-13.765,3.68 -24.61,14.521 -28.29,28.29c-6.685,24.955 -6.685,77.024 -6.685,77.024c0,0 0,52.067 6.685,77.02c3.68,13.769 14.525,24.614 28.29,28.293c24.958,6.685 125.025,6.685 125.025,6.685c0,0 100.067,0 125.025,-6.685c13.768,-3.679 24.61,-14.524 28.29,-28.293c6.685,-24.953 6.685,-77.02 6.685,-77.02c0,0 0,-52.069 -6.685,-77.024Zm-185.316,125.025l0,-96.002l83.137,48.001l-83.137,48.001Z"/></svg></a></li><li><a href="http://wa.me/966532735025" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve"><path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm121.527,134.844c-30.646,-30.672 -71.401,-47.571 -114.822,-47.588c-89.468,0 -162.284,72.788 -162.319,162.256c-0.012,28.599 7.462,56.516 21.666,81.122l-23.028,84.086l86.048,-22.564c23.708,12.927 50.401,19.739 77.568,19.751l0.067,0c89.459,0 162.281,-72.797 162.317,-162.266c0.017,-43.358 -16.851,-84.127 -47.497,-114.797Zm-114.821,249.657l-0.054,0c-24.209,-0.01 -47.953,-6.511 -68.667,-18.799l-4.927,-2.924l-51.061,13.391l13.629,-49.769l-3.208,-5.102c-13.505,-21.473 -20.637,-46.293 -20.627,-71.776c0.03,-74.362 60.552,-134.861 134.969,-134.861c36.035,0.014 69.908,14.062 95.38,39.554c25.472,25.493 39.492,59.379 39.478,95.416c-0.03,74.367 -60.551,134.869 -134.912,134.87Zm74.003,-101.01c-4.056,-2.029 -23.996,-11.838 -27.715,-13.191c-3.717,-1.353 -6.42,-2.03 -9.124,2.029c-2.704,4.059 -10.477,13.192 -12.843,15.898c-2.365,2.705 -4.731,3.045 -8.787,1.014c-4.056,-2.028 -17.124,-6.31 -32.615,-20.124c-12.057,-10.75 -20.197,-24.029 -22.563,-28.087c-2.365,-4.059 -0.252,-6.253 1.779,-8.275c1.824,-1.816 4.055,-4.735 6.083,-7.103c2.028,-2.368 2.704,-4.059 4.056,-6.764c1.352,-2.707 0.676,-5.074 -0.338,-7.104c-1.014,-2.029 -9.125,-21.986 -12.505,-30.104c-3.291,-7.906 -6.635,-6.836 -9.125,-6.96c-2.363,-0.118 -5.069,-0.143 -7.773,-0.143c-2.704,0 -7.097,1.015 -10.816,5.074c-3.717,4.059 -14.194,13.868 -14.194,33.824c0,19.957 14.533,39.236 16.561,41.943c2.028,2.706 28.599,43.659 69.284,61.221c9.676,4.177 17.231,6.672 23.121,8.541c9.716,3.085 18.557,2.65 25.546,1.606c7.792,-1.164 23.996,-9.809 27.375,-19.279c3.379,-9.471 3.379,-17.589 2.366,-19.28c-1.014,-1.691 -3.718,-2.706 -7.773,-4.736Z"/></svg></a></li></ul></div><nav class="links"><h4>عن أرشفة</h4><ul><li class="mb-1"><a href="https://twitter.com/ArshfaEdu" target="_blank" title="ما هي أرشفة">ما هي أرشفة</a></li><li class="mb-1"><a href="https://arshfa.net/feedback" target="_blank" title="شاركنا رأيك">شاركنا رأيك</a></li><li class="mb-1"><a href="https://arshfa.net/terms-and-condition" target="_blank" title="الشروط والأحكام">الشروط والأحكام</a></li></ul></nav><nav class="links"><h4>روابط سريعة</h4><ul><li class="mb-1"><a href="https://kfupm.arshfa.net/" target="_blank" title="أرشفة KFUPM">أرشفة KFUPM</a></li><li class="mb-1"><a href="https://arshfa.net/suggest-course" target="_blank" title="اقترح مادة">اقترح مادة</a></li><li class="mb-1"><a href="https://arshfa.net/instructor" target="_blank" title="انضم كصانع محتوى">انضم كصانع محتوى</a></li></ul></nav><nav class="links"><h4>مركز المساعدة</h4><ul><li class="mb-1"><a href="http://wa.me/966532735025" target="_blank" title="تواصل معنا">تواصل معنا</a></li><li class="mb-1"><a href="https://arshfa.net/faq" target="_blank" title="الأسئلة الشائعة">الأسئلة الشائعة</a></li></ul></nav></div><div class="bottom text-gray-800 font-size-sm-alone d-flex text-center mt-2"><div class="payments d-flex align-items-center"><div class="payment-logo border rounded p-1 me-1"><img src="https://cdn.msaaq.com/assets/images/payments/amex.svg" alt="AMEX" class="img-fluid"></div><div class="payment-logo border rounded p-1 me-1"><img src="https://cdn.msaaq.com/assets/images/payments/mada.svg" alt="MADA" class="img-fluid"></div><div class="payment-logo border rounded p-1 me-1"><img src="https://cdn.msaaq.com/assets/images/payments/knet.svg" alt="KNET" class="img-fluid"></div><div class="payment-logo border rounded p-1 me-1"><img src="https://cdn.msaaq.com/assets/images/payments/applepay.svg" alt="Apple Pay" class="img-fluid"></div><div class="payment-logo border rounded p-1 me-1"><img src="https://cdn.msaaq.com/assets/images/payments/visa.svg" alt="VISA" class="img-fluid"></div><div class="payment-logo border rounded p-1 me-1"><img src="https://cdn.msaaq.com/assets/images/payments/master.svg" alt="MASTER" class="img-fluid"></div></div><div class="left"><div class="info"><p class="copyrights m-0">الحقوق محفوظة © 2023، أرشفة</p><div class="govermental-info"><p class="m-0" style="color:#b9b9b9!important">رقم السجل التجاري 2050162146</p></div></div><a href="https://maroof.sa/276429" target="_blank"><img src="https://maroof.sa/Content/Stamps/ImageCr.png" alt="maroof arshfa" style="width:92px"></a></div></div></div>`;
}

/*
================================
      Main Pages Functions
================================
*/

function courseInfo() {
  /* ==== For the tabs ==== */

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

  /* ==== For instructor ==== */
  const instructorContainer = document.querySelector(
    "#instructors .media-body"
  );

  const instructor = document.querySelector(
    "main.academy-courses-show>.container>.row>div:first-child>div:first-of-type a[href*='difficulties']"
  );

  const button = document.createElement("button");
  button.setAttribute("class", "d-block");
  button.textContent = instructor.textContent;
  button.addEventListener("click", (e) => {
    location.href = instructor.getAttribute("href");
  });

  const wrapperAvatar = document.createElement("div");
  wrapperAvatar.setAttribute("class", "avatar avatar-custom");
  let avatar = instructorContainer.parentElement.querySelector(
    "a.avatar.avatar-custom"
  );
  wrapperAvatar.innerHTML = avatar.innerHTML;
  instructorContainer.parentElement
    .querySelector(".rounded-circle")
    .replaceChild(wrapperAvatar, avatar);

  instructorContainer.replaceChild(
    button,
    instructorContainer.querySelector("a")
  );

  /* === For editign price content === */
  let priceContent = document.querySelector(
    ".container>.row>div:last-child>div>div>div:not(.plyr) ins"
  );
  editPrice(priceContent);
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
}

function category() {
  // create img for the logo
  let logo = document.createElement("img");
  setLogoCategory(logo);

  /* Add suggest course button */
  let suggestBtn = document.createElement("a");
  setSuggestBtnCategory(suggestBtn);

  let container = null;
  let main = document.querySelector("main.academy-categories-show");

  // to add coming soon
  if (main.children.length === 0 && !main.querySelector(".no-courses")) {
    container = document.createElement("div");
    container.setAttribute(
      "class",
      "d-flex no-courses w-75 mx-auto justify-content-center align-items-center text-align-center"
    );
    container.setAttribute(
      "style",
      "flex-direction:column;row-gap:4rem;padding:4rem 0;"
    );
    let h1 = document.createElement("h1");
    h1.setAttribute(
      "style",
      "color:var(--ar-dark)!important;font-size:8vmin;font-weight:bold;text-align:center;"
    );
    h1.textContent = "جايينكم قريب ...";
    container.appendChild(logo);
    container.appendChild(suggestBtn);
    container.appendChild(h1);

    let comment = document.querySelector("main.academy-categories-show")
      .childNodes[3];
    comment.replaceWith(container);
  } else {
    // get the title to replace
    const title = document.querySelector(
      "main .container > div:first-of-type h1"
    );

    // replace the title with the new created image
    title.parentElement.setAttribute("style", "margin-bottom: 3rem;");
    title.replaceWith(logo);

    let cardsContainer = logo.parentElement.parentElement.nextElementSibling;
    let cardsParent = cardsContainer.children[0];
    cardsContainer.insertBefore(suggestBtn, cardsParent);
  }
}

function level() {
  if (document.querySelector("img[alt='instructor']")) {
    return;
  }
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/gh/AbdulazizYas/AFrontend/dist/images/avatar.svg"
  );
  img.setAttribute("alt", "instructor");
  img.setAttribute("class", "avatar-img");

  const avatarWrapper = document.createElement("div");
  avatarWrapper.setAttribute(
    "style",
    "width:148px;margin-bottom:1.4rem;margin-left:auto;margin-right:auto;"
  );
  avatarWrapper.appendChild(img);

  let levelName = document.querySelector(
    "main .container>div:first-of-type>.col-12 h1"
  );

  levelName.parentElement.insertBefore(avatarWrapper, levelName);

  // title of the page
  let title = document.createElement("h2");
  title.textContent = "دورات المحاضر";
  title.setAttribute(
    "style",
    "margin-bottom:3rem;color:var(--ar-secondary)!important;"
  );
  let coursesCotainer = document.querySelector(
    "main.teacher-page .container > .mt-30px > .row"
  );

  coursesCotainer.parentElement.insertBefore(title, coursesCotainer);
}
