import React, { useEffect, useRef, useState } from 'react';
import MenuNavigate from "../../../components/Common/MenuNavigate.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; // axios import 추가

const Barcode = () => {
    const location = useLocation();
    const { refrigeratorName } = location.state || {};
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);
    const [ocrResult, setOcrResult] = useState('');
    const [inferTexts, setInferTexts] = useState([]);
    const [concatenatedText, setConcatenatedText] = useState('');
    const [foodSafetyInfo, setFoodSafetyInfo] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState({
        productName: '',
        expiryDate: '',
        companyName: '',
        address: '',
        productType: '',
        permissionDate: '',
        count: '',
        lcategory: '',
        scategory: ''
    });
    const [categories, setCategories] = useState({
        lcategories: [],
        scategories: []
    });

    const [showLcategories, setShowLcategories] = useState(false);
    const [showScategories, setShowScategories] = useState(false);

    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing the camera: ", error);
            }
        };
        initCamera();
    }, []);

    useEffect(() => {
        if (concatenatedText) {
            fetchFoodSafetyInfo(concatenatedText);
        }
    }, [concatenatedText]);

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (video && context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL('image/png');
            setCapturedImage(imageDataUrl);
            return imageDataUrl;
        }
        return null;
    };

    const recognizeText = async () => {
        const image = captureImage();
        if (!image) return;
        const apiUrl = '/ocr/custom/v1/33678/ae953fb9fe052d72be98d1323256888dc27f1ef8ef26a0f9d04e8a63d5c9d4d6/general';
        const secretKey = 'aHhaem1QdGxIQnJSbWZKTUdLRmh3cENPWlZWTEJJdE4=';
        try {
            const response = await axios.post(
                apiUrl,
                {
                    images: [
                        {
                            format: 'png',
                            name: 'image',
                            data: image.split(',')[1],
                        },
                    ],
                    requestId: 'string',
                    version: 'V2',
                    timestamp: Date.now(),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-OCR-SECRET': secretKey,
                    },
                }
            );
            if (response.data.images.length === 0 || response.data.images[0].fields.length === 0) {
                alert('텍스트를 인식하지 못했습니다. 다시 시도해 주세요.');
                return;
            }
            setOcrResult(response.data);

            extractInferTexts(response.data);
        } catch (error) {
            console.error("Error recognizing text: ", error);
        }
    };

    const extractInferTexts = (ocrData) => {
        const texts = [];

        ocrData.images.forEach((image) => {
            let concatenatedText = '';

            image.fields.forEach((field) => {
                const filteredText = field.inferText.replace(/\D/g, '');
                concatenatedText += filteredText;
            });

            if (concatenatedText.length === 12 || concatenatedText.length === 13) {
                texts.push(concatenatedText);
            }
        });

        setInferTexts(texts);

        const finalConcatenatedText = texts.join(' ');
        setConcatenatedText(finalConcatenatedText);
    };

    const fetchFoodSafetyInfo = async (barcode) => {
        const apiKey = '3369ab4c48b84f35a46c';
        const apiUrl = `https://openapi.foodsafetykorea.go.kr/api/${apiKey}/C005/json/1/5/BAR_CD=${barcode}`;

        try {
            const response = await axios.get(apiUrl);
            setFoodSafetyInfo(response.data);
            if (response.data.C005.total_count !== '0') {
                const product = response.data.C005.row[0];
                setAdditionalInfo({
                    productName: product.PRDLST_NM,
                    expiryDate: product.POG_DAYCNT,
                    companyName: product.BSSH_NM,
                    address: product.SITE_ADDR,
                    productType: product.PRDLST_DCNM,
                    permissionDate: product.PRMS_DT,
                    count: '',
                    lcategory: '',
                    scategory: ''
                });
            }
        } catch (error) {
            console.error("Error fetching food safety info: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdditionalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
            <MenuNavigate option={"음식 바코드"} alertPath="/addinfo/habit"/>
            <div style={{width: 342, height: 76, marginTop: 24}}>
                <p style={{fontWeight: 600, fontSize: 28}}>
                    상품 바코드를 찍어주세요<br/>
                </p>
            </div>
            <video ref={videoRef} autoPlay playsInline style={{width: '100%', height: 'auto'}}/>
            <canvas ref={canvasRef} style={{display: 'none'}}/>

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
            }}>
                <button onClick={recognizeText}>바코드 인식</button>
            </div>
            <div style={{
                width: 342,
                height: 56,
                borderRadius: 12,
                border: '1px solid #E1E1E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 12
            }}>
                직접입력
            </div>
            <div>
                {capturedImage && (
                    <div style={{marginRight: '20px'}}>
                        <h3>찍은 사진 임</h3>
                        <img src={capturedImage} alt="Captured"/>
                    </div>
                )}
                {ocrResult && (
                    <div>
                        <h3>OCR Result:</h3>
                        <textarea
                            value={JSON.stringify(ocrResult, null, 2)}
                            readOnly
                            style={{width: '400px', height: '300px'}}
                        />
                    </div>
                )}
            </div>
        </main>
    );
};

export default Barcode;