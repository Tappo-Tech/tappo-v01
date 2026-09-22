import { useState } from "react";

// MUI COMPONENTS
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Chip,
  Stack,
  Grid,
} from "@mui/material";

// ICONS
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const MOCK_FEEDBACKS = [
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

function Feedbacks() {
  const [feedbacks] = useState(MOCK_FEEDBACKS);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: 5,
      }}
    >
      {/* الهيدر العلوي للقسم */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 0.2,
            color: "text.primary",
            textAlign: "start",
          }}
        >
          آراء وتقييمات العملاء
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", fontWeight: 600, textAlign: "start" }}
        >
          إجمالي التقييمات المستقبلة: {feedbacks.length}
        </Typography>
      </Box>

      {/* شبكة الكروت */}
      <Grid container spacing={2.5}>
        {feedbacks.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "#e2e8f0",
                backgroundColor: "#ffffff",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 10px 25px -5px rgba(0, 0, 0, 0.05)",
                  borderColor: "#cbd5e1",
                },
              }}
            >
              <CardContent
                sx={{
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2, // تباعد موحد بين العناصر الداخلية
                  height: "100%",
                }}
              >
                {/* 1. رأس الكرت: رقم الطاولة يمين والوقت يسار */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "10px",
                        bgcolor: "#fff7ed", // برتقالي خفيف جداً يتماشى مع TAPPO
                        color: "#ff6b00",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TableRestaurantIcon fontSize="small" />
                    </Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="700"
                      color="#1e293b"
                    >
                      طاولة {item.tableNumber}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    color="#94a3b8"
                  >
                    <AccessTimeIcon sx={{ fontSize: 15 }} />
                    <Typography variant="caption" fontWeight="500">
                      {item.createdAt}
                    </Typography>
                  </Stack>
                </Box>

                {/* 2. النجوم والتقييم */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Rating
                    value={item.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                    sx={{ color: "#f59e0b" }}
                  />
                  <Typography
                    variant="caption"
                    fontWeight="700"
                    color="#64748b"
                  >
                    ({item.rating}/5)
                  </Typography>
                </Box>

                {/* 3. الوسوم (Tags) */}
                {item.tags && item.tags.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={0.8}>
                    {item.tags.map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        sx={{
                          borderRadius: "6px",
                          backgroundColor: "#f8fafc",
                          color: "#475569",
                          border: "1px solid #e2e8f0",
                          fontWeight: "500",
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* 4. نص الملاحظة (إن وجد) */}
                {item.comment && (
                  <Box
                    sx={{
                      mt: "auto", // يضمن المحاذاة لأسفل الكرت دائماً
                      p: 1.8,
                      borderRadius: "10px",
                      backgroundColor: "#f8fafc",
                      borderRight: "3px solid #ff6b00", // خط أصفر/برتقالي جانبي نظيف
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#334155"
                      sx={{ lineHeight: 1.6, textAlign: "right" }}
                    >
                      "{item.comment}"
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Feedbacks;
