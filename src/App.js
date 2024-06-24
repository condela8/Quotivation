import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Message from "./components/Message";
import { Loader } from "react-feather";
import Quotes from "./components/quotes/Quotes";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes"
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState( JSON.parse(window.localStorage.getItem("favoriteQuotes"))|| []);
  const [ messageText, setMessageText] = useState("");
  const [ showMessage, setShowMessage] = useState(false);
  

  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";

    const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];
    const maxFaves = 3;
    
    const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(quotesUrl);
      const results = await response.json();
      setQuotes(results);
    } catch (error) {
      console.log("There was an error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
  }, [favoriteQuotes])

  const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const addToFavorites = (quoteId) => {
    const selectedQuote = quotes.find((quote) => quote.id===quoteId)
    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id===selectedQuote.id)
    //console.log(`In favorites quotes with id ${quoteId}`);
    if(alreadyFavorite){
      setMessageText("This quote is already in your favorites! Choose another")
      setShowMessage(true)
    }
    else if( favoriteQuotes.length < maxFaves){
      setFavoriteQuotes([...favoriteQuotes, selectedQuote])
      setMessageText( "Added to favorites!");
      setShowMessage(true);
    }
    else
    {
      setMessageText("Max number of Favorite Quotes reached")
      setShowMessage(true)
    }
  }
  const removeFromFavorites =(quoteId) =>{
    const updateFavoriteQuotes = favoriteQuotes.filter((quote)=>quote.id!==quoteId)
    setFavoriteQuotes(updateFavoriteQuotes)
  }
  const  removeMessage = () => {
    setShowMessage(false)
  }
  return (
    <div className='App'>
      {showMessage && <Message removeMessage ={removeMessage} messageText ={messageText}/>}
      <Header />
      <main>
        <FavoriteQuotes favoriteQuotes = {favoriteQuotes} maxFaves ={maxFaves} removeFromFavorites ={removeFromFavorites}/>
        {loading ? <Loader /> :
        <Quotes addToFavorites = {addToFavorites} filteredQuotes={filteredQuotes} categories={categories}
         category = {category}  handleCategoryChange= {handleCategoryChange} favoriteQuotes ={favoriteQuotes}

         />}
      </main>
      <Footer />
    </div>
  );
}
export default App;