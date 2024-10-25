export function formatTimestampCustom(timestamp: string): string {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-6); // Adjust this for 6 digits

  return `${day} ${month} ${year}`;
}
