export const isCheckTimeExpired = (inputTime: string): boolean => {
    // Tách giờ và phút từ chuỗi thời gian truyền vào
    const [inputHours, inputMinutes] = inputTime.split(':').map(Number);

    // Lấy thời gian hiện tại
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    // Tính tổng số phút
    const currentTotalMinutes = nowHours * 60 + nowMinutes;
    const inputTotalMinutes = inputHours * 60 + inputMinutes;

    // Kiểm tra nếu đã quá 10 phút
    return currentTotalMinutes >= inputTotalMinutes + 10;
};
