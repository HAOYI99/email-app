import { HttpMethod } from "@/app/enum/HttpMethod";
import { getRecords } from "@/app/services/emailService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    if (request.method !== HttpMethod.POST) {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
    }
    const param = await request.json();
    const updatedParam = transformQuery(param)
    console.log(updatedParam);

    const results = await getRecords(updatedParam);
    return NextResponse.json(results, { status: 200 })
}

function transformQuery(params: any) {
    var rawParam = params
    const skip = (rawParam.current - 1) * rawParam.pageSize
    const take = rawParam.pageSize
    const orderBy = rawParam.orderBy
    delete rawParam.current
    delete rawParam.pageSize
    delete rawParam.orderBy
    const updatedParam = {
        skip: skip,
        take: take,
        where: rawParam,
        orderBy: orderBy
    }
    return updatedParam
}


