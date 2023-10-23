import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ChatService {

    private apiUrl = 'https://api.openai.com/v1/chat/completions';
    private key = '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';

    constructor(private http: HttpClient) { }

    postData(messages: any, model: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.key}`,
        });

        const requestData = { messages, model };
        return this.http.post<any>(this.apiUrl, requestData, { headers });
    }
}
