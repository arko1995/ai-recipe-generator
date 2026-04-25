import React from "react";
import IngredientList from "./IngredientsList.jsx";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import { getRecipeFromMistral } from "../ai.js";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);

  function addIngredient(formData) {
    const addedIngredients = formData.get("ingredient").trim();
    if (!addedIngredients) {
      alert("please provide a valid ingredient");
      return;
    }
    setIngredients((prevData) => [...prevData, addedIngredients]);

    console.log("Form submitted!");
  }

  const getRecipe = async () => {
    try {
      setIsShown(false);
      setLoading(true);
      const aiRecipe = await getRecipeFromMistral(ingredients);
      setRecipe(aiRecipe);
      setIsShown(true);
    } catch (error) {
      console.log(error.message);

      alert("Couldn't Load Recipe");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    recipe
      ? recipeSection.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      : null;
  }, [recipe]);

  return (
    <div className="form">
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          type="text"
          placeholder="Oregano"
          aria-label="Add-ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      <IngredientList
        ref={recipeSection}
        ingredients={ingredients}
        onClick={getRecipe}
      />
      {loading && <p>Generating Recipe, Please Wait</p>}
      {isShown ? <ClaudeRecipe recipe={recipe} /> : null}
    </div>
  );
}
