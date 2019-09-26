<template>
    <div>
        <form
            @submit.prevent="submitForm"
            ref="customerForm"
        >
            <div class="row">
                <div class="col-lg-4">
                    <label>Nombre:</label>
                </div>
                <div class="col-lg-7">
                    <input
                        name="name" 
                        type="text" 
                        class="form-control"
                        v-model="modelForm.name"
                        v-validate="'required'">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-4">
                    <label>Apellido:</label>
                </div>
                <div class="col-lg-7">
                    <input 
                        name="lastName"
                        type="text" 
                        class="form-control"
                        v-model="modelForm.lastName"
                        v-validate="'required'">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-4">
                    <label>Edad:</label>
                </div>
                <div class="col-lg-4">
                    <input 
                        name="age"
                        type="text" 
                        class="form-control"
                        v-model="modelForm.age"
                        v-validate="'required|numeric'">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-4">
                    <label>Fecha de Nacimiento:</label>
                </div>
                <div class="col-lg-4">
                    <input 
                        name="birthday"
                        type="date" 
                        class="form-control"
                        v-model="modelForm.birthday"
                        v-validate="'required'">
                </div>
            </div>
            <div class="row mt-3 offset-8">
                <button 
                    class="btn btn-success mr-2" 
                    type="submit">
                    Guardar
                </button>
                <button 
                    class="btn btn-secondary" 
                    type="button" 
                    @click="resetForm">
                    Limpiar
                </button>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <div class="alert alert-danger" role="alert" v-if="showAge">
                        Su edad no coincide con su fecha de nacimiento.
                    </div>
                    <div class="alert alert-danger" role="alert" v-if="showValidated">
                        Usted debe llenar todos los campos.
                    </div>
                    <div class="alert alert-success" role="alert" v-if="showSuccess">
                        Registro exitoso.
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import * as fromModels from '../models';
    @Component
    export default class FormRegisterCustomerComponent extends Vue {
        @Prop() public modelForm!: fromModels.Customer;
        @Prop() public showSuccess!: boolean;
        public showValidated: boolean = false;
        public showAge: boolean = false;
        
        public $refs!: {
            customerForm: HTMLFormElement;
        };
        
        submitForm() {
            this.showAge = false;
            this.$validator.validateAll()
            .then((res: any) => {
                if (res) {
                    if (!this.getValidatedAge(this.modelForm.age, this.modelForm.birthday)) {
                        this.showAge = true;
                        setTimeout(() => {
                            this.showAge = false;
                        }, 3000);
                        return;
                    }
                    this.$emit('submitForm');
                } else {
                    this.showValidated = true;
                    setTimeout(() => {
                        this.showValidated = false;
                    }, 3000);
                    return;
                }
            })
        }

        resetForm() {
            this.$emit('resetForm');
        }

        getValidatedAge(age: any, birthday: any) {
            birthday = new Date(birthday);
            let today = new Date();
            let ageReal = today.getFullYear() - birthday.getFullYear();
            let month = today.getMonth() - birthday.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
                ageReal--;
            }
            if (parseInt(age) !== ageReal) {
                return false;
            } else {
                return true;
            }
        }
    }
</script>
