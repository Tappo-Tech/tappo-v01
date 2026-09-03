// HOOKS
import { useState, useContext, useMemo, createContext } from "react";

// DATA
import { menuItems } from "../data/mockData";
import { categories } from "../data/mockData";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  const initialMenu = menuItems;
  const categoriesList = categories;

  const handleAlignment = (event, newCategories) => {
    if (newCategories.length > 0) {
      setSelectedCategories(newCategories);
    }
  };

  const filteredMenu = useMemo(() => {
    return initialMenu.filter((item) => {
      const matchesCategory =
        selectedCategories.includes("all") ||
        selectedCategories.includes(item.categoryId);

      const lowerCaseQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        lowerCaseQuery === "" ||
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, searchQuery, initialMenu]);

  return (
    <MenuContext.Provider
      value={{
        categoriesList,
        selectedCategories,
        handleAlignment,
        filteredMenu,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  return context;
};
