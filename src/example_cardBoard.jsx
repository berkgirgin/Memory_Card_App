import { useState, useEffect } from "react";

import imgURL_1 from "./assets/images/example_img_gandalf.jpeg";

const example_cardBoard = [
  {
    card_ID: 0,
    isPlayed: false,
    imgURL: imgURL_1,
    title: "1 Gandalf 1",
    quote: "1aaaaaaaa1",
  },
  {
    card_ID: 1,
    isPlayed: false,
    imgURL: imgURL_1,
    title: "2 Gandalf 2",
    quote: "2bbbbbbbbb2",
  },
  {
    card_ID: 2,
    isPlayed: false,
    imgURL: imgURL_1,
    title: "3 Gandalf 3",
    quote: "3cccccccc3",
  },
  // {
  //   card_ID: 3,
  //   isPlayed: false,
  //   imgURL: imgURL_1,
  //   title: "4 Gandalf 4",
  //   quote: "4ddddddd4",
  // },
  // {
  //   card_ID: 4,
  //   isPlayed: false,
  //   imgURL: imgURL_1,
  //   title: "5 Gandalf 5",
  //   quote: "5eeeeeeee5",
  // },
];

export default example_cardBoard;
