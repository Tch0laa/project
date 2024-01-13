export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating:{
        rate: number;
        count: number;
    }
    quantity: number;
    isInStock: boolean;
}

export interface ProductInitialState {
    popularProducts: Product[] | null,
    hotsaleProducts: Product[] | null,
    recentProducts: Product[] | null,
    productLoading: boolean,
    currentProduct: Product | null,
    searchLoading: boolean;
    searchedProducts: Product[]
}

export type ProductSliderType = 'hotsales' | 'popular' | 'recent';

