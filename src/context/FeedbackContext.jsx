import { createContext, useContext, useState, useEffect, useMemo } from "react";

const FeedbacksContext = createContext();

const STORAGE_KEY = "app_feedbacks";

const INITIAL_FEEDBACKS = [
  {
    id: "1",
    tableNumber: "4",
    rating: 5,
    tags: ["خدمة سريعة", "جودة ممتازة", "تعامل راقي"],
    comment: "الأكل طازج وسريع جداً، والتعامل من الطاقم كان ممتاز. شكراً لكم!",
    createdAt: "منذ 10 دقائق",
  },
  {
    id: "2",
    tableNumber: "12",
    rating: 2,
    tags: ["تأخير في الطلب", "المكان مزدحم"],
    comment: "الطلب تأخر أكثر من 30 دقيقة رغم إن الطاولة كانت محجوزة.",
    createdAt: "منذ 45 دقيقة",
  },
  {
    id: "3",
    tableNumber: "7",
    rating: 4,
    tags: ["جودة ممتازة"],
    comment: "",
    createdAt: "منذ ساعتين",
  },
];

export function FeedbacksProvider({ children }) {
  // 1. قراءة البيانات المجهزة مسبقاً من LocalStorage أو استخدام التقييمات الافتراضية
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const savedFeedbacks = localStorage.getItem(STORAGE_KEY);
      return savedFeedbacks ? JSON.parse(savedFeedbacks) : INITIAL_FEEDBACKS;
    } catch (error) {
      console.error("خطأ في قراءة البيانات من LocalStorage:", error);
      return INITIAL_FEEDBACKS;
    }
  });

  // 2. حفظ التقييمات في LocalStorage في كل مرة تتغير فيها القائمة (عند الإضافة)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
    } catch (error) {
      console.error("خطأ في حفظ البيانات في LocalStorage:", error);
    }
  }, [feedbacks]);

  // دالة إضافة تقييم جديد
  const addFeedback = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  const value = useMemo(() => ({ feedbacks, addFeedback }), [feedbacks]);

  return (
    <FeedbacksContext.Provider value={value}>
      {children}
    </FeedbacksContext.Provider>
  );
}

export function useFeedbacks() {
  const context = useContext(FeedbacksContext);
  if (!context) {
    throw new Error("useFeedbacks must be used within a FeedbacksProvider");
  }
  return context;
}