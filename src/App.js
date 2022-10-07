import { useState, useEffect } from "react";
import logo from "./twitter.png";

function App() {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [contentAPI, setContentAPI] = useState("");
  const [authorAPI, setAuthorAPI] = useState("");

  useEffect(() => {
    async function getQuote() {
      const res = await fetch("http://quotable.io/quotes");
      const data = await res.json();
      setAllQuotes(data.results);
      const index = Math.floor(Math.random() * data.results.length);
      setQuote(data.results[index]);
      setContentAPI(data.results[index].content.replace(/ /g, "%20"));
      setAuthorAPI(data.results[index].author.replace(/ /g, "%20"));
    }
    getQuote();
  }, []);

  function randomQuote() {
    const index = Math.floor(Math.random() * allQuotes.length);
    setQuote(allQuotes[index]);
    setContentAPI(allQuotes[index].content.replace(/ /g, "%20"));
    setAuthorAPI(allQuotes[index].author.replace(/ /g, "%20"));
  }

  console.log(contentAPI);

  return (
    <>
      <div className="hero">
        <div id="quote-box">
          {quote ? (
            <>
              <h1 id="text">{quote.content}</h1>
              <h4 id="author">{quote.author}</h4>
            </>
          ) : (
            <h3>Loading...</h3>
          )}

          <div className="clicks">
            <a
              id="tweet-quote"
              href={
                `https://twitter.com/intent/tweet?text=` +
                contentAPI +
                `%20-%20` +
                authorAPI
              }
              target="_blank"
              rel="noreferrer"
            >
              <img src={logo} className="logo" alt="twitter logo" />
            </a>
            <button
              id="new-quote"
              className="button"
              onClick={randomQuote}
              target="_blank"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
