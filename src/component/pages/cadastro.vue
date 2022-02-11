<template>
    <div>
        <h2>Cadastro</h2>
        {{ id }}
        <v-table data="Teste" :fields="['nome',['descricao_estado','estado']]"></v-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'cadastro',
    data(){
        return {
            id: this.$route.params.id,
        }
    },

}
</script>

<style scoped>

</style>