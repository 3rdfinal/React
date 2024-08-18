
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const CreateButton = ({ option, nextPath }) => {
    const navigate = useNavigate();

    const nextPage = () => {
        navigate(nextPath);
    };

    return (
        <div className="self-stretch w-[480px] h-14">
            <div className="self-stretch flex items-center border rounded-xl w-[342px]">
                <div className="flex items-center justify-center w-full h-14 text-gray-900 cursor-pointer" onClick={nextPage}>
                    {option}
                </div>
            </div>
        </div>
    );
};

CreateButton.propTypes = {
    option : PropTypes.string.isRequired,
    nextPath : PropTypes.string.isRequired,
}; 

export default CreateButton;