
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
    store: Store;
    orders: Order[];
    cart: Cart;
}

export interface updateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

export interface Role {
    id: number;
    name: string;
}

export interface Store {
    id: number;
    name: string;
    contactName: string;
    type: TypeStore;
    size: SizeStore;
    images: Image[];
    // private products: ProductDTO[];
    address: Address;
}

export interface Cart {}
export interface CartItem {}


enum SizeStore {
    FREE,
    PREMIUM,
    ULTIMATE
}

enum TypeStore {}
enum OrderStatus{}

export interface Address {
    id: number,
    street: string,
    city: string,
    zipCode: string,
    country: string
}

export interface Image{}

export interface Order{}
export interface OrderItem{}

export interface Cart{}
export interface CartItem{}

