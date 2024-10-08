import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Kakao_GetAccessToken} from "../../query/LoginQuery.jsx";
import LoadingBar from "./LoadingBar.jsx";
import useUserStore from "../../store/useUserStore.js";

const KakaoLoginAccess = () => {
    const code = new URLSearchParams(useLocation().search).get("code"); //return code 값
    const {LoginSuccessStatus} = useUserStore();

    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", code], // Include code and param in the query key for caching
        queryFn: () => Kakao_GetAccessToken("kakao", code), // Call get_jwt with the parameters
        enabled: !!code, // Only run the query if code and param are truthy
        retry: false,
        refetchOnWindowFocus : false,
    });


    useEffect(() => {
        if (isLoading) {
            return; // Do nothing while loading
        }

        if (isError) {
            navigate("/login"); // Navigate to login on error
        } else if (data && data.accessToken) {
            LoginSuccessStatus(data.accessToken);
            //localStorage.setItem('accessToken', data.accessToken); // 로컬 스토리지에 저장
            navigate("/"); // Navigate to the home page after storing the token
        }
    }, [isLoading, isError, data, navigate]); // Dependencies for useEffect

    if (isLoading) {
        return <LoadingBar/> // Show loading state
    }

    return null; // Fallback return

};

export default KakaoLoginAccess;
