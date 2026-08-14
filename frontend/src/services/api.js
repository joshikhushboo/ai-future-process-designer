import axios from "axios";

const API =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API,
    timeout: 180000
});

export const getProcessDesigner = async (processId) => {
    const response = await api.get(
        `/process-designer/${processId}`
    );

    return response.data;
};
export const createProcess = async (data) => {
    const response = await api.post(
        "/processes",
        data
    );

    return response;
};
export const analyzeProcessWithAI = async (processId) => {
    const response = await api.post(
        `/ai/analyze/${processId}`
    );

    return response.data;
};
export const getIndustries = () => {
    return api.get("/industries");
};

