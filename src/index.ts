import Axios, { AxiosRequestConfig } from 'axios';
import JWT from 'jsonwebtoken';

export class Preferences {
  protected service: string;
  protected privateKey: string;
  protected url: string;

  constructor(privateKey: string, service: string, url?: string) {
    this.service = service;
    this.privateKey = privateKey;
    this.url = url ? url : 'https://preferences.practera.com/api';
  }

  get(uuid: string) : Promise<any> {
    return this.makeApiCall(uuid, 'GET');
  }

  save(uuid: string, preferences: any) : Promise<any> {
    return this.makeApiCall(uuid, 'POST', preferences);
  }

  private createHeaders(uuid: string, method: 'GET' | 'POST') : AxiosRequestConfig {
    return {
      url: this.url,
      method,
      timeout: 20000,
      headers: {
        service: this.service,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        apikey: JWT.sign({ role: 'system', user_uuid: uuid}, this.privateKey, { algorithm: 'RS256' }),
      },
    };
  }
  private makeApiCall(user: string, method: 'GET' | 'POST', data?: {}) : Promise<any> {
    const headers = this.createHeaders(user, method);

    return new Promise(resolve => {
      // Set up the request
      Axios.request(headers).then(response => {
        resolve(response.data);
      });
    });
  }
}
