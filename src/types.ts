enum TransactionStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    FAILED = 'failed',
    CANCELLED = 'cancelled'
}

export interface Transaction {
    id: string;
    success: boolean;
    amount: number;
    currency: string;
    reference: string;
    ext_reference?: string;
    status: TransactionStatus;
    driver: string;
    created_at: string;
    updated_at: string;
    meta: Record<string, any>;
}

export interface Driver {
    name: string;
    register(): void;
    withdraw(options: any): Promise<Boolean>;
    deposit(options: any): Promise<Boolean>;
}

export interface IBaseProvider {
    name: string;
    register(): void;
    drivers: { [key: string]: Driver };
    driver(name: string): Driver | undefined;
    addDriver(name: string, driver: Driver): boolean;
}

export interface Provider extends IBaseProvider {
    // Ensure the provider can accept and store drivers correctly
}

