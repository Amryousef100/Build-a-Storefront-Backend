
import Client from "../database ";
import bcrypt from "bcrypt";

export type user = {
     id: number;
     firstname: string;
     lastname : string;
     password: string;
    
}
export type UserUpdate={
  firstname?:string |null,
  lastname?:string |null,
  password?:string |null
}
export class uesrStore {
  async index(): Promise<user[]> {
    try {

      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`)
    }
  }

  async show(id: string): Promise<user> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`unable show user ${id}. Error: ${err}`)
    }
  }

  async create(u: user): Promise<user> {
      try {
    const sql = 'INSERT INTO users ( firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
  
    const conn = await Client.connect()
    const {SALT_ROUNDS,BCRYPT_PASSWORD}=process.env
    const pepper=BCRYPT_PASSWORD;
    const saltRounds=SALT_ROUNDS as string;
    const hash = bcrypt.hashSync(
      u.password + pepper, 
      parseInt(saltRounds)
   );

   const result = await conn
   .query(sql, [ u.firstname, u.lastname,hash])
    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
        throw new Error(`unable create user . Error: ${err}`)
      }
  }

  async delete(id: string): Promise<user> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'

    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }

  async update(u:user,values:UserUpdate):Promise<user>{
    try{
        const conn=await Client.connect();
        let topname :string|null;
        let secondname :string|null;
        let pass :string|null;
        topname=values.firstname ? values.firstname : null;
        secondname=values.lastname ? values.lastname : null;
        //pass=values.password ? values.password : null;
        const sql=`UPDATE users SET firstname=COALESCE($1,firstname),secondname=COALESCE($2,lastname) WHERE id=${u.id} RETURNING *`;
        const result=await conn.query(sql,[topname,secondname]);
        conn.release();
        return result.rows[0];
    }
    catch(err){
        throw new Error (`cannot update user ${u.id} .Error ${err}`)
    }
}
}
