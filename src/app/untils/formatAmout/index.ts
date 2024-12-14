export const formatCurrencyVND = (amount: number | string): string => {
    const number = parseFloat(amount.toString());

    if (isNaN(number)) return "0 ₫";

    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });
};