// HOOKS
import { useState } from "react";

// MUI COMPONENTS
import {
  SwipeableDrawer,
  Box,
  Typography,
  IconButton,
  Rating,
  TextField,
  Button,
  Chip,
} from "@mui/material";

// ICONS
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

// قائمة الوسوم السريعة
const QUICK_TAGS = [
  "خدمة سريعة",
  "جودة ممتازة",
  "المكان مزدحم",
  "تأخير في الطلب",
  "تعامل راقي",
];

function ReviewSection({ open, close }) {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // التعامل مع اختيار أو إلغاء اختيار الوسوم
  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // إرسال التقييم
  const handleSubmit = () => {
    setIsSubmitted(true);

    setTimeout(() => {
      if (close) close();
      setTimeout(() => {
        setRating(0);
        setSelectedTags([]);
        setComment("");
        setIsSubmitted(false);
      }, 300);
    }, 1500);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={close}
      onOpen={() => {}}
      disableSwipeToOpen={true}
      slotProps={{
        paper: {
          dir: "rtl", // تفعيل الاتجاه العربي للنافذة بالكامل
          sx: {
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            maxHeight: "85dvh", // جعل الارتفاع مرناً بحسب المحتوى بدلاً من height ثابت
            backgroundColor: "background.paper",
          },
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* المؤشر الرمادي العلوي (Drag Handle) */}
        <Box
          sx={{
            width: "45px",
            height: "4px",
            backgroundColor: "grey.300",
            borderRadius: "2px",
            mx: "auto",
            mb: 2,
            flexShrink: 0,
          }}
        />

        {!isSubmitted ? (
          <>
            {/* الهيدر */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2,
                flexShrink: 0,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                شاركنا رأيك
              </Typography>
              <IconButton
                onClick={close}
                size="small"
                sx={{ backgroundColor: "grey.100" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* منطقة المحتوى الدناميكية */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5, // مسافة ثابته ومنتظمة بين العناصر
                py: 1,
                overflowY: "auto",
              }}
            >
              {/* قسم التقييم بالنجوم */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="500"
                >
                  كيف كانت تجربتك اليوم؟
                </Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />
                  }
                  sx={{ fontSize: "3.2rem", gap: 0.5 }}
                />
              </Box>

              {/* الوسوم السريعة (تظهر فقط عند تقييم النجوم) */}
              {rating > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                    justifyContent: "flex-start",
                  }}
                >
                  {QUICK_TAGS.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      clickable
                      onClick={() => handleTagToggle(tag)}
                      color={
                        selectedTags.includes(tag) ? "primary" : "default"
                      }
                      variant={
                        selectedTags.includes(tag) ? "filled" : "outlined"
                      }
                      sx={{
                        borderRadius: "20px",
                        px: 0.5,
                        py: 2.2,
                        fontWeight: "500",
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* مربع النص الإضافي */}
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="عندك تفاصيل أكثر؟ (اختياري)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    backgroundColor: "grey.50",
                  },
                }}
              />
            </Box>

            {/* زر الإرسال */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={rating === 0}
              onClick={handleSubmit}
              sx={{
                borderRadius: "14px",
                py: 1.8,
                fontWeight: "bold",
                fontSize: "1rem",
                flexShrink: 0,
                mt: 2,
              }}
            >
              إرسال التقييم
            </Button>
          </>
        ) : (
          /* رسالة الشكر */
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              شكراً لك!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              تم استلام رأيك بنجاح، ونتمنى نشوفك قريباً.
            </Typography>
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
}

export default ReviewSection;