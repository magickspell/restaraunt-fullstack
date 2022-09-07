import {PrismaClient} from '@prisma/client'
import express from 'express'

const cors = require('cors')

interface Item {
    title: string,
    categoryId: string | number,
}

const PORT = 3000
const prisma = new PrismaClient()

const whitelist = [
    'http://localhost:8080'
];
const corsOptions = {
    origin: function (origin: any, callback: any) {
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};

const app = express()
app.use(cors(corsOptions)); // cors policy
app.use(express.json({limit: '10mb'})); // picture size
app.use(express.json())

// CRUD START
// get data
app.get('/categories',
    async (req, res) => {
        try {
            const categories = await prisma.category.findMany()
            res.json(categories)
        } catch (e) {
            console.warn(e)
            res.status(500).json(e)
        }
    }
)
app.get('/items',
    async (req, res) => {
        try {
            const items: Array<any> = await prisma.product.findMany()
            items.map((i: any) => {
                return i.picture = String(i.picture)
            })
            res.json(items)
        } catch (e) {
            console.warn(e)
            res.status(500).json(e)
        }
    }
)

// create item
app.post(`/item`, async (req, res) => {
    try {
        console.log(req.body.picture)
        const result = await prisma.product.create({
            data: {
                ...req.body,
                picture: Buffer.from(req.body.picture)
            },
        })
        res.json(result)
    } catch (e) {
        console.warn(e)
        res.status(500).json(e)
    }
})

// update item
app.put('/item/:id', async (req, res) => {
    try {
        const {id} = req.params
        let itemUpdate: any
        console.log(req.body.picture)
        if (req.body.picture.length > 100) {
            itemUpdate = await prisma.product.update({
                where: {id: Number(id)},
                data: {
                    "title": req.body.title,
                    "categoryId": req.body.categoryId,
                    "picture": Buffer.from(req.body.picture)
                },
            })
        } else {
             itemUpdate = await prisma.product.update({
                where: {id: Number(id)},
                data: {
                    "title": req.body.title,
                    "categoryId": req.body.categoryId,
                },
            })
        }

        res.json(itemUpdate)
    } catch (e) {
        console.warn(e)
        res.status(500).json(e)
    }
})

//delete item
app.delete(`/item/:id`, async (req, res) => {
    try {
        const {id} = req.params
        const post = await prisma.product.delete({
            where: {id: Number(id)},
        })
        res.json(post)
    } catch (e) {
        console.warn(e)
        res.status(500).json(e)
    }
})
// CRUD END

app.listen(PORT, () =>
    console.log(`REST API server ready at: http://localhost:${PORT}`),
)