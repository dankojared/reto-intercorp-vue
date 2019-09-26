<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Edad Promedio</th>
                    <th>Desviación Estándar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> {{averageAge.toFixed(2)}} </td>
                    <td> {{standardDeviation.toFixed(2)}} </td>
                </tr>
            </tbody>
        </table>
    </div>    
</template>
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    @Component
    export default class TableStatisticComponent extends Vue {
        @Prop() public averageAge!: number;
        @Prop() public standardDeviation!: number;
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
