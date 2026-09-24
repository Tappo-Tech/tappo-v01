import { createContext, useContext, useMemo, useState } from "react";
import { useCart } from "./CartContext";
import { useMenu } from "./MenuContext";

const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
  const { cartItems } = useCart();
  const { customerMenu } = useMenu();

  // قائمة المعرفات المتم تجاهلها/إغلاقها من الزبون مؤقتاً
  const [dismissedIds, setDismissedIds] = useState([]);

  // خوارزمية حساب الاقتراحات الذكية
  const suggestedItems = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return [];

    // 1. استخراج كل معرفات العناصر الموجودة بالسلة لتجنب اقتراحها
    const cartItemIds = new Set(cartItems.map((item) => item.id));

    // 2. تجميع كل الوسوم (tags) الموجودة بعناصر السلة الحالية
    const cartTags = new Set();
    cartItems.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag) => cartTags.add(tag));
      }
    });

    // 3. فلترة عناصر المنيو المتاحة فقط والتي ليست بالسلة ولم يتم إغلاقها
    const candidates = customerMenu.filter(
      (item) => !cartItemIds.has(item.id) && !dismissedIds.includes(item.id)
    );

    if (candidates.length === 0) return [];

    // 4. مطابقة الوسوم مع قواعد الاقتراح
    const matchedByTags = candidates.filter((item) => {
      if (!item.tags || item.tags.length === 0) return false;

      // قاعدة: إذا كان بالسلة مشروب ساخن، نبحث عن وسم يناسب المشروبات الساخنة أو حلويات
      if (cartTags.has("مشروبات ساخنة") || cartTags.has("يناسب المشروبات الساخنة")) {
        return (
          item.tags.includes("يناسب المشروبات الساخنة") ||
          item.tags.includes("حلويات خفيفة")
        );
      }

      // قاعدة: إذا كان بالسلة مشروب بارد
      if (cartTags.has("مشروبات باردة") || cartTags.has("يناسب المشروبات الباردة")) {
        return (
          item.tags.includes("يناسب المشروبات الباردة") ||
          item.tags.includes("وجبات سريعة")
        );
      }

      return false;
    });

    // إذا وجدنا عناصر مطابقة للوسوم نرجع أول عنصرين، وإلا نرجع أكثر العناصر مبيعاً/مقترحة
    if (matchedByTags.length > 0) {
      return matchedByTags.slice(0, 2);
    }

    // Fallback: اقتراح العناصر التي تحمل وسم "الأكثر مبيعاً" أو "مقترحات الشيف"
    const fallbackItems = candidates.filter((item) =>
      item.tags?.some((t) => t === "الأكثر مبيعاً" || t === "مقترحات الشيف")
    );

    return fallbackItems.length > 0
      ? fallbackItems.slice(0, 2)
      : candidates.slice(0, 2);
  }, [cartItems, customerMenu, dismissedIds]);

  const dismissSuggestion = (id) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  return (
    <SuggestionsContext.Provider
      value={{
        suggestedItems,
        dismissSuggestion,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  );
};

export const useSuggestions = () => useContext(SuggestionsContext);