"use server";

import { RECORD_LIST_TAG } from "@/constants/record";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

type RecordApiResponse = {
  status: boolean;
  message: string;
};

export type RecordActionState = {
  status: boolean;
  message: string;
};

const INT_MIN = -2147483648;
const INT_MAX = 2147483647;

const parseIntCost = (value: FormDataEntryValue) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new Error("금액은 정수만 입력 가능합니다.");
  }

  if (parsed < INT_MIN || parsed > INT_MAX) {
    throw new Error(`금액은 ${INT_MIN} ~ ${INT_MAX} 범위여야 합니다.`);
  }

  return parsed;
};

const getBaseUrlFromHeaders = async () => {
  const requestHeaders = await headers();

  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    cookie: requestHeaders.get("cookie") || "",
  };
};

export const createRecord = async (
  formData: FormData,
): Promise<void> => {
  const recordType = formData.get("recordType");
  const cost = formData.get("cost");
  const description = formData.get("description");
  const date = formData.get("date");

  if (!recordType || !cost || !description || !date) {
    throw new Error("모든 항목을 입력해주세요.");
  }

  const parsedCost = parseIntCost(cost);

  try {
    const { baseUrl, cookie } = await getBaseUrlFromHeaders();

    const res = await fetch(`${baseUrl}/api/record/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie,
      },
      body: JSON.stringify({
        recordType,
        cost: parsedCost,
        description,
        date,
      }),
      cache: "no-store",
    });

    const payload = (await res.json().catch(() => null)) as
      | RecordApiResponse
      | null;

    if (!res.ok || !payload?.status) {
      throw new Error(payload?.message || "기록 생성에 실패했습니다.");
    }

    revalidateTag(RECORD_LIST_TAG, { expire: 0 });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "요청에 실패했습니다.",
    );
  }
};

export const createRecordAction = async (
  prevState: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> => {
  try {
    await createRecord(formData);
    return {
      status: true,
      message: "기록 생성에 성공했습니다.",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "요청에 실패했습니다.",
    };
  }
};

export const editRecord = async (
  formData: FormData,
): Promise<void> => {
  const id = formData.get("id");
  const recordType = formData.get("recordType");
  const cost = formData.get("cost");
  const description = formData.get("description");
  const date = formData.get("date");

  if (!id || !recordType || !cost || !description || !date) {
    throw new Error("수정 값이 올바르지 않습니다.");
  }

  const parsedCost = parseIntCost(cost);

  try {
    const { baseUrl, cookie } = await getBaseUrlFromHeaders();

    const res = await fetch(`${baseUrl}/api/record/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie,
      },
      body: JSON.stringify({
        recordType,
        cost: parsedCost,
        description,
        date,
      }),
      cache: "no-store",
    });

    const payload = (await res.json().catch(() => null)) as
      | RecordApiResponse
      | null;

    if (!res.ok || !payload?.status) {
      throw new Error(payload?.message || "기록 수정에 실패했습니다.");
    }

    revalidateTag(RECORD_LIST_TAG, { expire: 0 });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "요청에 실패했습니다.",
    );
  }
};

export const editRecordAction = async (
  prevState: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> => {
  try {
    await editRecord(formData);
    return {
      status: true,
      message: "기록 수정에 성공했습니다.",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "요청에 실패했습니다.",
    };
  }
};

export const deleteRecord = async (
  formData: FormData,
): Promise<void> => {
  const id = formData.get("id");

  if (!id) {
    throw new Error("삭제할 id가 필요합니다.");
  }

  try {
    const { baseUrl, cookie } = await getBaseUrlFromHeaders();

    const res = await fetch(`${baseUrl}/api/record/delete/${id}`, {
      method: "DELETE",
      headers: {
        cookie,
      },
      cache: "no-store",
    });

    const payload = (await res.json().catch(() => null)) as
      | RecordApiResponse
      | null;

    if (!res.ok || !payload?.status) {
      throw new Error(payload?.message || "기록 삭제에 실패했습니다.");
    }

    revalidateTag(RECORD_LIST_TAG, { expire: 0 });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "요청에 실패했습니다.",
    );
  }
};

export const deleteRecordAction = async (
  prevState: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> => {
  try {
    await deleteRecord(formData);
    return {
      status: true,
      message: "기록 삭제에 성공했습니다.",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "요청에 실패했습니다.",
    };
  }
};
