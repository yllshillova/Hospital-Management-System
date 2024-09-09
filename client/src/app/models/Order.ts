import Product from "./Product";

export default interface Order {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    quantityOrdered: number;
    productId: string;
    product: Product;
}