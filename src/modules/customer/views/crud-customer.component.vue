<template>
    <div class="form_customer">
        <div class="col-12">
            <div class="row">
                <div class="col-5 offset-1">
                    <div class="card">
                        <div class="card-header">
                            Registro de Clientes
                        </div>
                        <div class="card-body">
                            <itrcFormRegisterCustomerComponent 
                                :modelForm="modelForm"
                                :showSuccess="showSuccess"
                                @submitForm="submitForm"
                                @resetForm="resetForm">
                            </itrcFormRegisterCustomerComponent>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="row">
                        <div class="card">
                            <div class="card-header">
                                Esperanza de Vida en el Perú
                            </div>
                            <div class="card-body">
                                <itrcConfigLigeExpectacyComponent
                                    :lifeExpectancy="lifeExpectancy"
                                    @config="config($event)">
                                </itrcConfigLigeExpectacyComponent>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="card">
                            <div class="card-header">
                                Lista de Clientes
                            </div>
                            <div class="card-body">
                                <itrcTableListCustomerComponent
                                    :listCustomers="listCustomers">
                                </itrcTableListCustomerComponent>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="card">
                            <div class="card-header">
                                Estadísticas
                            </div>
                            <div class="card-body">
                                <itrcTableStatisticComponent
                                    :averageAge="averageAge"
                                    :standardDeviation="standardDeviation">
                                </itrcTableStatisticComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import * as fromComponents from '@/modules/customer/components';
    import * as fromModels from '../models';
    import { CustomerService } from '@/modules/customer/services/customer.service';
    @Component({
        components: {
            itrcFormRegisterCustomerComponent: fromComponents.FormRegisterCustomerComponent,
            itrcTableListCustomerComponent: fromComponents.TableListCustomerComponent,
            itrcTableStatisticComponent: fromComponents.TableStatisticComponent,
            itrcConfigLigeExpectacyComponent: fromComponents.ConfigLigeExpectacyComponent
        }
    })
    export default class RegisterCustomerComponent extends Vue {
        public modelForm: fromModels.Customer = fromModels.initializeCustomer;
        public listCustomers: Array<fromModels.Customer> = [];
        public showSuccess: boolean = false;
        public averageAge: number = 0;
        public standardDeviation: number = 0;
        public lifeExpectancy: number = 74.98;

        mounted() {
            this.getCustomers();
        }

        getCustomers() {
            this.listCustomers = [];
            CustomerService.getCustomers().then(resp => {
                this.listCustomers = resp;
                this.getAverageAge();
                this.getYearDeath();
            }).catch(err => {
                console.log(err);
            });
        }

        submitForm() {
            CustomerService.setCustomer(this.modelForm).then((response) => {
                this.resetForm();              
                this.getCustomers();
                this.showSuccess = true;
                setTimeout(() => {
                    this.showSuccess = false;
                }, 3000);
            }).catch(err => {
                console.log(err);
            });
        }

        config(lifeExpectancy: any) {
            this.lifeExpectancy = lifeExpectancy;
            this.getYearDeath();
        }

        getAverageAge() {
            let sumEdad = 0;
            this.listCustomers.forEach((customer: any) => {
                sumEdad = sumEdad + parseInt(customer.age);
            });
            this.averageAge = sumEdad / this.listCustomers.length;
            this.getStandardDeviation();
        }

        getStandardDeviation() {
            let sum = 0;
            this.listCustomers.forEach(element => {
                let resultIndex = 0;
                resultIndex = Math.pow(element.age?element.age:0 - this.averageAge, 2);
                sum = sum + resultIndex;
            });
            sum = sum / this.listCustomers.length;
            this.standardDeviation = Math.sqrt(sum);
        }

        getYearDeath() {
            let lifeExpectancy = this.lifeExpectancy;
            let lifeExpectancyYear = Math.floor(lifeExpectancy);
            let lifeExpectancyMonth = Math.floor((lifeExpectancy - lifeExpectancyYear) * 12);
            let lifeExpectancyDays = Math.floor((((lifeExpectancy - lifeExpectancyYear) * 12) - lifeExpectancyMonth) * 30);
            this.listCustomers = this.listCustomers.map((element: any) => {
                let yearAge = new Date(element.birthday).getFullYear();
                let monthAge = new Date(element.birthday).getMonth() + 1;
                let dayAge = new Date(element.birthday).getDate() + 1;
                let yearDeath = yearAge + lifeExpectancyYear;
                let monthDeath = monthAge + lifeExpectancyMonth;
                let dayDeath = dayAge + lifeExpectancyDays;
                if (monthDeath > 12) {
                    monthDeath = monthDeath - 12;
                    yearDeath = yearDeath + 1;
                }
                if (dayDeath > 30) {
                    dayDeath = dayDeath - 30;
                    monthDeath = monthDeath + 1;
                }
                element.yearDeath = `${yearDeath}-${monthDeath < 10 ? '0'+monthDeath:monthDeath}-${dayDeath < 10 ? '0'+dayDeath:dayDeath}`;
                return element;
            });
        }

        resetForm() {
            this.modelForm.name = '';
            this.modelForm.lastName = '';
            this.modelForm.age = 0;
            this.modelForm.birthday = '';
        }
    }
</script>
<style lang="scss" scoped>
    .form_customer {
        text-align: left;
    }
    .card-body {
        height: auto;
        max-height: 350px;
        overflow: auto;
    }
</style>
