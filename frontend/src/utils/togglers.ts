// left side bar
export const leftSideBarToggler = () => {
  const leftSideBar = document.getElementById("left-sidebar");
  if (leftSideBar?.classList.contains("absolute")) {
    if (leftSideBar.classList.contains("w-0")) {
      leftSideBar.classList.remove("w-0");
      leftSideBar.classList.add("w-64");
    } else {
      leftSideBar.classList.remove("w-64");
      leftSideBar.classList.add("w-0");
    }
  }
};
// right side bar toggler
export const rightSideBarToggler = () => {
  const rightSideBar = document.getElementById("right-sidebar");
  if (rightSideBar?.classList.contains("absolute")) {
    if (rightSideBar.classList.contains("w-0")) {
      rightSideBar.classList.remove("w-0");
      rightSideBar.classList.add("w-80");
    } else {
      rightSideBar.classList.remove("w-80");
      rightSideBar.classList.add("w-0");
    }
  }
};
