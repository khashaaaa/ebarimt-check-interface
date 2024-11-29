import axios from "axios";
import { createContext, useState, useCallback } from "react";

export const LotteryCheckContext = createContext();

export const LotteryCheckProvider = ({ children }) => {
    const [checkData, setCheckData] = useState(null);
    const [checkError, setCheckError] = useState(null);
    const [checkLoading, setCheckLoading] = useState(false);

    const check = useCallback(async (url, bodyParams) => {
        setCheckLoading(true);
        setCheckError(null);
        try {
            const response = await axios.post(url, bodyParams);
            setCheckData(response.data);
        } catch (err) {
            setCheckError(err.response.data.response);
        } finally {
            setCheckLoading(false);
        }
    }, []);

    const refreshCheck = () => {
        setCheckData(null)
        setCheckError(null)
    }

    return (
        <LotteryCheckContext.Provider value={{ check, checkData, checkError, checkLoading, refreshCheck }}>
            {children}
        </LotteryCheckContext.Provider>
    );
};