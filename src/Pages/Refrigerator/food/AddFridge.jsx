import React, { useState, useEffect } from 'react';
import MenuNavigate from "../../../components/Common/MenuNavigate.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddFridge = () => {
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(false); // 버튼 활성화 상태
    const [userId, setUserId] = useState('testuser'); // 예시로 userId를 testuser 로 설정
    const [form, setForm] = useState({ refrigeratorName: '' });

    useEffect(() => {
        // input 창에 값이 있을 때 버튼을 활성화
        setIsEnabled(form.refrigeratorName.trim().length > 0);
    }, [form.refrigeratorName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { ...form, userId }; // userId를 포함한 데이터

        try {
            const response = await axios.post('http://localhost:9000/api/refri/insert', product);

            if (response.data.exists) {
                alert('중복된 이름의 냉장고가 이미 존재합니다.');
            } else {
                alert(`${product.refrigeratorName} 냉장고가 성공적으로 생성되었습니다.`);
                setForm({ refrigeratorName: '' }); // 폼 초기화
                navigate("/fridge/fridgemanage"); // 냉장고 관리 페이지로 이동
            }
        } catch (error) {
            console.error('DB에 냉장고를 저장하는 중 오류 발생', error);
        }
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"냉장고 추가"} alertPath="/addinfo/habit" />
            <div style={{ width: 342, height: 111, fontWeight: 600, fontSize: 28, marginTop: 24 }}>
                냉장고 이름을 입력해주세요.<br />
                <div style={{ width: 342, height: 21, fontWeight: 500, fontSize: 15, color: '#767676', marginTop: 14 }}>
                    냉장고를 등록해 음식을 편리하게 관리해보세요.
                </div>
            </div>
            <img style={{ width: 240, height: 240, marginTop: 25 }} src="/assets/refridge.png" />
            <div style={{ width: 342, marginTop: 12 }}>
                <input
                    type="text"
                    id="addFridge"
                    placeholder="냉장고 이름을 입력해주세요"
                    name="refrigeratorName"
                    value={form.refrigeratorName}
                    onChange={handleInputChange} // input 값 업데이트
                    style={{
                        width: '100%',
                        height: '56px',
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid #E1E1E1',
                        backgroundColor: '#FFFFFF',
                        fontSize: '15px',
                        color: '#767676',
                        marginTop: 30
                    }}
                />
            </div>
            <div
                style={{
                    width: 342,
                    height: 56,
                    borderRadius: 12,
                    border: "1px solid #E1E1E1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] h-14 cursor-pointer absolute bottom-[300px] ${
                    isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
                }`}
                onClick={isEnabled ? handleSubmit : null} // 클릭 시 제출 함수 호출
            >

                <p style={{ fontWeight: 500, fontSize: 16 }}>냉장고 등록하기</p>
            </div>
        </main>
    );
};

export default AddFridge;