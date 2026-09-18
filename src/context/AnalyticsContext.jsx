import { createContext, useContext, useState, useMemo } from "react";
import { useHistory } from "./HistoryContext";

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
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

export function AnalyticsProvider({ children }) {
  const { finishedOrders = [] } = useHistory();
  const [viewType, setViewType] = useState("daily");

  //  حفظ كافة الحسابات الثقيلة في الذاكرة ولا تُعاد إلا عند تغير finishedOrders
  const analyticsData = useMemo(() => {
    // 1. تحديد تاريخ اليوم وتاريخ الأمس
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // 2. تصفية طلبات اليوم وأمس
    const todaysOrders = finishedOrders.filter((order) => {
      if (!order.createdAt) return false;
      return isSameDay(new Date(order.createdAt), today);
    });

    const yesterdaysOrders = finishedOrders.filter((order) => {
      if (!order.createdAt) return false;
      return isSameDay(new Date(order.createdAt), yesterday);
    });

    // 3. الحسابات اليومية
    const totalSalesToday = todaysOrders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );
    const aovToday =
      todaysOrders.length > 0 ? totalSalesToday / todaysOrders.length : 0;

    // 4. حسابات الأمس
    const totalSalesYesterday = yesterdaysOrders.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );
    const aovYesterday =
      yesterdaysOrders.length > 0
        ? totalSalesYesterday / yesterdaysOrders.length
        : 0;

    // 5. حساب نسب التغير المئوية (DoD Growth)
    const salesGrowth = calculateGrowth(totalSalesToday, totalSalesYesterday);
    const aovGrowth = calculateGrowth(aovToday, aovYesterday);
    const ordersGrowth = calculateGrowth(
      todaysOrders.length,
      yesterdaysOrders.length
    );

    // 6. حساب مبيعات الأسبوع (آخر 7 أيام)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      return d;
    });

    const weeklyLabels = last7Days.map((date) =>
      date.toLocaleDateString("ar-SA", { weekday: "long" })
    );

    const weeklySales = last7Days.map((date) => {
      return finishedOrders
        .filter((o) => o.createdAt && isSameDay(new Date(o.createdAt), date))
        .reduce((sum, o) => sum + (o.total || 0), 0);
    });

    // 7. حساب مبيعات اليوم مقسمة على الساعات
    const hourlyLabels = [
      "8 ص",
      "10 ص",
      "12 م",
      "2 م",
      "4 م",
      "6 م",
      "8 م",
      "10 م",
    ];

    const hourlySales = [8, 10, 12, 14, 16, 18, 20, 22].map((hour) => {
      return todaysOrders
        .filter((o) => {
          const orderHour = new Date(o.createdAt).getHours();
          return orderHour >= hour && orderHour < hour + 2;
        })
        .reduce((sum, o) => sum + (o.total || 0), 0);
    });

    // 8. الأصناف الأعلى مبيعاً
    const itemSalesMap = {};
    finishedOrders.forEach((order) => {
      order.items?.forEach((item) => {
        const name = item.name;
        const quantity = item.quantity || 1;
        const price = item.price || 0;

        if (!itemSalesMap[name]) {
          itemSalesMap[name] = { quantity: 0, totalRevenue: 0 };
        }

        itemSalesMap[name].quantity += quantity;
        itemSalesMap[name].totalRevenue += quantity * price;
      });
    });

    const topProducts = Object.entries(itemSalesMap)
      .map(([name, data]) => ({
        name,
        quantity: data.quantity,
        totalRevenue: data.totalRevenue,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);

    // 9. أحدث 3 طلبات
    const recentOrders = [...todaysOrders]
      .filter((order) => order.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    return {
      todaysOrders,
      totalSalesToday,
      aovToday: aovToday.toFixed(2),
      salesGrowth,
      aovGrowth,
      ordersGrowth,
      weeklyLabels,
      weeklySales,
      hourlyLabels,
      hourlySales,
      topProducts,
      recentOrders,
    };
  }, [finishedOrders]); // ⚡ لا يُعاد الحساب إلا عند تغير finishedOrders فقط

  const isDaily = viewType === "daily";
  const currentLabels = isDaily
    ? analyticsData.hourlyLabels
    : analyticsData.weeklyLabels;
  const currentSales = isDaily
    ? analyticsData.hourlySales
    : analyticsData.weeklySales;

  //  حفظ كائن الـ Context في الذاكرة لتجنب الـ Re-renders غير الضرورية للـ Consumers
  const value = useMemo(
    () => ({
      viewType,
      setViewType,
      isDaily,
      currentLabels,
      currentSales,
      ...analyticsData,
    }),
    [viewType, isDaily, currentLabels, currentSales, analyticsData]
  );

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