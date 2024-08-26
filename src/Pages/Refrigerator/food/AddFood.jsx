import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuNavigate from '../../../components/Common/MenuNavigate';


const AddFood = () => {

    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);
    

    const handleNavigate = () => {
        navigate('/Refrigerator/food/AddBarcode'); // 페이지 이동할 경로 설정
    };


    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/Refrigerator/food/AddInput');
      };

   return(
    <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-32 mx-auto w-full max-w-[390px] min-h-[844px] h-screen`}>
        <MenuNavigate option={"일반 냉장고"} alertPath="/addinfo/habit" />
        <div style={{width: 342, height: 76, marginTop: 24}}>
            <p style={{fontWeight: 600, fontSize: 28}}>
                일반 냉장고에 음식<br/>
                추가할 방법을 선택해주세요.
            </p>
        </div>
        <img style={{width: 240, height: 240, marginTop: 40}} src='/assets/basket.png' alt='' />
        <div style={{
            width: 342,
            height: 56,
            borderRadius: 12,
            border: '1px solid #E1E1E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            cursor: "pointer"
        }}
             onClick={handleNavigate}>

            바코드 촬영으로 음식추가하기
        </div>
        <div style={{ width: 342,
            height: 56,
            borderRadius: 12,
            border: '1px solid #E1E1E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12, cursor:'pointer'}} onClick={handleNavigation}>
            직접입력
        </div>
    </main>
   )
}

export default AddFood;
