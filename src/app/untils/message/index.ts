
export const getErrorResponse = (error: any): string => {
    const errMessage = error?.response?.data?.message || 'unknown error!'
    return errMessage;
};