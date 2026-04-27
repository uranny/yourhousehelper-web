import CustomAxios from "../lib/CustomAxios";
import {
  CreateRecordRequest,
  CreateRecordResponse,
  DeleteRecordResponse,
  GetRecordItem,
  GetRecordRequest,
  UpdateRecordRequest,
  UpdateRecordResponse,
} from "../types/record/record.type";
import { BaseResponse } from "../types/util/response.type";

export const recordApi = {
  create: async (
    data: CreateRecordRequest,
  ): Promise<BaseResponse<CreateRecordResponse>> => {
    return (await CustomAxios.post("/record", data)).data;
  },
  list: async ({
    startDate,
    endDate,
  }: GetRecordRequest): Promise<BaseResponse<GetRecordItem[]>> => {
    return (
      await CustomAxios.get("/record", {
        params: { startDate, endDate },
      })
    ).data;
  },
  update: async (
    id: number,
    data: UpdateRecordRequest,
  ): Promise<BaseResponse<UpdateRecordResponse>> => {
    return (await CustomAxios.patch(`/record/${id}`, data)).data;
  },
  delete: async (id: number): Promise<BaseResponse<DeleteRecordResponse>> => {
    return (await CustomAxios.delete(`/record/${id}`)).data;
  },
};
