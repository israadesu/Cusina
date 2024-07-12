import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";
import { useEffect, useState, FC, FormEvent } from "react";
import { Search } from "lucide-react";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

interface Recipe {
  image: string;
  yield: number;
  label: string;
  cuisineType: string[];
  healthLabels: string[];
}

interface RecipeHit {
  recipe: Recipe;
}

const Homepage: FC = () => {
  const [recipes, setRecipes] = useState<RecipeHit[]>([]);
  const [defaultRecipes, setDefaultRecipes] = useState<RecipeHit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRecipes = async (query: string, from: number = 0, to: number = 30) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&type=public&from=${from}&to=${to}`
      );
      const data = await res.json();
      setRecipes(data.hits);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=popular&type=public&from=0&to=30`
      );
      const data = await res.json();
      setDefaultRecipes(data.hits);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchRecipes(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchRecipes(searchQuery);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearch}>
          <label className="input shadow-md flex items-center gap-2 bg-white">
            <Search size={24} color="black" />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What recipe do you want to search for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </form>

        <p className="font-bold text-3xl md:text-5xl mt-4 text-black pt-14">
          Recommended recipes
        </p>

        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">Popular choices</p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading && (searchQuery ? recipes : defaultRecipes).map(({ recipe }, index) => (
            <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
          ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
