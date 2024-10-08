import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import qs from 'qs';


const API_URL = import.meta.env.VITE_API_REFRI;
const API_KEY = import.meta.env.VITE_API_FOODAPI_KEY;

// API 호출 함수
const fetchFridgeOptions = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/api/food/refri/user/refrilist`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error fetching fridge options:', error);
        throw error;
    }
};

// React Query 훅
const useFridgeOptions = (userId) => {
    return useQuery({
        queryKey: ['fridgeOptions', userId],
        queryFn: () => fetchFridgeOptions(userId),
        enabled: !!userId, // userId가 있을 때만 호출
    });
};
export default useFridgeOptions;


export const inviteRefri = async (userId, refrigeratorId) => {
    try {
        const response = await axios.post(`${API_URL}/api/food/refri/invite/user`,
            { userId, refrigeratorId },
            { withCredentials: true }
        );
        return response.data;
    } catch (e) {
        console.log("추가에서 에러나는거임?~~₩", e);
        throw e;
    }
};

//마스터 사용자가 만든 냉장고 조회

export const masterUserList = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/food/refri/master/refrilist`, {
            params: {
                id: userId
            },
            withCredentials: true // 옵션으로 설정
        });
        // 여기서 response.data는 refrigerator 객체 리스트가 됨
        return response.data;
    } catch (error) {
        // 에러가 HTTP 500일 경우에만 콘솔에 로그를 찍지 않음 //현재는 마스터 사용자가 아니면 모두 500번에러를 반환함
        if (error.response && error.response.status === 500) {
            return null;
        } else {
            // 다른 에러는 콘솔에 출력
            console.error("Error fetching master user list:", error);
            throw error;
        }
    }
}


//마스터 냉장고 사용자가 이름 변경
export const masterUserRefri = async ({ userId, data }) => {
    try {
        const response = await axios.post(`${API_URL}/api/food/refri/master/update`, {
            userId: userId,
            data: data
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

//마스터 냉장고 사용자가 냉장고 삭제
export const masterUserDelete = async (refrigerator_id) => {
    try {
        // `refrigerator_id`를 쿼리 파라미터로 전달
        const response = await axios.post(
            `${API_URL}/api/food/refri/delete`,
            null, // 요청 본문은 빈 객체
            {
                params: { refrigerator_id } ,// 쿼리 파라미터로 전달
                withCredentials: true // 옵션으로 설정
            }
        );

        return response.data;
    } catch (error) {
        console.error("에러 그만떠 미친새끼야:", error);
    }
};




export const inviteUserDelete = async (userId, refrigerator_id) => {
    try {
        const response = await axios.delete(`${API_URL}/api/food/refri/invite/delete`, {
            params: {
                userId: userId,
                refrigerator_id: refrigerator_id
            },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
            withCredentials: true // 옵션으로 설정
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};




//음식추가
export const saveBarcode = async (product, onSuccess) => {
    try {
        const response = await axios.post(`${API_URL}/api/food/barcodes`, product,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.exists) {
            alert('중복된 바코드가 이미 존재합니다.');
        } else {
            alert(`${product.productName} 재료가 성공적으로 저장되었습니다.`);
            if (onSuccess) onSuccess();
        }
    } catch (error) {
        console.error('DB에 제품을 저장하는 중 오류 발생', error);
    }
};

export const UserList = async (userId) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/food/user?userId=${userId}`, // 쿼리 파라미터로 데이터 전달
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // 옵션으로 설정
            }
        );
        return response.data;
    } catch (e) {
        console.error("Error in inviteUserList:", e);
        throw e; // 에러를 상위로 전달
    }
};



export const inviteUserList = async (userId, refrigeratorId) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/food/refri/invite/userlist`,
            { userId, refrigerator_id: refrigeratorId }, // 요청 본문에 데이터 전달
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // 옵션으로 설정
            }
        );
        return response.data;
    } catch (e) {
        console.error("Error in inviteUserList:", e);
        throw e; // 에러를 상위로 전달
    }
};




// 이미지 URL을 사용하는 OCR 인식 요청 함수
export const recognizeTextWithUrl = async (imageUrl) => {
    const ocrRequest = {
        images: [
            {
                format: 'png',
                name: 'barcodereader',
                url: imageUrl // 전체 이미지 URL
            }
        ],
        requestId: 'string',
        version: 'V2',
        timestamp: Date.now(),
    };
    try {
        const response = await axios.post(`${API_URL}/api/food/ocr`, ocrRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error recognizing text:", error.response ? error.response.data : error.message);
        throw error;
    }
};




export const fetchFoodSafetyInfo = async (barcode) => {
    try {
        const response = await axios.get(`${API_URL}/api/food/barcode/result`, {
            params: {
                barcode: barcode
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching food safety info:", error);
        throw error;
    }
};
