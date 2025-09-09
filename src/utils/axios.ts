import axiosLib, { AxiosInstance } from 'axios';
import { logDebug } from './logger.js';

class AxiosWrapper {
  private instance: AxiosInstance;
  private githubApiKey?: string;

  constructor() {
    this.instance = axiosLib.create({
      timeout: 10000,
      headers: {
        'User-Agent': 'anime-js-mcp-server/1.0.0'
      }
    });

    // Add request interceptor for debugging
    this.instance.interceptors.request.use(
      (config) => {
        logDebug(`Making request to: ${config.url}`);
        return config;
      }
    );
  }

  public setGitHubApiKey(apiKey: string) {
    this.githubApiKey = apiKey;
    this.instance.defaults.headers.common['Authorization'] = `token ${apiKey}`;
  }

  public get(url: string, config?: any) {
    return this.instance.get(url, config);
  }

  public post(url: string, data?: any, config?: any) {
    return this.instance.post(url, data, config);
  }

  public put(url: string, data?: any, config?: any) {
    return this.instance.put(url, data, config);
  }

  public delete(url: string, config?: any) {
    return this.instance.delete(url, config);
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

export const axios = new AxiosWrapper();