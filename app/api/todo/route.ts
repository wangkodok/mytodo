// app/api/todo/route.ts
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

// 조회
export async function GET() {
  const { data, error } = await supabase
    .from('description')
    .select()
    .order('id', { ascending: true }); // id 기준 정렬

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}

// 저장
export async function POST(req: NextRequest) {
  const { title } = await req.json();

  const { data, error } = await supabase
    .from('description')
    .insert([{ title }])
    .select();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}

// 수정
export async function PUT(req: NextRequest) {
  const { id, title } = await req.json();

  const { data, error } = await supabase
    .from('description')
    .update({ id, title })
    .eq('id', id)
    .select();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}

// 삭제
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const { data, error } = await supabase
    .from('description')
    .delete()
    .eq('id', id)
    .select();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ data });
}
