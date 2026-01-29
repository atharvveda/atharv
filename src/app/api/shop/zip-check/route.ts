

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { zipCode } = await request.json();

        if (!zipCode) {
            return NextResponse.json({ error: 'Zip Code is required' }, { status: 400 });
        }

        const serviceable = await prisma.zipCode.findUnique({
            where: { code: zipCode },
        });

        if (serviceable && serviceable.isServiceable) {
            return NextResponse.json({
                serviceable: true,
                deliveryDays: serviceable.deliveryDays
            });
        }

        return NextResponse.json({ serviceable: false }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
