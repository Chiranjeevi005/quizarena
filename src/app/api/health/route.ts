import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    // Check DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'UP', timestamp: new Date().toISOString() }, { status: 200 });
  } catch (error) {
    console.error('[Health Check] Database connection failed:', error);
    return NextResponse.json({ status: 'DOWN', error: 'Database Unreachable' }, { status: 503 });
  }
}
