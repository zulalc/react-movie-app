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

export const minToHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
};
