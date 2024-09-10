export interface PlanType {
    name: string,
    iconPath: string,
    price: {
        monthly: number,
        yearly: number
    }
}