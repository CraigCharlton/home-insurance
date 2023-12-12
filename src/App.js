import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [addons, setAddons] = useState([]);
  const [isMonthly, setIsMonthly] = useState(true);

  const addExtra = (addon) => {
    const updatedAddons = [...addons];
    const updatedQuote = [...quotes];

    updatedQuote[0].monthlyPrice = updatedQuote[0].monthlyPrice + addon.monthlyPrice;
    updatedQuote[0].annualPrice = updatedQuote[0].annualPrice + addon.annualPrice;
    addon["added"] = true;
    setAddons(updatedAddons);
  }

  const removeExtra = (addon) => {
    const updatedAddons = [...addons];
    const updatedQuote = [...quotes];

    updatedQuote[0].monthlyPrice = updatedQuote[0].monthlyPrice - addon.monthlyPrice;
    updatedQuote[0].annualPrice = updatedQuote[0].annualPrice - addon.annualPrice;
    addon["added"] = false;
    setAddons(updatedAddons);
  }

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
              <p>Covers starts on {quote.startDate.slice(0,10)}.</p>
            </div>
            {isMonthly && (
              <div className="box price">
                <span className="currency">£{quote.monthlyPrice.toFixed(2)}</span>
                <p className="per-date">per month</p>
                <p>This price includes Insurance Premium Tax at the current rate. No charge for paying monthly.</p>
                <button className="quote-button" onClick={() => setIsMonthly(false)}>Switch to annual</button>
              </div>
            )}
            {!isMonthly && (
              <div className="box price">
                <span className="currency">£{quote.annualPrice.toFixed(2)}</span>
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
              {isMonthly && (
                <span className="box-price">£{addon.monthlyPrice} per month</span>
              )}
              {!isMonthly && (
                <span className="box-price">£{addon.annualPrice} per year</span>
              )}
              <p>{addon.text}</p>
              {!addon.added && (
                <button
                  className="extras-button add"
                  onClick={() => {
                    addExtra(addon);
                  }}>
                  Select this extra
                </button>
              )}
              {addon.added && (
                <button
                  className="extras-button remove"
                  onClick={() => {
                    removeExtra(addon);
                  }}>
                  Remove this extra
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
    </div>
  );
}

export default App;
