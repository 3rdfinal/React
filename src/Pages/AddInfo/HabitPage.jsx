import Header from '../../components/AddInfo/Habit/Header';
import HabitSelect from '../../components/AddInfo/Habit/HabitSelect';
import Navigation from '../../components/AddInfo/Habit/Navigation';

const HabitPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[480px]">
            <Navigation/>
            <Header/>
            <HabitSelect/>
        </main>
    );
};

export default HabitPage;