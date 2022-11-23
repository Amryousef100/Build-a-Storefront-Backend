import {Product,ProductStore} from "../models/product"

const product=new ProductStore();

const ProductTest:Product={id:4,productname:'pen',price:3}

describe('Product model test',()=>{
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });
 
  it('create method should add a product', async () => {
    const result = await product.create(ProductTest);
    expect(result).toEqual(ProductTest);
  });
  it('index method should return an array contains added product',async()=>{
    const res=await product.index();
    expect(res).toContain(ProductTest);
    });
  
  it('show method should return the correct product', async () => {
    const result = await product.show("4");
    expect(result).toEqual(ProductTest);
  });

  

  
})