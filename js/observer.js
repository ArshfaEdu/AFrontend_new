const pagesToObserve = {
  courses: "academy-courses-show",
  contents: "academy-contents-show",
  account: "academy-user-account",
  userCourses: "academy-user-account-courses",
};

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList")
      if (mutation.addedNodes.length === 0) return;
    const node = mutation.addedNodes[0];
    if (!node || !node.querySelector) return;

    let pageName = getPageName(location.pathname);

    try {
      // check the activatibility of header link
      headerLinks();

      switch (pageName) {
        case "courses":
          courseInfo();
          break;
        case "contents":
          courseContent();
          break;
        default:
          clearOther(pagesToObserve);
          break;
      }

      // add style to main tag based on page
      addStyle(pagesToObserve, pageName);

      Footer();
    } catch (e) {
      return;
    }
  })
);

observer.observe(document.body, { subtree: true, childList: true });
