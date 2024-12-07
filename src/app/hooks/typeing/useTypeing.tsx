import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UseTypingProps {
    textList: string[]; // Danh sách chuỗi cần nhập
    typingSpeed?: number; // Tốc độ nhập ký tự (ms)
    pauseBetweenTexts?: number; // Thời gian chờ giữa các chuỗi (ms)
    deleteSpeed?: number;
}

export const UseTyping = ({
    textList,
    typingSpeed = 100,
    pauseBetweenTexts = 1000,
    deleteSpeed = 50,
}: UseTypingProps) => {

    const [currentText, setCurrentText] = useState(''); // Chuỗi hiện tại đang hiển thị
    const [currentIndex, setCurrentIndex] = useState(0); // Vị trí chuỗi trong danh sách
    const [isDeleting, setIsDeleting] = useState(false); // Trạng thái xóa chuỗi

    useEffect(() => {
        let typingTimeout: NodeJS.Timeout;

        const currentString = textList[currentIndex];

        if (!isDeleting) {
            // Hiển thị từng ký tự
            if (currentText.length < currentString.length) {
                typingTimeout = setTimeout(() => {
                    setCurrentText((prev) => currentString.slice(0, prev.length + 1));
                }, typingSpeed);
            } else {
                // Dừng để chờ trước khi xóa
                typingTimeout = setTimeout(() => setIsDeleting(true), pauseBetweenTexts);
            }
        } else {
            // Xóa từng ký tự
            if (currentText.length > 0) {
                typingTimeout = setTimeout(() => {
                    setCurrentText((prev) => currentText.slice(0, prev.length - 1));
                }, deleteSpeed);
            } else {
                // Chuyển sang chuỗi tiếp theo
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % textList.length); // Quay lại chuỗi đầu tiên nếu hết danh sách
            }
        }

        return () => clearTimeout(typingTimeout); // Dọn dẹp khi component bị hủy
    }, [currentText, isDeleting, currentIndex, textList, typingSpeed, pauseBetweenTexts]);

    return {
        currentText
    }
};

