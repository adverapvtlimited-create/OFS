import { getIndustries, getProducts } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [industries, products] = await Promise.all([
      getIndustries(),
      getProducts(),
    ]);

    return NextResponse.json(
      {
        industries: Array.isArray(industries) ? industries : [],
        products: Array.isArray(products) ? products : [],
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch navigation data:', error);
    return NextResponse.json(
      { industries: [], products: [] },
      { status: 500 }
    );
  }
}
