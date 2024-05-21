export const HandleDateTime = {
  GetHour: function (date) {
    if (!date) return "";
    const hours = date.getHours();
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  },
  GetFormattedDate: function (date) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  },
};
