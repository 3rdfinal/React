import { useState, useEffect } from 'react';
import MenuNavigate from '../../components/Common/MenuNavigate';
import Header from '../../components/Mypage/FridgeDelete/Header';
import FridgeSelect from '../../components/Mypage/FridgeDelete/FridgeSelect';

const FridgeDeletePage = () => {

    const [animationClass, setAnimationClass] = useState('animate-slideInUp');

    useEffect(() => {
        setAnimationClass('animate-slideInUp');

        return () => {
            setAnimationClass('animate-slideOutDown');
        };
    }, []);

    return (
        // 공통 기본 틀
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen`}>
            {/* 최상단 메뉴 */}
            <MenuNavigate option={"내 정보"} alertPath="/addinfo/habit"/>
            <Header/>
            <FridgeSelect/>
        </main>
    );
};

export default FridgeDeletePage;