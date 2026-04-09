import { NextRequest, NextResponse } from 'next/server';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby3fjxciwWY_lnWMD3BoKDvzgijonplQMoZyj_KOi7Z8AvHjKZPdUZznhiTFafsz2Cw/exec';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ error: '전송 실패' }, { status: 500 });
    }

    return NextResponse.json({ result: 'success' });
  } catch (e) {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=get`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
