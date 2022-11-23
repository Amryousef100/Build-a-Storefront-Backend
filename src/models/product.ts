import Client from "../database ";

export type Product ={
    id:number,
    productname:string,
    price:number
}
export type ProductUpdate={
    productname?:string | null,
    price?:number | null
}
export class ProductStore {
    async index():Promise<Product[]>{
        try{
            const conn=await Client.connect();
            const sql='SELECT * FROM products';
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error (`cannot get products ${err}`)
        }
    }
    async show(id:string):Promise<Product>{
        try{
            const conn=await Client.connect();
            const sql='SELECT * FROM products WHERE id=($1)';
            const result=await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error (`cannot get product ${err}`)
        }
    }
    async create(p:Product):Promise<Product>{
        try{
            const conn=await Client.connect();
            const sql='INSERT INTO products (productname,price) VALUES ($1,$2) RETURNING *';
            const result=await conn.query(sql,[p.productname,p.price]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error (`cannot create product ${err}`)
        }
    }
    async delete(id:string):Promise<Product>{
        try{
            const conn=await Client.connect();
            const sql='DELETE FROM products  WHERE id=($1)';
            const result=await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error(`cannot delete product ${id} .Error : ${err}`)
        }
    }
    async update(p:Product,values:ProductUpdate):Promise<Product>{
        try{
            const conn=await Client.connect();
            let name :string|null;
            let buyingprice :number|null;
            name = values.productname ? values.productname : null;
            buyingprice=values.price ? values.price : null;
            const sql=`UPDATE products SET productname=COALESCE($1,productname),price=COALESCE($2,price) WHERE id=${p.id} RETURNING *`;
            const result=await conn.query(sql,[name,buyingprice]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error (`cannot update product ${p.id} .Error ${err}`)
        }
    }
}