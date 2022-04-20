
export interface TransactionType {
    id: number;
    code: string;
    value: string;
    deposit: boolean;
    dividendPayout: boolean;
    withdrawal: boolean;
    interestPosting: boolean;
    feeDeduction: boolean;
    initiateTransfer: boolean;
    approveTransfer: boolean;
    withdrawTransfer: boolean;
    rejectTransfer: boolean;
    overdraftInterest: boolean;
    writtenoff: boolean;
    overdraftFee: boolean;
    withholdTax: boolean;
    escheat: boolean;
    amountHold: boolean;
    amountRelease: boolean;
}

export interface Currency {
    code: string;
    name: string;
    decimalPlaces: number;
    inMultiplesOf: number;
    displaySymbol: string;
    nameCode: string;
    displayLabel: string;
}

export interface PaymentType {
    id: number;
    name: string;
}

export interface PaymentDetailData {
    id: number;
    paymentType: PaymentType;
    accountNumber: string;
    checkNumber: string;
    routingCode: string;
    receiptNumber: string;
    bankNumber: string;
    isSolidarity: boolean;
}

export interface Currency {
    code: string;
    name: string;
    decimalPlaces: number;
    inMultiplesOf: number;
    displaySymbol: string;
    nameCode: string;
    displayLabel: string;
}

export interface Transfer {
    id: number;
    reversed: boolean;
    currency: Currency;
    transferAmount: number;
    transferDate: number[];
    transferDescription: string;
}


export interface Transaction {
    id: number;
    transactionType: TransactionType;
    accountId: number;
    accountNo: string;
    date: number[];
    currency: Currency;
    paymentDetailData?: PaymentDetailData;
    transfer?: Transfer
    amount: number;
    runningBalance: number;
    reversed: boolean;
    submittedOnDate: number[];
    interestedPostedAsOn: boolean;
    submittedByUsername: string;
}


