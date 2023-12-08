import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  let [quotes, setQuotes] = useState([]);
  let [addons, setAddons] = useState([]);
  let [isMonthly, setIsMonthly] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/quote")
      .then((response) => response.json())
      .then((result) => setQuotes(result))
      .catch((error) => console.log("error", error))
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/addons")
      .then((response) => response.json())
      .then((result) => setAddons(result))
      .catch((error) => console.log("error", error))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Insurance</h1>
      </header>
      <main>
        <div className="container">
        {quotes.map((quote) => (
          <div className="quote" key={quote.firstName}>
            <div className="box details">
              <h2>Hey {quote.firstName},</h2>
              <p>Here is your quote for Royal & Sun Alliance, {quote.address1}, {quote.address2}</p>
              <p>Quote reference: {quote.quoteRef}</p>
              <p>Covers starts on {quote.startDate}.</p>
            </div>
            {isMonthly && (
              <div className="box price">
                <span className="currency">£{quote.monthlyPrice}</span>
                <p className="per-date">per month</p>
                <p>This price includes Insurance Premium Tax at the current rate. No charge for paying monthly.</p>
                <button className="quote-button" onClick={() => setIsMonthly(false)}>Switch to annual</button>
              </div>
            )}
            {!isMonthly && (
              <div className="box price">
                <span className="currency">£{quote.annualPrice}</span>
                <p className="per-date">per year</p>
                <p>This price includes Insurance Premium Tax at the current rate. No charge for paying monthly.</p>
                <button className="quote-button" onClick={() => setIsMonthly(true)}>Switch to monthly</button>
              </div>
            )}
          </div>
        ))}
        <span className="heading2"><h2>Tailor your cover with our optional extra</h2></span>

        <div className="extras">
          {addons.map((addon) => (
            <div className="box" key={addon.title}>
              <h3>{addon.title}</h3>
              <span className="box-price">£{addon.monthlyPrice} per month</span>
              <p>{addon.text}</p>
              <button className="extras-button">Select this extra</button>
            </div>
          ))}
        </div>
      </div>
    </main>
    </div>
  );
}

export default App;
