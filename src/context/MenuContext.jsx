import { useState, useContext, useMemo, createContext, useEffect } from "react";
import { menuItems, categories } from "../data/mockData";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  // 1. حالة عناصر المنيو (Items)
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("menu_items");
      return savedItems ? JSON.parse(savedItems) : menuItems;
    } catch (error) {
      console.error("فشل في تحميل عناصر المنيو من local storage", error);
      return [];
    }
  });

  // 2. حالة التصنيفات (Categories) مع دعم local storage
  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const savedCategories = localStorage.getItem("menu_categories");
      return savedCategories ? JSON.parse(savedCategories) : categories;
    } catch (error) {
      console.error("فشل في تحميل التصنيفات من local storage", error);
      return categories;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  // حفظ العناصر في local storage
  useEffect(() => {
    try {
      localStorage.setItem("menu_items", JSON.stringify(items));
    } catch (error) {
      console.error("فشل في الحفظ لل local storage", error);
    }
  }, [items]);

  // حفظ التصنيفات في local storage
  useEffect(() => {
    try {
      localStorage.setItem("menu_categories", JSON.stringify(categoriesList));
    } catch (error) {
      console.error("فشل في حفظ التصنيفات لل local storage", error);
    }
  }, [categoriesList]);

  // دالة تبديل/تحديد الفلاتر
  const handleAlignment = (event, newCategories) => {
    if (newCategories && newCategories.length > 0) {
      setSelectedCategories(newCategories);
    }
  };

  // --- عمليات الأصناف (Items CRUD) ---
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

  // --- عمليات التصنيفات (Categories CRUD) ---
  const addCategory = (newCategory) => {
    setCategoriesList((prev) => [...prev, newCategory]);
  };

  const updateCategory = (updatedCategory) => {
    setCategoriesList((prev) =>
      prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
  };

  const deleteCategory = (id) => {
    // حذف التصنيف من القائمة
    setCategoriesList((prev) => prev.filter((cat) => cat.id !== id));

    // إذا كان التصنيف المحذوف مفعل في الفلترة الحالية، أزله واعد تعيين الفلتر إلى "الكل" إذا فرغت القائمة
    setSelectedCategories((prev) => {
      const updated = prev.filter((catId) => catId !== id);
      return updated.length === 0 ? ["all"] : updated;
    });
  };

  // تصفية عناصر القائمة حسب التصنيفات والبحث
  const filteredMenu = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategories.includes("all") ||
        selectedCategories.includes(item.categoryId);

      const lowerCaseQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        lowerCaseQuery === "" ||
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerCaseQuery));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategories, searchQuery]);

  const customerMenu = useMemo(() => {
    return filteredMenu.filter((item) => item.available);
  }, [filteredMenu]);

  return (
    <MenuContext.Provider
      value={{
        items,
        filteredMenu,
        customerMenu,
        categoriesList,
        selectedCategories,
        searchQuery,
        setSearchQuery,
        handleAlignment,
        addNewItem,
        updateItem,
        deleteItem,
        toggleAvailable,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};