import React from "react";
import { useParams, Link } from "react-router-dom";

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7
            

          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);
  if (loading) {
    return <h2 className="section-title">Loading...</h2>;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      ingredients,
      instructions,
      
    } = cocktail;
    return (
      <section className="section cocktail-section">
        <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name}></img>
          <div className="drink-info">
            <p>name : {name}</p>
            <p>category: {category}</p>
            <p>info: {info}</p>
            <p>glass : {glass}</p>
            <p className="ingredients">
              ingredients :{" "}
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item + (',')}</span> : null;
                // original without comma separation: return item ? <span key={index}>{item}</span> : null;
                //overstack example to add comma return item ? <span key={index}> { (index ? ', ' : '')+ item }
                // FIXED : <span key={index}> {item + (',')}</span> : null;
               
              })}
            </p>
            <p className="instructions"> Instructions : {instructions}</p>
            
          </div>
        </div>
      </section>
    );
  }
}
