import React, { useState } from "react";
import DetailButton from "../../../components/Common/DetailButton";
import MenuNavigate from "../../../components/Common/MenuNavigate";
import SearchForm from "../../../components/Refrigerator/Common/SearchForm";


const FoodList = () => {
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => setShowPopup(!showPopup);

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option="유제품 전체보기" alertPath="/addinfo/habit" />
            
            <div className="self-stretch pt-8">
                <SearchForm />
            </div>

            <div
                style={{
                    width: 342,
                    height: 33,
                    position: 'relative',
                    marginTop: '32px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <div style={{ fontWeight: 500, fontSize: 28 }}>유제품</div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 0,
                            bottom: 0
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: 8
                            }}
                        >
                            <div
                                style={{
                                    marginRight: 4,
                                    fontWeight: 500,
                                    fontSize: 14
                                }}
                            >
                                총
                            </div>
                            <div style={{ fontWeight: 500, fontSize: 14 }}>20개</div>
                        </div>
                        <img
                            src="/assets/filter.png"
                            alt="Filter"
                            style={{ width: 16, height: 14, cursor: 'pointer' }}
                            onClick={togglePopup}
                        />
                    </div>
                </div>
            </div>

            <div className="self-stretch pt-5 mt-[16px]">
                <DetailButton
                    foodCategory="cheese"
                    expireDate="2024.08.20"
                    option="서울우유 체다치즈"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.20"
                    option="서울우유 플레인 요거트 순수무가당"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.20"
                    option="매일유업 매일바이오 제로 요구르트"
                />
                <DetailButton
                    foodCategory="cheese"
                    expireDate="2024.08.15"
                    option="서울우유 체다치즈"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.15"
                    option="서울우유 플레인 요거트 순수무가당"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.15"
                    option="매일유업 매일바이오 제로 요구르트"
                />
                <DetailButton
                    foodCategory="cheese"
                    expireDate="2024.08.12"
                    option="서울우유 체다치즈"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.12"
                    option="서울우유 플레인 요거트 순수무가당"
                />
                <DetailButton
                    foodCategory="milkcow"
                    expireDate="2024.08.12"
                    option="매일유업 매일바이오 제로 요구르트"
                />
            </div>

            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            width: '390px',
                            height: '258px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '24px 24px 0px 0px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '46px',
                                fontWeight: 600,
                                fontSize: '18px',
                                marginLeft: '24px',
                                boxSizing: 'border-box'
                            }}
                        >
                            조회 조건 설정
                        </div>
                        <div
                            style={{
                                width: 342,
                                height: 56,
                                marginTop: 15,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div
                                style={{
                                    width: 108,
                                    height: 56,
                                    borderRadius: 12,
                                    border: '1px solid #E1E1E1',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontWeight: 400,
                                    fontSize: 16
                                }}
                            >
                                이름 순
                            </div>
                            <div
                                style={{
                                    width: 108,
                                    height: 56,
                                    borderRadius: 12,
                                    border: '1px solid #E1E1E1',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontWeight: 400,
                                    fontSize: 16
                                }}
                            >
                                등록일 순
                            </div>
                            <div
                                style={{
                                    width: 108,
                                    height: 56,
                                    borderRadius: 12,
                                    border: '1px solid #E1E1E1',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontWeight: 400,
                                    fontSize: 16
                                }}
                            >
                                유통기한 순
                            </div>
                        </div>
                        <div
                            style={{
                                width: 342,
                                height: 56,
                                borderRadius: 12,
                                background: '#2377EF',
                                marginTop: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    color: '#FFFFFF',
                                    margin: 0
                                }}
                            >
                                조회
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default FoodList;
