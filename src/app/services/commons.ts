interface BaseResponse {
    limit: number;
    offset: number;
    response: string;
    result: string;
    total: number;
}

export interface ResponseArray<T> extends BaseResponse {
    data: T[]
}

export interface ResponseObject<T> extends BaseResponse {
    data: T
}

