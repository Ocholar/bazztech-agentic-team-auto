import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();
    const host = 'bazztech.co.ke';
    const key = '8af3a1980dfe63e0a9f6781f14e1a88a';
    const keyLocation = `https://${host}/${key}.txt`;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'Invalid URLs provided' }, { status: 400 });
    }

    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: urls,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ error: `IndexNow submission failed: ${errorText}` }, { status: response.status });
    }
  } catch (error) {
    console.error('IndexNow error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
