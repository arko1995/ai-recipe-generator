export default function IngredientList(props) {
  const newIngredients = props.ingredients.map((item) => (
    <li key={item}>{item}</li>
  ));
  return (
    <>
      {newIngredients.length > 0 ? (
        <section>
          <h2>Ingredients on Hand:</h2>

          <ul className="ingredients-list" aria-live="polite">
            {newIngredients}
          </ul>

          {newIngredients.length >= 3 ? (
            <div className="get-recipe-container">
              <div ref={props.ref}>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients</p>
              </div>
              <button onClick={props.onClick}>Get a recipe</button>
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  );
}
