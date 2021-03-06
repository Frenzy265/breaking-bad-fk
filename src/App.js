import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
import Quote from "./components/Quote";
import Card from "./components/Card";
import {
  getQuoteRandom,
  getMatchingImg,
  getCharacterRandom,
} from "./utils/api";
import { createElement /*styled*/ } from "./utils/elements";
import { shuffle } from "./utils/arrays";

// const PrimaryButton = styled(Button, "bg-primary");

function App() {
  const header = Header();

  let rightAnswer = null;

  function solution(answerUser) {
    answerUser === rightAnswer
      ? alert("This is the right answer!")
      : alert("this is wrong!");
  }

  const quotesContainer = createElement("section", {
    className: "quotes-container",
  });

  async function loadQuotes(quote, author) {
    const randomquote = await getQuoteRandom(quote, author);
    const quoteElement = Quote({
      quote: randomquote.quote,
      author: randomquote.author,
    });

    rightAnswer = randomquote.author;

    const imgElement = await getMatchingImg(randomquote);
    const correctCard = Card(imgElement.img, randomquote.author, (value) => {
      solution(value);
    });

    let randomcharacter1 = await getCharacterRandom();
    while (randomcharacter1.name === randomquote.author) {
      randomcharacter1 = await getCharacterRandom();
    }
    let falseCard1 = Card(
      randomcharacter1.img,
      randomcharacter1.name,
      (value) => {
        solution(value);
      }
    );

    let randomcharacter2 = await getCharacterRandom();
    while (randomcharacter2.name === randomcharacter1.name) {
      randomcharacter2 = await getCharacterRandom();
    }
    let falseCard2 = Card(
      randomcharacter2.img,
      randomcharacter2.name,
      (value) => {
        solution(value);
      }
    );

    const cards = [correctCard, falseCard1, falseCard2];
    shuffle(cards);

    cardsContainer.append(...cards);
    quotesContainer.append(quoteElement);
  }

  const cardsContainer = createElement("section", {
    className: "cards-container",
  });

  const newQuoteButton = Button({
    innerText: "Load Random Quote",
    onclick: () => {
      quotesContainer.innerHTML = "";
      cardsContainer.innerHTML = "";
      loadQuotes();
    },
  });

  loadQuotes();

  const main = createElement("main", {
    children: [quotesContainer, cardsContainer, newQuoteButton],
  });

  const container = createElement("div", {
    children: [
      header,
      main,
      // Button({ innerText: "Hello" }),
      // PrimaryButton({ innerText: "World" }),
    ],
  });
  return container;
}

export default App;
