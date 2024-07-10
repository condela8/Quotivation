import React from "react";
import FavoriteQuoteCard from "./FavoriteQuoteCard";

const FavoriteQuotes = ({favoriteQuotes, maxFaves, removeFromFavorites,}) => {

    return (
        <section className="favorite-quotes">
        <div className=" wrapper quotes">
          <h3> Top 3 favorite quotes</h3>
          {favoriteQuotes.length>=1 && <ul>
             {favoriteQuotes.map((quote, index)=>
             <FavoriteQuoteCard
               key ={quote.id} 
               listPosition={index + 1}
               quote = {quote}
                removeFromFavorites ={removeFromFavorites}/>)}  
          </ul>}
        </div>
        <div className="favorite-quotes-description">
          {favoriteQuotes.length < maxFaves && 
           <p>You can add up to {maxFaves - favoriteQuotes.length} favorite  {(maxFaves - favoriteQuotes.length) ===1? "quote" : "quotes"} by selecting from the options below . 
            <br /> Once you choose, they will appear here.</p>
          
          }
         
        </div>
      </section>
    )
}
export default FavoriteQuotes;