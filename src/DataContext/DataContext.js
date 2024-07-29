import { useState, useEffect, createContext, useCallback } from "react";
import useTimeStampHook from "../Hooks/useTimeStampHook";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const timeStamp = useTimeStampHook();
  const [isHidden, setIsHidden] = useState(true);
  const [popUpMeal, setPopUpMeal] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /* Fetch Random meal */
  const fetchRandomMeal = async () => {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    if (!resp.ok) throw Error("Couldn't fetch the required resource");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    setRandomMeal(randomMeal);
  };

  /* SEARCH MEAL BY ID */
  const getMealById = async (id) => {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );
    if (!resp.ok) throw Error(`Sorry..Couldnt get the resources`);
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    return randomMeal;
  };

  /* SEARCH MEAL BY TERM */
  const fetchMealsBySearchTerm = async (term) => {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );
    if (!resp.ok) throw Error(`Sorry..Couldnt get the resources`);
    const respData = await resp.json();
    const randomMeals = respData.meals;
    return randomMeals;
  };

  /* FUNCTION TO add FAVORITE MEALS TO LOCAL STORAGE */
  function addToLocalStorage(mealId) {
    const toStoreMealIds = retrieveFromLs();
    localStorage.setItem(
      "storedRandomMealIds",
      JSON.stringify([...toStoreMealIds, mealId])
    );
  }

  /* FUNCTION TO RETRIEVE MEAL DATA FROM LOCAL STORAGE */
  function retrieveFromLs() {
    const storedMealIds = JSON.parse(
      localStorage.getItem("storedRandomMealIds")
    );
    return storedMealIds || [];
  }

  /* FUNCTION TO REMOVE A MEAL FROM LOCAL STORAGE  */
  function deleteFromLs(mealId) {
    const allMeals = retrieveFromLs();
    localStorage.setItem(
      "storedRandomMealIds",
      JSON.stringify(allMeals.filter((mealid) => mealid !== mealId))
    );
  }

  /* PUSH MEALS TO LOCAL STORAGE */

  const handlePushToLocalStorage = (idMeal) => {
    console.log(idMeal);
    if (isActive) {
      deleteFromLs(idMeal);
      setIsActive(false);
    } else {
      addToLocalStorage(idMeal);
      setIsActive(true);
    }
  };
  /* FETCH FAVORITE MEALS FROM LOCAL STORAGE */
  const fetchFavMealsFromLs = useCallback(async () => {
    const allMealIds = retrieveFromLs();
    const mealPromises = allMealIds.map((mealId) => getMealById(mealId));
    const meals = await Promise.all(mealPromises);
    setFavoriteMeals(meals);
  }, []);

  /* ADD FUNCTIONALITY TO BUTTON TO DELETE A MEAL WHEN CLICKED */
  const handleDeleteFavMeal = (idMeal) => {
    deleteFromLs(idMeal);
    fetchFavMealsFromLs();
  };
  /* HANDLE RECIPE DISPLAY OF FAVORITE MEALS */
  const handlePopUp = (meal) => {
    setIsHidden(false);
    setPopUpMeal(meal);
  };
  /* HANDLE BY SEARCH TERM */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      setSearchResults([]);
      setRandomMeal(randomMeal);
    }
    setRandomMeal(null);
    const meals = await fetchMealsBySearchTerm(search);
    setSearchResults(meals);
  };

  useEffect(() => {
    fetchRandomMeal();
    fetchFavMealsFromLs();
  }, [fetchFavMealsFromLs]);
  return (
    <DataContext.Provider
      value={{
        randomMeal,
        setRandomMeal,
        favoriteMeals,
        setFavoriteMeals,
        isActive,
        setIsActive,
        timeStamp,
        isHidden,
        setIsHidden,
        popUpMeal,
        setPopUpMeal,
        search,
        setSearch,
        searchResults,
        setSearchResults,
        handleDeleteFavMeal,
        handlePopUp,
        handlePushToLocalStorage,
        handleSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
