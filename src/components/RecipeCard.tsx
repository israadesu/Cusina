import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState, FC, useEffect } from "react";

interface Recipe {
  image: string;
  yield: number;
  label: string;
  cuisineType: string[];
  healthLabels: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  bg: string;
  badge: string;
}

const getTwoValuesFromArray = (arr: string[]): string[] => {
  return arr.slice(0, 2);
};

const RecipeCard: FC<RecipeCardProps> = ({ recipe, bg, badge }) => {
  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favoritesArray: Recipe[] = JSON.parse(favorites);
      const isFav = favoritesArray.some((fav) => fav.label === recipe.label);
      setIsFavorite(isFav);
    }
  }, [recipe.label]);

  const addRecipeToFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    let favoritesArray: Recipe[] = favorites ? JSON.parse(favorites) : [];
    const isRecipeAlreadyInFavorites = favoritesArray.some((fav) => fav.label === recipe.label);

    if (isRecipeAlreadyInFavorites) {
      favoritesArray = favoritesArray.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favoritesArray.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  };

  return (
    <div className={`flex flex-col rounded-lg ${bg} overflow-hidden p-3 relative shadow-lg border border-gray-500/15 border-t-slate/10`}>
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        rel="noreferrer"
        className="relative h-32"
      >
        <div className="skeleton absolute inset-0" />
        <img
          src={recipe.image}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
            if (e.currentTarget.previousElementSibling instanceof HTMLElement) {
              e.currentTarget.previousElementSibling.style.display = "none";
            }
          }}
        />
        <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm text-black">
          <Soup size={16} /> {recipe.yield} Servings
        </div>

        <div
          className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
        >
          {!isFavorite && <Heart size={20} className="hover:fill-red-500 hover:text-red-500" />}
          {isFavorite && <Heart size={20} className="fill-red-500 text-red-500" />}
        </div>
      </a>

      <div className="flex mt-1 text-black">
        <p className="font-bold tracking-wide">{recipe.label}</p>
      </div>
      <p className="my-2 text-gray-900">
        {recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Kitchen
      </p>

      <div className="flex gap-2 mt-auto">
        {healthLabels.map((label, idx) => (
          <div key={idx} className={`flex gap-1 ${badge} items-center p-1 rounded-md text-white font-thin`}>
            <HeartPulse size={16} />
            <span className="text-sm tracking-tighter font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
