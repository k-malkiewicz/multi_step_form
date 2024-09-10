export interface AddOn {
    name: string,
    description: string,
    price: {
        monthly: number,
        yearly: number
    }
}