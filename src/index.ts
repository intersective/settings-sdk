import Axios, { AxiosRequestConfig } from 'axios';
import JWT from 'jsonwebtoken';
import { flatten } from 'flat';

export class Settings {
  protected service: string;
  protected privateKey: string;
  protected url: string;
  public data: {};

  constructor(privateKey: string, service: string, url?: string) {
    this.data = {};
    this.service = service;
    this.privateKey = privateKey;
    this.url = url ? url : 'https://settings.practera.com/api';
  }

  async get(uuid: string) : Promise<any> {
    try {
      this.data = await this.makeApiCall(uuid, 'GET');
      return this;
    } catch (err) {
      throw err;
    }
  }

  save(uuid: string, settings: any) : Promise<any> {
    return this.makeApiCall(uuid, 'POST', settings);
  }

  findValue(setting: RegExp) : unknown {
    const flatSettings = flatten(this.data);

    if (typeof flatSettings === 'object' && flatSettings != null) {
      for (const property in flatSettings) {
        if (setting.test(property)) {
          return (flatSettings as any)[property];
        }
      }
    }
    return undefined;
  }

  findNeighbor(setting: RegExp, settingValue: string, neighbor: string) : unknown {
    const flatSettings = flatten(this.data);

    if (typeof flatSettings === 'object' && flatSettings != null) {
      for (const property in flatSettings) {
        if (setting.test(property) && (flatSettings as any)[property] === settingValue) {
          const neighborProperty = property.slice(0, property.lastIndexOf('.') + 1).concat(neighbor);
          return (flatSettings as any)[neighborProperty];
        }
      }
    }
    return undefined;
  }

  findSetting(setting: string, medium: string) : unknown {
    const flatSettings = flatten(this.data);

    if (typeof flatSettings === 'object' && flatSettings != null) {
      for (const property in flatSettings) {
        if (/^categories\.[0-9]\.preferences\.[0-9]\.key$/.test(property) && (flatSettings as any)[property] === setting) {
          const rootProperty = `^${property.slice(0, property.lastIndexOf('.') + 1).replace(/\./g, '\\.')}options\\.[0-9]\\.medium$`;
          return this.findNeighbor(new RegExp(rootProperty, 'g'), medium, 'value');
        }
      }
    }
    return undefined;
  }

  private createHeaders(uuid: string) : AxiosRequestConfig {
    return {
      timeout: 20000,
      headers: {
        service: this.service,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        apikey: JWT.sign({ role: 'system', user_uuid: uuid }, this.privateKey, { algorithm: 'RS256' }),
      },
    };
  }

  private async makeApiCall(user: string, method: 'GET' | 'POST', data?: {}) : Promise<any> {
    const headers = this.createHeaders(user);

    try {
      let response;
      if (method === 'GET') {
        response = await Axios.get(this.url, headers);
        return response.data;
      }
      response = await Axios.post(this.url, data, headers);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
