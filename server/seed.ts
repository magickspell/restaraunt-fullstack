import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function seed() {
    // ... your Prisma Client queries will go here
    const category = await prisma.category.create({ // create one record at a time
        data: {title: 'Обычная',}
    })
    const categories = await prisma.category.createMany({
        data: [
            {title: 'Сладкая',},
            {title: 'Острая',},
        ]
    })
    const products = await prisma.product.createMany({
        data: [
            {title: 'Пеперони', categoryId: 3, picture: null},
            {title: 'Ревашоль', categoryId: 1, picture: null},
            {title: 'Ананасы', categoryId: 2, picture: null},
            {title: 'Пробитие', categoryId: 3, picture: null},
        ]
    })
    console.log(`Data created!`)
    console.log(category)
    console.log(categories)
    console.log(products)
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })