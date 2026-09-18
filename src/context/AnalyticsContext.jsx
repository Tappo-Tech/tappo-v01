import { createContext, useContext, useState } from "react";
import { useOrders } from "./OrdersContext";

const AnalyticsContext = createContext();

// دالة مساعدة لمقارنة تاريخين بقطع النظر عن الوقت
const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// دالة حساب نسبة النمو المئوية
const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return (((current - previous) / previous) * 100).toFixed(1);
};

export function AnalyticsProvider({ children }) {
  const { orders } = useOrders();

  // 1. تحديد تاريخ اليوم وتاريخ الأمس
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // 2. تصفية طلبات اليوم وأمس
  const todaysOrders = orders.filter((order) => {
    if (!order.createdAt) return false;
    return isSameDay(new Date(order.createdAt), today);
  });

  const yesterdaysOrders = orders.filter((order) => {
    if (!order.createdAt) return false;
    return isSameDay(new Date(order.createdAt), yesterday);
  });

  // 3. الحسابات اليومية
  const totalSalesToday = todaysOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const aovToday = todaysOrders.length > 0 ? totalSalesToday / todaysOrders.length : 0;

  // 4. حسابات الأمس
  const totalSalesYesterday = yesterdaysOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const aovYesterday = yesterdaysOrders.length > 0 ? totalSalesYesterday / yesterdaysOrders.length : 0;

  // 5. حساب نسب التغير المئوية (DOD Growth)
  const salesGrowth = calculateGrowth(totalSalesToday, totalSalesYesterday);
  const aovGrowth = calculateGrowth(aovToday, aovYesterday);
  const ordersGrowth = calculateGrowth(todaysOrders.length, yesterdaysOrders.length);

  // -------------------------------------------------------------
  // 6. حساب مبيعات الأسبوع (آخر 7 أيام ديناميكياً)
  // -------------------------------------------------------------
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i)); // من قبل 6 أيام حتى اليوم
    return d;
  });

  // أسماء الأيام للعرض في الرسم البياني
  const weeklyLabels = last7Days.map((date) =>
    date.toLocaleDateString("ar-EG", { weekday: "long" })
  );

  // مجموع مبيعات كل يوم من الأيام الـ 7
  const weeklySales = last7Days.map((date) => {
    return orders
      .filter((o) => o.createdAt && isSameDay(new Date(o.createdAt), date))
      .reduce((sum, o) => sum + (o.total || 0), 0);
  });

  // -------------------------------------------------------------
  // 7. حساب مبيعات اليوم مقسمة على الساعات (عرض اليومي)
  // -------------------------------------------------------------
  const hourlyLabels = ["8 ص", "10 ص", "12 م", "2 م", "4 م", "6 م", "8 م", "10 م"];
  
  // تجميع مبيعات اليوم على الفترات الزمنية
  const hourlySales = [8, 10, 12, 14, 16, 18, 20, 22].map((hour) => {
    return todaysOrders
      .filter((o) => {
        const orderHour = new Date(o.createdAt).getHours();
        return orderHour >= hour && orderHour < hour + 2;
      })
      .reduce((sum, o) => sum + (o.total || 0), 0);
  });

  // 8. التحكم في نوع العرض
  const [viewType, setViewType] = useState("daily");
  const isDaily = viewType === "daily";

  const currentLabels = isDaily ? hourlyLabels : weeklyLabels;
  const currentSales = isDaily ? hourlySales : weeklySales;

  const value = {
    viewType,
    setViewType,
    isDaily,
    todaysOrders,
    totalSalesToday,
    aovToday: aovToday.toFixed(2),
    salesGrowth,
    aovGrowth,
    ordersGrowth,
    currentLabels,
    currentSales,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}