import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const snippet = await prisma.snippet.findUnique({ where: { id } });
  if (!snippet) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(snippet);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { title, code } = await req.json();
  const snippet = await prisma.snippet.update({
    where: { id },
    data: { title, code },
  });
  return NextResponse.json(snippet);
}