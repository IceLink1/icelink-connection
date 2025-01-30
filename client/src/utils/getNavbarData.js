export const getData = (isAuth) => {
  if (isAuth) {
    return [
      {
        title: "ICELINK.",
        path: "/",
        classMobile: "hideOnMobile",
      },
      { title: "Home", path: "/", class: "hideOnMobile" },
      { title: "Posts", path: "/posts", class: "hideOnMobile" },
      { title: "Profile", path: "/profile", class: "hideOnMobile" },
    ];
  }
  return [
    {
      title: "ICELINK.",
      path: "/",
      classMobile: "hideOnMobile",
    },
    { title: "Home", path: "/", class: "hideOnMobile" },
    { title: "Posts", path: "/posts", class: "hideOnMobile" },
    { title: "Login", path: "/login", class: "hideOnMobile" },
    { title: "Sign up", path: "/signup", class: "hideOnMobile" },
  ];
};
