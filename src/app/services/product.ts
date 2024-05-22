export interface Products {
    id: number;
    title: string;
    desc: string;
    image: string;
    oldprice?: string;
    newprice?: string;
    quantity: number;
    bidPrice?: number;
    color?: string[];
}