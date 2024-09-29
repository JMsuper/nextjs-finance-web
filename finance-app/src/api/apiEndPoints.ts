import Config from "../configs/config.export";

const API_BASE_URL = Config().baseUrl;

const apiEndPoints = {
    // alarm-controller
    deleteTargetPriceAlarm: (targetPriceId: number) => `${API_BASE_URL}/alarms/target-prices/${targetPriceId}`,
    deletePriceAlarm: (priceId: number) => `${API_BASE_URL}/alarms/prices/${priceId}`,
    getTargetPriceAlarms: () => `${API_BASE_URL}/alarms/target-prices`,
    getPriceAlarms: () => `${API_BASE_URL}/alarms/prices`,
    getAlarmReports: () => `${API_BASE_URL}/alarms/reports`,
    createTargetPriceAlarm: () => `${API_BASE_URL}/alarms/target-prices`,
    createPriceAlarm: () => `${API_BASE_URL}/alarms/prices`,
    updateTargetPriceAlarm: (targetPriceId: number, active: boolean) => `${API_BASE_URL}/alarms/target-prices/${targetPriceId}?active=${active}`,
    updateAlarmReport: (reportId: number) => `${API_BASE_URL}/alarms/reports/${reportId}`,
    updatePriceAlarm: (priceId: number, active: boolean) => `${API_BASE_URL}/alarms/prices/${priceId}?active=${active}`,

    // auth-controller
    login: () => `${API_BASE_URL}/auth/login`,
    register: () => `${API_BASE_URL}/auth/register`,
    logout: () => `${API_BASE_URL}/auth/logout`,
    autoLogin: () => `${API_BASE_URL}/auth/auto-login`,

    // finance-data-controller
    getFinanceData: (corpCode: string | undefined,startYear: number, endYear: number) => `${API_BASE_URL}/finances/${corpCode}?startYear=${startYear}&endYear=${endYear}`,
    getFinanceReports: (corpCode: string) => `${API_BASE_URL}/finances/${corpCode}/reports`,
    getStocks: () => `${API_BASE_URL}/finances/stocks`,
    getScreening: () => `${API_BASE_URL}/finances/screening`,

    // memo-controller
    deleteMemo: (memoId: number) => `${API_BASE_URL}/memos/${memoId}`,
    createMemo: () => `${API_BASE_URL}/memos`,
    updateMemo: (memoId: number) => `${API_BASE_URL}/memos/${memoId}`,

    // save-corp-controller
    deleteSavedCorp: (userId: string, corpCode: string) => `${API_BASE_URL}/users/${userId}/saved-corps/${corpCode}`,
    getSavedCorps: (userId: string) => `${API_BASE_URL}/users/${userId}/saved-corps`,
    saveCorp: (userId: string, corpCode: string) => `${API_BASE_URL}/users/${userId}/saved-corps/${corpCode}`,
    updateSavedCorp: (userId: string, corpCode: string) => `${API_BASE_URL}/users/${userId}/saved-corps/${corpCode}`,

    // user-controller
    updateUserPassword: (userId: string) => `${API_BASE_URL}/users/${userId}/password`,
    updateUserEmail: (userId: string) => `${API_BASE_URL}/users/${userId}/email`,
};

export default apiEndPoints;