interface ApiResponseData {
    [key: string]: any;
}

class ApiResponse {
    statusCode: number;
    message: string;
    data: ApiResponseData | null;
    success: boolean;

    constructor(
        statusCode: number,
        data: ApiResponseData | null = null,
        message: string,
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
}

export {ApiResponse}