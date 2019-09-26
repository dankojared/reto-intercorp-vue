import { db } from '@/firebase';
import * as fromModels from '@/modules/customer/models/customer.model';

export class CustomerService {
    public static getCustomers() {
        let listCustomers: Array<fromModels.Customer> = [];
        return new Promise<Array<fromModels.Customer>>((resolve, reject) => {
            db.ref().child('customer').once('value')
            .then(customer => {
                customer.forEach(child => {
                    listCustomers.push(
                        {
                            name: child.val().name,
                            lastName: child.val().lastName,
                            age: child.val().age,
                            birthday: child.val().birthday
                        }
                    )
                });
                resolve(listCustomers);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    public static setCustomer(customer: fromModels.Customer) {
        return new Promise((resolve, reject) => {
            db.ref('customer').push(customer)
            .then(resp => {
                resolve(resp);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}
