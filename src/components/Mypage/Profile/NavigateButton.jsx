import { useNavigate } from "react-router-dom";

const NavigateButton = () => {
  const navigate = useNavigate();

  const handleNavigate = (nextPath) => {
    navigate(nextPath);
  };

  return (
    <div className="self-stretch flex items-center w-[342px]">
      <div className="flex flex-col justify-center items-start w-1/2 h-full">
        <div
          className="flex justify-center items-center h-[50px] cursor-pointer hover:bg-gray-100 rounded-xl px-5"
          onClick={() => handleNavigate("/mypage/fridgeupdate")}
        >
          <img
            className="w-7 h-7 mr-[10px]"
            src="/assets/cogwheel.png"
            alt="버튼 이미지"
          />
          냉장고 수정
        </div>
        <div
          className="flex justify-center items-center h-[50px] cursor-pointer hover:bg-gray-100 rounded-xl px-5"
          onClick={() => handleNavigate("/Refrigerator/food/AddFridge")}
        >
          <div className="w-7 h-7 mr-[10px] flex justify-center items-center">
            <img
              className="w-5 h-7"
              src="/assets/iconrefridge.png"
              alt="버튼 이미지"
            />
          </div>
          냉장고 추가
        </div>
        <div
          className="flex justify-center items-center h-[50px] cursor-pointer hover:bg-gray-100 rounded-xl px-5"
          onClick={() => handleNavigate("/mypage/userinvite")}
        >
          <img
            className="w-7 h-7 mr-[10px]"
            src="/assets/mail.png"
            alt="버튼 이미지"
          />
          초대 코드
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-1/2 h-full">
        <div
          className="flex justify-center items-center h-[50px] cursor-pointer hover:bg-gray-100 rounded-xl px-5"
          onClick={() => handleNavigate("/mypage/fridgedelete")}
        >
          <img
            className="w-7 h-7 mr-[10px]"
            src="/assets/garbage.png"
            alt="버튼 이미지"
          />
          냉장고 삭제
        </div>
        <div
          className="flex justify-center items-center h-[50px] cursor-pointer hover:bg-gray-100 rounded-xl px-5"
          onClick={() => handleNavigate("/mypage/userdelete")}
        >
          <img
            className="w-7 h-7 mr-[10px]"
            src="/assets/userdelete.png"
            alt="버튼 이미지"
          />
          구성원 삭제
        </div>
      </div>
    </div>
  );
};

export default NavigateButton;
