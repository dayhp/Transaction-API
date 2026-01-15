export interface Transaction {
    id: string;
    amount: number;
    description: string;
    transactionType: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    transactionDate: Date;
}
