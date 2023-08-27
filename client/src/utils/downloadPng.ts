import html2canvas from "html2canvas";

// export const downloadImage = async (
//   dom1: HTMLElement | null,
//   dom2: HTMLElement | null
// ) => {
//   window.scrollTo(0, 0);

//   if (!dom1) {
//     console.error("Invalid element reference");
//     return;
//   }

//   // Wait for the element to fully render
//   await new Promise((resolve) => setTimeout(resolve, 200));

//   const cloneSchedule = dom1.cloneNode(true) as HTMLElement;
//   const cloneTableSchedule = dom2?.cloneNode(true) as HTMLElement;

//   // clone.style.width = `${dom1.offsetWidth}px`;
//   // clone.style.height = `${dom1.offsetHeight}px`;
//   cloneSchedule.style.width = `1920px`;
//   cloneSchedule.style.height = `1080px`;

//   // remove class name cuz overflow distorts the text on card
//   const childElements = cloneSchedule.getElementsByClassName("truncate");
//   Array.from(childElements).forEach((element) => {
//     element.classList.remove("truncate");
//   });

//   // Append clone to body and return the clone
//   document.body.appendChild(cloneSchedule);
//   document.body.appendChild(cloneTableSchedule);

//   // Use clone with html2canvas and delete clone
//   html2canvas(cloneSchedule, {
//     scrollY: -window.scrollY,

//     scale: 2,
//   }).then((canvas) => {
//     const dataURL = canvas.toDataURL("image/jpeg", 0.9);
//     document.body.removeChild(cloneSchedule);

//     const link = document.createElement("a");
//     link.href = dataURL;
//     link.download = `sut-schedule.jpg`;
//     document.body.appendChild(link);
//     // link.click();
//     // document.body.removeChild(link);
//   });
// };

export const downloadImage = async (
  dom1: HTMLElement | null,
  dom2: HTMLElement | null
) => {
  if (!dom1 || !dom2) {
    console.error("Invalid element reference");
    return;
  }

  // Wait for the elements to fully render
  await new Promise((resolve) => setTimeout(resolve, 200));

  const clone1 = dom1.cloneNode(true) as HTMLElement;
  const clone2 = dom2.cloneNode(true) as HTMLElement;

  // remove class name cuz overflow distorts the text on card
  const childElements = clone1.getElementsByClassName("truncate");
  Array.from(childElements).forEach((element) => {
    element.classList.remove("truncate");
  });

  // Create a container for both clones
  const combinedContainer = document.createElement("div");
  combinedContainer.appendChild(clone1);
  combinedContainer.appendChild(clone2);

  // Style the container as needed (adjust dimensions and layout)
  combinedContainer.style.width = "1920px";
  combinedContainer.style.height = "100%";
  combinedContainer.style.display = "flex";
  combinedContainer.style.flexDirection = "column"; // or "column", adjust as needed

  // Append the container to the body
  document.body.appendChild(combinedContainer);

  // Capture the combined container
  html2canvas(combinedContainer, {
    scrollY: -window.scrollY,
    scale: 2,
  }).then((canvas) => {
    // Remove the combined container
    document.body.removeChild(combinedContainer);

    // Download the captured image
    const dataURL = canvas.toDataURL("image/jpeg", 0.9);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "sut-schedule.jpg";
    link.click();
    document.body.removeChild(link);
  });
};
