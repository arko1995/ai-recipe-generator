export default function Form() {
  return (
    <div className="form">
      <form action="submit" className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. Oregano"
          aria-label="Add Ingredient"
        />
        <button aria-label="Add Ingredient">Add Ingredient</button>
      </form>
    </div>
  );
}
