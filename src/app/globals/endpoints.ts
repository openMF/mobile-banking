import { environment } from '@env';

let baseUrl: string = `${environment.baseUrl}${environment.graviteeEndpoints ? '/fineract-protected-movil' : '' }`;
let banbiUrl: string = `${environment.baseUrl}/banbi`;
let baseUrlapis: string = `${environment.baseUrlapis}/fineract-protected`;

export let ENDPOINTS = {
  authentication: `${baseUrl}/authentication`,
  logout: `${baseUrl}/authentication/logout`,
  refresh: `${baseUrl}/authentication/refresh`,
  clients: `${baseUrl}/clients`,
  clientsProtected: `${baseUrlapis}/clients`,
  beneficiarytpt: `${baseUrl}/beneficiaries/tpt`,
  beneficiaryext: `${baseUrl}/beneficiaries/ext`,
  accounts: `${baseUrl}/clients/{clientId}/accounts`,
  changeData: `${baseUrl}/user`,
  savingsAccountsTransactions: `${baseUrl}/savingsaccounts/{savingAccount}?associations=transactions`,
  accountTransfers: `${baseUrl}/accounttransfers`,
  limits: `${baseUrl}/limits`,
  registration: `${baseUrl}/registration`,
  office: `${baseUrl}/office`,
  codesOptions: `${baseUrl}/codes`,
  cep: `${environment.baseUrl}/banbi/spei-karpay/spei/karpay/mifos`,
  socialPrograms: `${baseUrl}/socialprogram`,
  savingsAccounts: `${baseUrl}/savingsaccounts`,
  password: `${baseUrl}/password`,
  totp: `${banbiUrl}/otp`,
  validateTotp: `${baseUrl}/totp`,
  notification: `${banbiUrl}/email`,
  codesOptionsapis: `${baseUrlapis}/codes`
}
