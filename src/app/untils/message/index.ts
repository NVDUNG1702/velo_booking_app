
export const getErrorResponse = (error: any): string => {
    const errMessage = error?.data?.message || 'unknown error!'
    return errMessage;
};