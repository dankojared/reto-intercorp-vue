<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>F. de Nacimiento</th>
                    <th>F. Probable de Muerte</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(customer, index) in listCustomers" :key="index">
                    <td> {{customer.name}} </td>
                    <td> {{customer.lastName}} </td>
                    <td> {{customer.age}} </td>
                    <td> {{customer.birthday}} </td>
                    <td> {{customer.yearDeath}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import * as fromModels from '../models';
    @Component
    export default class TableListCustomerComponent extends Vue {
        @Prop() public listCustomers!: Array<fromModels.Customer>;
    }
</script>
<style lang="scss" scoped>
    .table thead {
        text-align: center;
        font-size: 13px;
    }
    .table tbody {
        text-align: center;
        font-size: 12px;
    }
</style>
