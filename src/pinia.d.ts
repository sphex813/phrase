import type { AxiosInstance } from "axios";
import "pinia";

declare module "pinia" {
  export interface Pinia {
    axios: AxiosInstance;
  }
}
