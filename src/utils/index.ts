import fetch from 'node-fetch';

type RequestOptions = {
    method?: string;
    body?: string;
    headers?: Record<string, string>,

}

class HttpUtils {
    

    static fetch(url: string, opts: RequestOptions) {
        return fetch(url, opts)
    }
}