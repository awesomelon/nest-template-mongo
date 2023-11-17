import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// lib
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpRequestService {
  constructor(private httpService: HttpService) {}

  catchData(err) {
    if (err.response) {
      if (err.response.data) {
        return err.response.data;
      }

      return err.response;
    }

    return err;
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    const Observable = await this.httpService.get<T | any>(url, config);
    const res = await lastValueFrom(Observable)
      .then((res) => res.data)
      .catch((err) => this.catchData(err));

    return res;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const Observable = await this.httpService.post<T | any>(url, data, config);
    const res = await lastValueFrom(Observable)
      .then((res) => res.data)
      .catch((err) => this.catchData(err));

    return res;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const Observable = await this.httpService.patch<T | any>(url, data, config);
    const res = await lastValueFrom(Observable)
      .then((res) => res.data)
      .catch((err) => this.catchData(err));

    return res;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const Observable = await this.httpService.delete<T | any>(url, config);
    const res = await lastValueFrom(Observable)
      .then((res) => res.data)
      .catch((err) => this.catchData(err));

    return res;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const Observable = await this.httpService.put<T | any>(url, data, config);
    const res = await lastValueFrom(Observable)
      .then((res) => res.data)
      .catch((err) => this.catchData(err));

    return res;
  }
}
