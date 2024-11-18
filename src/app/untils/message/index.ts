
export const getErrorResponse = (error: any): string => {
    const errMessage = error?.data?.message || 'Something wrong!'
    return errMessage;
};