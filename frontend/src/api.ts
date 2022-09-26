import axios from "axios";

export interface IFetchResponse<T> {
  data: T[];
  count: number;
}

export const HOSTNAME = 'http://localhost:5000';

export const client = axios.create({
  baseURL: `${HOSTNAME}/api`,
});
