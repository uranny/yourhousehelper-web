import CustomAxios from "../lib/CustomAxios";
import {
  CreateReportRequest,
  CreateReportResponse,
  GetReportResponse,
  GetReportRequest,
} from "../types/report/report.type";
import { BaseResponse } from "../types/util/response.type";

const reportApi = {
  create: async ({
    startDate,
    endDate,
  }: CreateReportRequest): Promise<BaseResponse<CreateReportResponse>> => {
    return (
      await CustomAxios.post("/report", null, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
    ).data;
  },
  get: async ({
    id,
  }: GetReportRequest): Promise<BaseResponse<GetReportResponse>> => {
    return (await CustomAxios.get(`/report/${id}`)).data;
  },
  list: async (): Promise<BaseResponse<GetReportResponse[]>> => {
    return (await CustomAxios.get("/report")).data;
  },
};

export default reportApi;
