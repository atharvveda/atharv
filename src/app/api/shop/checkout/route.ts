import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, customer, zipCode } = body;

        // 1. Validate Zip Code Serviceability
        const zipData = await prisma.zipCode.findUnique({
            where: { code: zipCode },
        });
        if (!zipData || !zipData.isServiceable) {
            return NextResponse.json({ error: 'Delivery not available for this pincode.' }, { status: 400 });
        }

        // 2. Validate Items & Stock & Calculate Total
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.id },
            });

            if (!product) {
                return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 400 });
            }

            if (product.stock < item.quantity) {
                return NextResponse.json(
                    { error: `Insufficient stock for ${product.name}. Available: ${product.stock}` },
                    { status: 400 }
                );
            }

            // Use server-side price
            const lineTotal = Number(product.price) * item.quantity;
            totalAmount += lineTotal;

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price, // Snapshot price
            });
        }

        // 3. Create Customer (or Find)
        let customerRecord = await prisma.customer.findUnique({
            where: { email: customer.email },
        });

        if (!customerRecord) {
            customerRecord = await prisma.customer.create({
                data: {
                    email: customer.email,
                    name: customer.name,
                    phone: customer.phone,
                    address: customer.address,
                    city: customer.city,
                    state: customer.state,
                    zip: zipCode,
                    country: customer.country || 'USA',
                }
            });
        } else {
            // Update customer address if needed - skipping for simplicity
        }

        // 4. Create Order
        const order = await prisma.order.create({
            data: {
                customerId: customerRecord.id,
                totalAmount: totalAmount,
                status: 'PENDING',
                paymentStatus: 'PAID', // Simulating successful payment
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: true,
            }
        });

        // 5. Update Stock
        for (const item of orderItemsData) {
            await prisma.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
            });
        }

        return NextResponse.json({
            success: true,
            orderId: order.id,
            message: 'Order placed successfully'
        });

    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
    }
}
