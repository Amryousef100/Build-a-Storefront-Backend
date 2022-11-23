import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import ProductsRoute from './handler/producthandler'
import UsersRoute from './handler/userhandler'
import OrdersRoute from './handler/orderhandler'


const app: express.Application = express()
//const address: string = "0.0.0.0:3000"
const port=process.env.PORT;



app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

ProductsRoute(app);
UsersRoute(app);
OrdersRoute(app);

app.listen(port, function () {
    console.log(`Server start listening on port: ${port}`);
})

export default app;