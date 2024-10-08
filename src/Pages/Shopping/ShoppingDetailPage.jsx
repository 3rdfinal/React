import { useState, useEffect } from "react";
import BarNavigate from "../../components/Common/BarNavigate";
import MenuNavigate from "../../components/Common/MenuNavigate";
import DetailMainContent from "../../components/Shopping/DetailMainContent";

const ShoppingDetailPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [animationClass, setAnimationClass] = useState("animate-slideInUp");

  useEffect(() => {
    setAnimationClass("animate-slideInUp");

    return () => {
      setAnimationClass("animate-slideOutDown");
    };
  }, []);

  return (
    <main
      className={`${animationClass} flex flex-col items-center pt-5 pb-32 mx-auto max-w-[390px] max-h-[844px]`}
    >
      <div>
        <MenuNavigate option={"식재료 검색"} alertPath="/addinfo/habit" />
      </div>
      <DetailMainContent setIsModalVisible={setIsModalVisible} />
      <div className={`w-full ${isModalVisible ? "opacity-0" : ""}`}>
        <BarNavigate
          shoppingsrc="/assets/shoppingselect.png"
          homesrc="/assets/home.png"
          searchsrc="/assets/search.png"
        />
      </div>
    </main>
  );
};
export default ShoppingDetailPage;
