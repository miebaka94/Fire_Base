import React, { useState, useEffect } from "react";

const fetchMealIdeas = async (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.meals || []; // Ensure we return the meals or an empty array if null
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

const fetchMealDetailsById = async (idMeal) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.meals[0]; // Assumes the API always returns an array with a single meal object
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null; // Returns null or an appropriate fallback
  }
};

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState({});
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const loadMealIdeas = async () => {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals || []);
    };

    loadMealIdeas();
  }, [ingredient]);

  const handleMealSelect = async (id) => {
    if (!mealDetails[id]) {
      const details = await fetchMealDetailsById(id);
      setMealDetails((prev) => ({ ...prev, [id]: details }));
    }
    setSelectedMealId(selectedMealId === id ? null : id);
  };

  useEffect(() => {
    setInstructions();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-cyan-700 my-4 ml-1">
        Meal Ideas for {ingredient}
      </h2>
      <p className="text-sm font-semibold text-gray-600 my-2 ml-1">
        {instructions}
      </p>
      {meals.length > 0 ? (
        <ul>
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="mb-2 ml-1 bg-gray-800 border-gray-700 rounded p-2 cursor-pointer text-white"
            >
              <div onClick={() => handleMealSelect(meal.idMeal)}>
                {meal.strMeal}
              </div>
              {selectedMealId === meal.idMeal && mealDetails[meal.idMeal] && (
                <>
                  <ul className="pl-4 pr-2 py-2 text-md">
                    ingredients needed:
                    {/* Display ingredients */}
                    {Object.keys(mealDetails[meal.idMeal])
                      .filter(
                        (key) =>
                          key.startsWith("strIngredient") &&
                          mealDetails[meal.idMeal][key]
                      )
                      .map((ingredientKey, index) => (
                        <li
                          key={index}
                          className="text-xxm text-white mb-1 text-xs italic ml-6"
                        >
                          {mealDetails[meal.idMeal][ingredientKey]} -{" "}
                          {
                            mealDetails[meal.idMeal][
                              `strMeasure${ingredientKey.match(/\d+/)[0]}`
                            ]
                          }
                        </li>
                      ))}
                  </ul>
                  {/* Display YouTube link */}
                  {mealDetails[meal.idMeal].strYoutube && (
                    <a
                      href={mealDetails[meal.idMeal].strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-white hover:text-black"
                    >
                      Watch tutorial
                    </a>
                  )}
                  {/* Display category */}
                  {mealDetails[meal.idMeal].strCategory && (
                    <p className="text-sm text-white mt-2">
                      <span className="text-yellow-500">Category: </span>
                      {mealDetails[meal.idMeal].strCategory}
                    </p>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="ml-1 text-white">No meals found for this ingredient.</p>
      )}
    </div>
  );
};

export default MealIdeas;
