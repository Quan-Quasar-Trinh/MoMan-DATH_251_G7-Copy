import { Category } from "../model";

export const expenseCategories: Category[] = [
    { id: 1, type: "expense", name: "Food & Drink", icon: "/food&drink.png" },
    { id: 2, type: "expense", name: "Entertainment", icon: "/entertainment.png" },
    { id: 3, type: "expense", name: "Shopping", icon: "/shopping.png" },
    { id: 4, type: "expense", name: "Transportation", icon: "/transport.png" },
    { id: 5, type: "expense", name: "Housing", icon: "/housing.png" },
    { id: 6, type: "expense", name: "Utilities", icon: "/utilities.png" },
]

export const incomeCategories: Category[] = [
    { id: 7, type: "income", name: "Salary", icon: "/salary.png" },
    { id: 8, type: "income", name: "Stock", icon: "/stock.png" },
    { id: 9, type: "income", name: "Savings", icon: "/savings.png" },
]