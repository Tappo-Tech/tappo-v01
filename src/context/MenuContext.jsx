import { useState, useContext, useMemo, createContext, useEffect } from "react";
import { menuItems, categories } from "../data/mockData";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("menu_items");
      return savedItems ? JSON.parse(savedItems) : menuItems;
    } catch (error) {
      console.error("فشل في تحميل عناصر المنيو من  local storage",error);
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  const categoriesList = categories;

  useEffect(() => {
    try {
      localStorage.setItem("menu_items", JSON.stringify(items));
    } catch (error) {
      console.error("فشل في الحفظ لل local storage", error)
    }
  }, [items]);

  const handleAlignment = (event, newCategories) => {
    if (newCategories.length > 0) {
      setSelectedCategories(newCategories);
    }
  };

  const addNewItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  const updateItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleAvailable = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const filteredMenu = useMemo(() => {
    return items.filter((item) => {
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
  }, [items, selectedCategories, searchQuery]);

  return (
    <MenuContext.Provider
      value={{
        items,
        filteredMenu,
        categoriesList,
        selectedCategories,
        searchQuery,
        setSearchQuery,
        handleAlignment,
        addNewItem,
        updateItem,
        deleteItem,
        toggleAvailable,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};