export interface Response<T> {
    data: T[],
    limit: number,
    offset: number,
    response: string,
    result: string,
    total: number
}

