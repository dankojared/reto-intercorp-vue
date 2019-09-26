<template>
    <div>
        <div class="row">
            <div class="col-lg-2">
                <label for="">Años:</label>
            </div>
            <div class="col-lg-3">
                <input type="numeric" class="form-control" v-model="lifeExpectancy">
            </div>
            <div class="col-lg-3">
                <button class="btn btn-primary" @click="config">Configurar</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    @Component
    export default class ConfigLigeExpectacyComponent extends Vue {
        public lifeExpectancy: number = 74.98;

        config() {
            this.$emit('config', this.lifeExpectancy);
        }
    }
</script>
