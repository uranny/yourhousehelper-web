import { getRecordListByRange } from "@/server/record/list";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return Response.json({
        status: false,
        message: "startDate와 endDate가 필요합니다",
      });
    }

    const result = await getRecordListByRange(startDate, endDate);

    if (!result.ok) {
      return Response.json({
        status: false,
        message: result.message,
      });
    }

    return Response.json({
      status: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return Response.json({
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "서버 오류가 발생했습니다",
    });
  }
}
