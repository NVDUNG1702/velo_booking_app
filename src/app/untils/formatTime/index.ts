export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options).split('/').reverse().join('-');
}

export const formatTimeTable = (time: string): string => {
    // Tách giờ và phút từ chuỗi thời gian
    const [hours, minutes] = time.split(':').map(Number);

    // Kiểm tra phút để định dạng đúng
    if (minutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h${minutes}`;
};
