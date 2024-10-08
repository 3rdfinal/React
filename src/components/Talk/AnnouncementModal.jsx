import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import axiosApi from "../../Pages/Talk/axiosApi.js";
import useUserStore from "../../store/useUserStore.js";

const AnnouncementModal = ({ onRefri, isOpen, onClose, refreshAnnouncement }) => {
    const [announcement, setAnnouncement] = useState("");
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const api_server = import.meta.env.VITE_API_IP;
    const chatroomSeq = onRefri;
    //const { userId } = useUserStore();

    // 공지사항 업데이트 후 확인 및 처리
    const handleConfirmClick = () => {
        if (newAnnouncement.trim() !== "") {
            // axiosApi.post(`/api/announcement/${onRefri}`, {
            axiosApi.post(`${api_server}/api/announcement/${onRefri}`, {
                announcement: newAnnouncement
            }, {
                withCredentials: true
            }).then(() => {
                // 공지사항 업데이트 성공 시 새로운 공지사항을 저장
                setAnnouncement(newAnnouncement);

                // 입력 필드 초기화
                setNewAnnouncement("");

                //공지 알림 전송 함수 호출
                //sendNewChattingMasterNotification();

                // 모달을 닫음
                onClose();
            }).catch((error) => {
                console.error("Failed to update announcement.", error);
            });
        }
    };

    // 새로운 공지 알림을 전송하는 함수
    // const sendNewChattingMasterNotification = async () => {
    //     try {
    //         await axiosApi.post(`${import.meta.env.VITE_ALERT_IP}/newChattingMaster`, {
    //             sender: encodeURIComponent(userId),  // 공지사항을 설정한 사용자
    //             senderrefri: chatroomSeq, // 현재 냉장고(채팅방) ID
    //             memo: newAnnouncement,
    //         });
    //         //console.log("공지 알림이 성공적으로 전송되었습니다.");
    //     } catch (error) {
    //         //console.error("공지 알림 전송 중 오류 발생:", error);
    //     }
    // };

    // 모달이 열리면 해당 냉장고의 유저 목록을 가져오는 함수
    useEffect(() => {
        if (isOpen) {
            fetchCurrentAnnouncement(chatroomSeq); // 현재 설정된 공지사항 가져오기
        }
    }, [isOpen, chatroomSeq]);

    // 현재 공지사항 불러오기
    const fetchCurrentAnnouncement = async () => {
        try {
            const response = await axios.get(`${api_server}/api/announcement/${chatroomSeq}`, {
           // const response = await axios.get(`/api/announcement/${chatroomSeq}`, {
                withCredentials: true,
            });
            setAnnouncement(response.data.announcement); // 서버로부터 공지사항을 가져와 상태로 저장
        } catch (error) {
            console.error("Failed to fetch the current announcement.", error);
        }
    };

    if (!isOpen) return null;

    // 모달 바깥을 클릭했을 때 닫히게 하는 함수
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackdropClick}>
            <div className="bg-white rounded-lg p-6 w-[342px]" onClick={(e) => e.stopPropagation()}>
                <div className="text-lg font-semibold mb-8 flex flex-col justify-center items-center">
                    <p>공지사항을 등록해주세요 !</p>
                    <br />
                    <input
                        type="text"
                        className="ml-5 flex-1 rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 text-sm"
                        placeholder="새 공지사항 입력..."
                        value={newAnnouncement}
                        onChange={(e) => setNewAnnouncement(e.target.value)}
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleConfirmClick}
                        className="w-full h-14 border-[1px] rounded-xl"
                    >
                        공지사항 설정
                    </button>
                </div>
            </div>
        </div>
    );
};

AnnouncementModal.propTypes = {
    onRefri: PropTypes.string.isRequired, // 냉장고 ID prop
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AnnouncementModal;
