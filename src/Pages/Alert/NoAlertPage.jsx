
import MenuNavigate from './../../components/Common/MenuNavigate';
import Body from './../../components/Alert/NoAlert/Body';

const NoAlertPage = () => {
    return (
        // 공통 기본 틀
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            {/* 최상단 메뉴 */}
            <MenuNavigate option={"알림"} alertPath="/addinfo/habit"/>
            <Body/>
        </main>
    );
};

export default NoAlertPage;