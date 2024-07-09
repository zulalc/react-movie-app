export const ratingToPercentage = (rating) => {
  return (rating * 10)?.toFixed(0);
};

export const resolveRatingColor = (rating) => {
  if (rating >= 7) {
    return "green.500";
  } else if (rating >= 5) {
    return "orange.500";
  } else {
    return "red.500";
  }
};
