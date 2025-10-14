// app/context/CategoryContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Category, Transaction } from "../model";
import { expenseCategories, incomeCategories } from "../store/CategoryStore";

interface CategoryContextType {
  userExpenseCategories: Category[];
  userIncomeCategories: Category[];
  transactions: Transaction[];
  addCategory: (category: Category) => void;
  removeCategory: (categoryId: number, type: "expense" | "income") => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transactionId: number) => void;
  updateTransaction: (id: number, updated: Partial<Transaction>) => void;
  getTransactionsByCategory: (categoryId: number) => Transaction[];
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [userExpenseCategories, setUserExpenseCategories] =
    useState<Category[]>(expenseCategories);
  const [userIncomeCategories, setUserIncomeCategories] =
    useState<Category[]>(incomeCategories);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addCategory = (category: Category) => {
    if (category.type === "expense") {
      const exist = userExpenseCategories.some((cat) => cat.id === category.id);
      if (!exist) {
        setUserExpenseCategories([...userExpenseCategories, category]);
      }
    } else {
      const exist = userIncomeCategories.some((cat) => cat.id === category.id);
      if (!exist) {
        setUserIncomeCategories([...userIncomeCategories, category]);
      }
    }
  };

  const removeCategory = (categoryId: number, type: "expense" | "income") => {
    // First, remove all transactions associated with this category
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.categoryId !== categoryId)
    );

    // Then remove the category
    if (type === "expense") {
      setUserExpenseCategories((prev) =>
        prev.filter((cat) => cat.id !== categoryId || cat.isDefault)
      );
    } else {
      setUserIncomeCategories((prev) =>
        prev.filter((cat) => cat.id !== categoryId || cat.isDefault)
      );
    }
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const removeTransaction = (transactionId: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  };

  function updateTransaction(id: number, updated: Partial<Transaction>) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx))
    );
  }

  const getTransactionsByCategory = (categoryId: number) => {
    return transactions.filter((t) => t.categoryId === categoryId);
  };

  return (
    <CategoryContext.Provider
      value={{
        userExpenseCategories,
        userIncomeCategories,
        transactions,
        addCategory,
        removeCategory,
        addTransaction,
        removeTransaction,
        updateTransaction,
        getTransactionsByCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
