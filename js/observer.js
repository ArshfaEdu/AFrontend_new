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

      // add style to main tag based on page
      addStyle(pagesToObserve, pageName);

      Footer();

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
    } catch (e) {
      console.log(e);
      return;
    }
  })
);

observer.observe(document.body, { subtree: true, childList: true });
