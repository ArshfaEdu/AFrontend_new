const pagesToObserve = {
  courses: {
    class: "academy-courses-show",
    keywords: [
      {
        keyword: "contents",
        class: "academy-contents-show",
      },
    ],
  },
  account: {
    class: "academy-user-account",
    keywords: [
      {
        keyword: "courses",
        class: "academy-user-account-courses",
      },
    ],
  },
};

const observer = new MutationObserver((mutations) =>
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList")
      if (mutation.addedNodes.length === 0) return;
    const node = mutation.addedNodes[0];
    if (!node || !node.querySelector) return;

    let pageRoute = location.pathname.split("/").slice(1);

    try {
      // add style to main tag based on page
      addStyle(pagesToObserve, pageRoute);

      // check the activatibility of header link
      headerLinks();

      switch (pageRoute) {
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

      Footer();
    } catch (e) {
      return;
    }
  })
);

observer.observe(document.body, { subtree: true, childList: true });
