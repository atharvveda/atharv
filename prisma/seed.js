const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const kidneyCare = await prisma.category.upsert({
        where: { slug: 'kidney-care' },
        update: {},
        create: {
            name: 'Kidney Care',
            slug: 'kidney-care',
        },
    });

    const product1 = await prisma.product.upsert({
        where: { slug: 'neeri-kft' },
        update: {},
        create: {
            name: 'Neeri KFT',
            slug: 'neeri-kft',
            description: 'Herbal medication for kidney function.',
            price: 29.99,
            stock: 100,
            images: JSON.stringify(['/assets/images/products/neeri-kft.jpg']),
            categoryId: kidneyCare.id,
            testimonials: {
                create: [
                    { name: "John Doe", rating: 5, comment: "Excellent results for my kidney health!" },
                    { name: "Sarah M.", rating: 4, comment: "Very effective, but fast shipping would be better." }
                ]
            }
        },
    });

    const product2 = await prisma.product.upsert({
        where: { slug: 'punarnava' },
        update: {},
        create: {
            name: 'Punarnava Capsules',
            slug: 'punarnava',
            description: 'Supports renal health and reduces swelling.',
            price: 19.99,
            stock: 50,
            images: JSON.stringify(['/assets/images/products/punarnava.jpg']),
            categoryId: kidneyCare.id,
            testimonials: {
                create: [
                    { name: "Amit K.", rating: 5, comment: "Natural relief from swelling." }
                ]
            }
        },
    });

    // Seed Zip Codes
    await prisma.zipCode.upsert({
        where: { code: '19810' },
        update: {},
        create: { code: '19810', isServiceable: true, deliveryDays: 3 },
    });

    console.log({ product1, product2 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
