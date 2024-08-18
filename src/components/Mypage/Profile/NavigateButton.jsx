

const NavigateButton = () => {
    return (
        <div className="self-stretch flex items-center w-[342px]">
            <div className="flex flex-col justify-center items-start w-1/2 h-full">
                <div className="flex justify-center items-center h-[50px]">
                    <img className="w-7 h-7 mr-[10px]" src="/assets/cheese.png" alt="버튼 이미지"/>
                    냉장고 수정
                </div>
                <div className="flex justify-center items-center h-[50px]">
                    <img className="w-7 h-7 mr-[10px]" src="/assets/cheese.png" alt="버튼 이미지"/>
                    초대 코드
                </div>
                <div className="flex justify-center items-center h-[50px]">
                    <img className="w-7 h-7 mr-[10px]" src="/assets/cheese.png" alt="버튼 이미지"/>
                    QR코드
                </div>
            </div>
            <div className="flex flex-col justify-start items-start w-1/2 h-full">
                <div className="flex justify-center items-center h-[50px]">
                    <img className="w-7 h-7 mr-[10px]" src="/assets/cheese.png" alt="버튼 이미지"/>
                    냉장고 삭제
                </div>
                <div className="flex justify-center items-center h-[50px]">
                    <img className="w-7 h-7 mr-[10px]" src="/assets/cheese.png" alt="버튼 이미지"/>
                    구성원 삭제
                </div>
            </div>
        </div>
    );
};

export default NavigateButton;