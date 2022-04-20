
export interface Status {
    id: number;
    code: string;
    value: string;
}

export interface SubStatus {
    score: number;
    active: boolean;
    mandatory: boolean;
}

export interface Gender {
    id: number;
    name: string;
    score: number;
    active: boolean;
    mandatory: boolean;
}

export interface Birthplace {
    id: number;
    score: number;
    active: boolean;
    mandatory: boolean;
}

export interface ClientType {
    id: number;
    name: string;
    score: number;
    active: boolean;
    mandatory: boolean;
}

export interface ClientClassification {
    id: number;
    name: string;
    score: number;
    active: boolean;
    mandatory: boolean;
}

export interface Timeline {
    submittedOnDate: number[];
    submittedByUsername: string;
    submittedByFirstname: string;
    submittedByLastname: string;
    activatedOnDate: number[];
    activatedByUsername: string;
    activatedByFirstname: string;
    activatedByLastname: string;
}

export interface LegalForm {
    id: number;
    code: string;
    value: string;
}

export interface Constitution {
    score: number;
    active: boolean;
    mandatory: boolean;
}

export interface MainBusinessLine {
    score: number;
    active: boolean;
    mandatory: boolean;
}

export interface ClientNonPersonDetails {
    constitution: Constitution;
    mainBusinessLine: MainBusinessLine;
}

export interface PersonalInfo {
    id: number;
    accountNo: string;
    uniqueId: string;
    rfc: string;
    status: Status;
    subStatus: SubStatus;
    active: boolean;
    activationDate: number[];
    firstname: string;
    middlename: string;
    lastname: string;
    surname: string;
    displayName: string;
    mobileNo: string;
    dateOfBirth: number[];
    gender: Gender;
    birthplace: Birthplace;
    clientType: ClientType;
    clientClassification: ClientClassification;
    isStaff: boolean;
    groupLoanCounter: number;
    officeId: number;
    officeName: string;
    imageId: number;
    imagePresent: boolean;
    timeline: Timeline;
    legalForm: LegalForm;
    groups: any[];
    clientNonPersonDetails: ClientNonPersonDetails;
}


