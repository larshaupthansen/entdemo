interface HttpPromise {
        success(callback: Function) : HttpPromise;
        error(callback: Function) : HttpPromise;
    }
interface Http {
    get(url: string): HttpPromise;
    post(url: string, data: any): HttpPromise;
    delete(url: string): HttpPromise;
}
