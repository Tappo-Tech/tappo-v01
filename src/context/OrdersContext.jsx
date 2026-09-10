import { createContext, useContext, useState, useEffect } from "react";

const OrdersContext = createContext();

const initialMockOrders = [
  {
    id: "ORD-1001",
    tableNumber: "1",
    items: [
      { cartItemId: "c-1", menuItemId: "item-1", name: "V60 قهوة مقطرة", price: 18, quantity: 1 },
      { cartItemId: "c-2", menuItemId: "item-2", name: "سبانيش لاتيه حار", price: 22, quantity: 1 }
    ],
    total: 40,
    notes: "بدون سكر",
    status: "pending",
    isCompleted: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    completedAt: null
  }
];

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("app_orders");
      if (!savedOrders) return initialMockOrders;

      const parsedOrders = JSON.parse(savedOrders);

      return parsedOrders.map((order) => ({
        ...order,
        createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
        completedAt: order.completedAt ? new Date(order.completedAt) : null,
      }));
    } catch (error) {
      console.error("فشل في تحميل الطلبات من localStorage", error);
      return initialMockOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_orders", JSON.stringify(orders));
    } catch (error) {
      console.error("فشل في حفظ الطلبات في localStorage", error);
    }
  }, [orders]);

  const addOrder = (newOrder) => {
    const formattedOrder = {
      ...newOrder,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "pending",
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null
    };

    setOrders((prevOrders) => [formattedOrder, ...prevOrders]);
    return formattedOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;

        const isFinished = ["served", "unclaimed", "cancelled"].includes(newStatus);

        return {
          ...order,
          status: newStatus,
          isCompleted: isFinished,
          completedAt: (newStatus === "ready" || isFinished) 
            ? (order.completedAt || new Date()) 
            : order.completedAt
        };
      })
    );
  };

  const finishedOrders = orders.filter((order) => order.isCompleted && order.status !== "cancelled");
  const cancelledOrders = orders.filter((order) => order.status === "cancelled");

  return (
    <OrdersContext.Provider
      value={{
        orders,         
        finishedOrders, 
        cancelledOrders, 
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};