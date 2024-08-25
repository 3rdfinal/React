import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAddPost } from '../../../query/FeedQuery'; // React Query 훅 import
import useUserStore from '../../../store/useUserStore'; // Zustand store import

const CreateFeed = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [recipe, setRecipe] = useState('');
    const [stepDescription, setStepDescription] = useState('');
    const [stepImage, setStepImage] = useState(null);
    const [steps, setSteps] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false); // 버튼 활성화 상태
    const navigate = useNavigate();

    // React Query 훅에서 mutation 가져오기
    const { mutate: addPost } = useAddPost();
    const { userId } = useUserStore(); // Zustand store에서 유저 ID 가져오기

    useEffect(() => {
        // 모든 필드가 채워졌는지 확인
        if (title && content && tag) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    }, [title, content, tag]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // 이미지 base64 저장
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStepImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStepImage(reader.result); // 스텝 이미지 base64 저장
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddStep = () => {
        if (stepDescription) {
            const newStep = {
                description: stepDescription,
                image: stepImage || null // 스텝 이미지가 없을 경우 null 처리
            };
            setSteps([...steps, newStep]);
            setStepDescription('');
            setStepImage(null);
        }
    };

    const handleRemoveStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (isEnabled && userId) {
            // 게시물 데이터 생성
            const postingData = {
                title,
                contents: content,
                tags: tag,
                image: selectedImage || null, // 이미지가 없을 경우 null 처리
                user_id: userId,
                writeday: new Date().toISOString(), // 작성일자 추가 (ISO 형식)
                recipe_id: recipe || null, // 레시피 ID가 없을 경우 null 처리
                steps // 스텝 데이터 추가
            };

            console.log("Posting Data:", postingData); // 데이터 확인용 콘솔 로그

            try {
                // React Query의 mutate 함수를 사용하여 게시물 추가
                await addPost(postingData);

                // 게시물 추가 후 페이지 이동
                navigate('/community/feed');
            } catch (err) {
                console.error("Error adding posting:", err.response?.data || err);
                alert("Failed to create post. Please check the console for details.");
            }
        } else {
            alert("Please fill in all required fields.");
        }
    };

    return (
        <div className="self-stretch">
            <div className="flex justify-center items-center mb-8">
                <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer w-[180px] h-[180px] bg-gray-200 flex justify-center items-center rounded-full overflow-hidden"
                >
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Uploaded"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <AiOutlinePlus size={40} className="text-gray-500" />
                            <span className="text-gray-500 mt-2">Add Photo</span>
                        </div>
                    )}
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </label>
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center mt-4">
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="30글자 이내로 제목을 입력해 주세요"
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] h-[200px] flex justify-center my-8">
                <input
                    id="recipe"
                    name="recipe"
                    type="text"
                    placeholder="레시피를 입력해 주세요."
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                    value={recipe}
                    onChange={(e) => setRecipe(e.target.value)}
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] h-[300px] flex justify-center my-8">
                <input
                    id="content"
                    name="content"
                    type="text"
                    placeholder="컨텐츠를 적어주세요."
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center mt-4">
                <input
                    id="tag"
                    name="tag"
                    type="text"
                    placeholder="# 해시테그"
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] p-4 my-8">
                <input
                    id="step-description"
                    name="step-description"
                    type="text"
                    placeholder="단계 설명을 입력해 주세요."
                    className="block outline-none w-full h-12 text-gray-900 placeholder:text-[#A8A8A8] mb-4"
                    value={stepDescription}
                    onChange={(e) => setStepDescription(e.target.value)}
                />
                <input
                    id="step-image"
                    name="step-image"
                    type="file"
                    accept="image/*"
                    onChange={handleStepImageChange}
                    className="block mb-4"
                />
                {stepImage && (
                    <img src={stepImage} alt="Step Preview" className="w-16 h-16 object-cover mb-2" />
                )}
                <button
                    type="button"
                    className="bg-blue-500 text-white rounded px-4 py-2"
                    onClick={handleAddStep}
                >
                    Add Step
                </button>
                <div className="mt-4">
                    {steps.map((s, index) => (
                        <div key={index} className="border rounded p-2 mb-2">
                            <div className="flex items-start mb-2">
                                <span className="flex-1">{`Step ${index + 1}: ${s.description}`}</span>
                                {s.image && (
                                    <img
                                        src={s.image}
                                        alt={`Step ${index + 1}`}
                                        className="w-16 h-16 object-cover ml-2"
                                    />
                                )}
                            </div>
                            <button
                                type="button"
                                className="text-red-500 w-full mt-2"
                                onClick={() => handleRemoveStep(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] mt-5 h-14 cursor-pointer ${
                    isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
                }`}
                onClick={isEnabled ? handleSubmit : undefined}
            >
                게시하기
            </div>
        </div>
    );
};

export default CreateFeed;
