import html2canvas from "html2canvas";

export const downloadImage = async (dom: HTMLElement | null) => {
  window.scrollTo(0, 0);

  if (!dom) {
    console.error("Invalid element reference");
    return;
  }

  // Wait for the element to fully render
  await new Promise((resolve) => setTimeout(resolve, 200));

  const clone = dom.cloneNode(true) as HTMLElement;

  // clone.style.width = `${dom.offsetWidth}px`;
  // clone.style.height = `${dom.offsetHeight}px`;
  clone.style.width = `1920px`;
  clone.style.height = `1080px`;

  // remove class name cuz overflow distorts the text on card
  const childElements = clone.getElementsByClassName("truncate");
  Array.from(childElements).forEach((element) => {
    element.classList.remove("truncate");
  });

  // Append clone to body and return the clone
  document.body.appendChild(clone);

  // Use clone with html2canvas and delete clone
  html2canvas(clone, {
    scrollY: -window.scrollY,

    scale: 2,
  }).then((canvas) => {
    const dataURL = canvas.toDataURL("image/jpeg", 0.9);
    document.body.removeChild(clone);

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `sut-schedule.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
