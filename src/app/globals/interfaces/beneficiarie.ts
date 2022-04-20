export class AccountType {
    id: number;
    code: string;
    value: string;

    constructor() { }
}

export class Beneficiarie {
    id: number;
    name: string;
    alias: string;
    accountId: number;
    accountNumber: string;
    accountType: AccountType;
    clientId: number;
    clientName: string;
    officeId: number;
    officeName: string;
    transferLimit: number;

    bankEntity: number;

    color: '' | 'light';
    selected: boolean;
    isOwnAccount: boolean = false;

    // construtor para beneficiarios que son la misma cuenta del usuario
    constructor(
        pName: string,
        pAlias: string,
        pAccountId: number,
        pAccountNumber: string,
        pAccountType: number,
        pClientId: number,
        pClientName: string,
        pOfficeId: number,
        pOfficeName: string) {

        this.name = pName;
        this.alias = pAlias;
        this.accountId = pAccountId;
        this.accountNumber = pAccountNumber;
        this.accountType = new AccountType();
        this.accountType.id = pAccountType;
        this.clientId = pClientId;
        this.clientName = pClientName;
        this.officeId = pOfficeId;
        this.officeName = pOfficeName;
        //TODO ver como hacer para que no haya limite con los internos
        this.transferLimit = 10000000;
        //this.bankEntity= pBankEntity;
        this.color = '';
        this.selected = false;
        this.isOwnAccount = true;
    }
}