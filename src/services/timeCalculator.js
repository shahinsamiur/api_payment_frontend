export function timeCalculator(date) {
  const now = new Date();
  const target = new Date(date);

  const diffMs = now.getTime() - target.getTime();

  if (diffMs < 0) return "In the future";

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) {
    return `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
}

export function getRemainingDays(endDateStr) {
  const now = new Date();
  const endDate = new Date(endDateStr);
  const diffTime = endDate - now;

  if (diffTime <= 0) {
    return "0 Days 0 Hours";
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (diffDays === 0) {
    return `${diffHours} Hour${diffHours !== 1 ? "s" : ""}`;
  }

  if (diffHours === 0) {
    return `${diffDays} Day${diffDays !== 1 ? "s" : ""}`;
  }

  return `${diffDays} Day${diffDays !== 1 ? "s" : ""} ${diffHours} Hour${
    diffHours !== 1 ? "s" : ""
  }`;
}
