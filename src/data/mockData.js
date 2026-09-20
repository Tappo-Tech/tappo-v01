export const categories = [
  { id: "hot-drinks", title: "مشروبات ساخنة", icon: "☕" },
  { id: "cold-drinks", title: "مشروبات باردة", icon: "🧊" },
  { id: "desserts", title: "حلويات ومخبوزات", icon: "🍰" },
];

export const validTables = [];

export const menuItems = [
  {
    id: "item-1",
    categoryId: "hot-drinks",
    name: "سبانيش لاتيه حار",
    description: "مزيج متوازن من الإسبريسو المختص والحليب المبخر مع الحليب المكثف المحلى.",
    price: 22,
    image: "https://images.unsplash.com/photo-1579896328228-2b8fa225d3a5?q=80&w=300&auto=format&fit=crop",
    allergens: ["حليب"],
    quantity: 1,
    isPopular: true,
    available: true,
  },
  {
    id: "item-2",
    categoryId: "hot-drinks",
    name: "V60 قهوة مقطرة",
    description: "قهوة سوداء مقطرة يدوياً بحمصات إثيوبية أو كولومبية غنية بالإيحاءات.",
    price: 18,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=300&auto=format&fit=crop",
    allergens: [],
    quantity: 1,
    isPopular: false,
    available: true,
  },
  {
    id: "item-3",
    categoryId: "cold-drinks",
    name: "آيس كراميل مكياتو",
    description: "إسبريسو مع حليب بارد، ثلج، وشراب الڤانيلا مغطى بطبقة كثيفة من الكراميل.",
    price: 24,
    image: "https://images.unsplash.com/photo-1461023058943-0708e52235eb?q=80&w=300&auto=format&fit=crop",
    allergens: ["حليب", "مكسرات"],
    quantity: 1,
    isPopular: true,
    available: true,
  },
  {
    id: "item-4",
    categoryId: "desserts",
    name: "كيكة العسل الروسية",
    description: "طبقات رقيقة من كيك العسل الهش مع كريمة غنية وخفيفة.",
    price: 28,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=300&auto=format&fit=crop",
    allergens: ["حليب", "جلوتين", "بيض"],
    quantity: 1,
    isPopular: true,
    available: true,
  }
];

export const currentUserMock = {
  id: "usr_101",
  name: "Mohamed",
  email: "mohamed@tappo.com",
  role: "Manager",
  restaurantName: "TAPPO Restaurant",
  avatar: "",
  notificationsCount: 3,
};