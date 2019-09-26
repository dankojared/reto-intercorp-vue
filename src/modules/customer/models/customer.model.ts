export interface Customer {
    name?: string,
    lastName?: string,
    age?: number,
    birthday?: string,
    yearDeath?: string
};

export const initializeCustomer: Customer = {
    name: '',
    lastName: '',
    age: 0,
    birthday: ''
};
