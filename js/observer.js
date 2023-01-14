const pagesToObserve = {
  courses: "academy-courses-show",
  contents: "academy-contents-show",
  account: "academy-user-account",
  userCourses: "academy-user-account-courses",
  category: "academy-categories-show",
};

const observer = new MutationObserver((mutations, observer) =>
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList")
      if (mutation.addedNodes.length === 0) return;
    const node = mutation.addedNodes[0];
    if (!node || !node.querySelector) return;

    let pageName = getPageName(location.pathname);

    //try {
    // check the activatibility of header link
    tryCatch(headerLinks());

    // add style to main tag based on page
    tryCatch(addStyle(pagesToObserve, pageName));

    tryCatch(Footer());

    tryCatch(auth());

    tryCatch(cards());
    // clear the styles of main, if the page is unknown
    if (pageName === "unknown") {
      tryCatch(clearOther(pagesToObserve));
    }

    switch (pageName) {
      case "courses":
        courseInfo();
        break;
      case "contents":
        courseContent();
        break;
      case "category":
        category();
        break;
    }
    //} catch {
    //  return;
    //}
  })
);

observer.observe(document.body, { subtree: true, childList: true });
