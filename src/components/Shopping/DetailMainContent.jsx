
import HorizontalLine from './../Common/HorizontalLine';
import { useState } from 'react';

const DetailMainContent = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='self-stretch mt-[50px]'>
            <div className='flex justify-between h-6'>
                <div className='font-medium text-[18px]'>상세필터</div>
                <div>
                    <img src="/assets/filter.png" alt="필터사진" className='cursor-pointer' onClick={handleClick}/>
                </div>
            </div>
            <div className='flex justify-center items-center space-x-3 mt-8'>
                <div className='flex justify-center items-center w-auto px-[13px] h-[36px] border-[1px] rounded-xl text-[14px] font-semibold'>
                    낮은 가격순
                    <img src="/assets/cancel.png" alt="취소" className='w-[18px] h-[18px] ml-[6px]'/>
                </div>
                <div className='flex justify-center items-center w-auto px-[13px] h-[36px] border-[1px] rounded-xl text-[14px] font-semibold'>
                    판매량 순
                    <img src="/assets/cancel.png" alt="취소" className='w-[18px] h-[18px] ml-[6px]'/>
                </div>
                <div className='flex justify-center items-center w-auto px-[13px] h-[36px] border-[1px] rounded-xl text-[14px] font-semibold'>
                    할인율
                    <img src="/assets/cancel.png" alt="취소" className='w-[18px] h-[18px] ml-[6px]'/>
                </div>
            </div>
            <div className='mt-[10px] mb-8'>
                <HorizontalLine/>
            </div>
            <div>
                <div className='flex justify-center items-center max-h-[130px]'>
                    <div className='mr-3'>
                        <img src="/assets/koreanmelon.png" alt="참외"  className='w-[130px] h-[130px]'/>
                    </div>
                    <div className='flex flex-col justify-evenly'>
                        <div className='flex flex-col space-y-2'>
                            <div className='font-normal text-[15px]'>당도선별 성주 참외 1.5kg(4개~7개 입)</div>
                            <div className='px-3 py-1 w-fit rounded-2xl font-medium text-[13px] bg-[#2377EF] text-white'>호주산</div>
                            <div>별다섯개</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='text-[#EC3A3A] font-semibold text-[18px]'>40%</div>
                            <div className='font-bold text-[15px]'>7,900원</div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalVisible && (
                <div>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={closeModal}
                    ></div>

                    <div className="fixed bottom-0 left-0 bg-white w-[390px] h-[648px] px-6 z-50 rounded-2xl">
                        <div className="flex justify-between items-center mt-1 h-[46px]">
                            <div className="text-lg font-bold">상세 필터</div>
                            <button onClick={closeModal} className="text-lg font-bold">
                                &times;
                            </button>
                        </div>
                        <div className="cursor-pointer mt-8 flex justify-evenly w-[342px] flex-col">
                            <div>
                                <div className='font-semibold text-[16px] mb-3'>
                                    가격순
                                </div>
                                <div className='font-medium text-[14px] text-[#767676] flex'>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        높은 가격순
                                    </div>
                                    
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        낮은 가격순
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='font-semibold text-[16px] mt-[40px] mb-3'>원산지</div>
                                <div className='font-medium text-[14px] text-[#767676] w-[217px] flex justify-between'>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        국내산
                                    </div>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        미국산
                                    </div>
                                </div>
                                <div className='font-medium text-[14px] mt-4 text-[#767676] w-[217px] flex justify-between'>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        말레시아산
                                    </div>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        중국산
                                    </div>
                                </div>
                                <div className='font-medium text-[14px] mt-4 text-[#767676] w-[217px] flex justify-between'>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        호주산
                                    </div>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        칠레산
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='font-semibold text-[16px] mt-[40px] mb-3'>기타</div>
                                <div className='font-medium text-[14px] space-y-[20px] text-[#767676]'>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        할인율 순
                                    </div>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        별점 높은 순
                                    </div>
                                    <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 ml-2 mr-3 border-solid border-[#E1E1E1] rounded-md cursor-pointer bg-gray-200 checked:bg-blue-500 checked:border-blue-500 hover:border-[#E1E1E1]"
                                    />
                                        판매량 순
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end items-center mt-6'>
                            <div className='mr-[10px] border-[1px] w-[110px] h-[56px] border-[#E1E1E1] rounded-xl flex justify-center items-center text-[16px] font-normal'>
                                초기화
                            </div>
                            <div className="w-[222px] h-[56px] cursor-pointer rounded-xl text-white flex justify-center items-center bg-[#2377EF]">
                                조회
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailMainContent;