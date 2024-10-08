import { useEffect, useState } from 'react';
import FridgeDeleteButton from './FridgeDeleteButton';
import { masterUserDelete, masterUserList } from '../../../query/RefriQuery';
import useUserStore from "../../../store/useUserStore.js";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FridgeSelect = () => {
    const { userId, isLogin, LoginSuccessStatus } = useUserStore();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]); // 사용자 데이터를 저장할 상태 변수
    const navigate = useNavigate();

    const handleSelection = (optionId) => {
        // 선택된 옵션이 현재 선택된 옵션과 같다면 선택 취소
        if (selectedOption === optionId) {
            setSelectedOption(null);
        } else {
            // 새 옵션 선택
            setSelectedOption(optionId);
        }
    };

    const refriDelete = async (optionId) => {
        try {
            // 1. 냉장고 이름 가져오기
            const response = await axios.get(`https://api.icebuckwheat.kro.kr/api/food/find/refriName`, {
                params: { refrigerator_id: optionId }
            });
            const refrigeratorName = response.data; // 냉장고 이름
            //console.log(optionId);
            //console.log(refrigeratorName);
            
            //2. 알림 전송 // 냉장고 삭제
            try {
                await axios.post(`${import.meta.env.VITE_ALERT_IP}/deleteRefrigeratorNotification`, {
                    sender: encodeURIComponent(userId),
                    //sender: userId,
                    senderrefri: optionId,
                    memo: refrigeratorName,
                });
                //console.log("알림이 성공적으로 전송되었습니다.");
            } catch (error) {
                //console.error("알림 전송 중 오류 발생:", error);
                //alert("알림을 전송하는 중 오류가 발생했습니다. 관리자에게 문의하세요.");
            }

            await masterUserDelete(optionId);
            setOptions(prevOptions => prevOptions.filter(option => option.refrigerator_id !== optionId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = () => {
        if (selectedOption) {
            refriDelete(selectedOption);
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        if (savedToken && !isLogin) {
            LoginSuccessStatus(savedToken);
        }
        if (!userId) {
            navigate("/login");
        }
    }, [userId, isLogin, navigate, LoginSuccessStatus]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await masterUserList(userId);
                if (data) {
                    setOptions(data);
                } else {
                    setOptions([]);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
                setOptions([]);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    return (
        <div className="self-stretch">
            <div className="h-[220px] flex flex-col">
                {options.length === 0 ? (
                    <div className="space-y-8 mt-16">
                        <div className="flex justify-center items-center">
                            <img src={"/assets/confirm.png"} alt="confirm"/>
                        </div>
                        <center><p>등록된 냉장고가 없습니다</p></center>
                    </div>
                ) : (
                    options.map((option, index) => (
                        <label
                            key={index}
                            className={`flex items-center font-['Pretendard'] text-[#191F28] text-base font-semibold w-[342px] h-14 mb-3 border rounded-xl cursor-pointer ${
                                selectedOption === option.refrigerator_id ? 'border-blue-500' : 'border-[#E1E1E1]'
                            } hover:border-[#E1E1E1]`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedOption === option.refrigerator_id}
                                onChange={() => handleSelection(option.refrigerator_id)}
                                className="w-6 h-6 ml-2 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                            />
                            <div className="flex w-[342px] ml-3">
                                {option.refrigeratorName} {/* 객체의 속성을 사용하여 표시 */}
                            </div>
                        </label>
                    ))
                )}
            </div>
            {options.length > 0 && ( // 옵션이 있을 때만 삭제 버튼을 표시
                <FridgeDeleteButton
                    option={options.find(opt => opt.refrigerator_id === selectedOption)?.refrigeratorName || ''}
                    isEnabled={!!selectedOption}
                    onDelete={handleDelete} // 삭제 핸들러를 전달
                />
            )}
        </div>
    );
};

export default FridgeSelect;
