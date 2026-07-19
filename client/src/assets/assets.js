import logo from "./logo.jpeg";
import arrow from "./arrow.svg";
import star_icon from "./star_icon.svg";
import gradientBackground from "./gradientBackground.png";
import headerimg from "./headerimg.png";
import headersidebar from "./headersidebar.jpeg";
import robotAi from "./robotAi.avif";
import semester from "./semester.avif";
import folder from "./folder.webp";
import book from "./book.png";

export const assets = {
  logo,
  arrow,
  star_icon,
  gradientBackground,
  headerimg,
  headersidebar,
  robotAi,
  semester,
  folder,
  book,
};

export const Note = [
  {
    path:'/ainotes',
    title: "AI Note Generation",
    description:"<p>Generate comprehensive notes from lectures with AI-powered summaries</p>",
    image: robotAi,
  },
  {
    path: "/allcourse",
    title: "All Course Notes",
    description:
      "<p>Connect across different branches and department</p>",
    image: book,
  },
  {
    path: "/questionpaper",
    title: "Question Paper All Course",
    description:
      "<p>Connect with the AKTU and find the Previous year questions</p>",
    image: semester,
  },
  {
    path: "/my-downloads",
    title: "My Downloads",
    description: "<p>Notes you have downloaded are saved here</p>",
    image: folder,
  },
];
