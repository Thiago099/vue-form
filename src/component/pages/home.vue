<template>
    <div class="row">
        <v-form 
            :fields="fields" 
            id="0" 
            data="Teste"
        />
        
        <!-- <v-table class="col-12" :data="table_data"></v-table> -->
    </div>
</template>
<script>
export default {
    name: 'home',
    data(){
        return {
            fields: [],
        }
    },
    
    created(){
        this.fields = [
            {
                title: 'Group 1',
                data:
                [
                    {
                        classe: "col-sm-6 col-md-3",
                        title: "Escolha",
                        name: "simnao",
                        default:"1",
                        type:"switch",
                        options:this.INPUT_SIM_NAO,
                        required: true,
                    },
                    {
                        classe: "col-sm-6 col-md-3",
                        title: "Opção",
                        name: "opcao",
                        default:1,
                        type:"switch",
                        face:"name",
                        back:"value",
                        options:[
                            { 
                                value: 1,
                                name:"A"
                            },
                            { 
                                value: 2,
                                name:"B"
                            },
                            { 
                                value: 3,
                                name:"C"
                            }
                        ],
                        required: true,
                    },
                    {
                        classe: "col-sm-6 col-md-3",
                        title: "Data",
                        name: "data",
                        default:"2021-01-01",
                        type:"date",
                        required: true,
                    },
                    {
                        classe: "col-sm-6 col-md-3",
                        title: "Numero",
                        name: "numero",
                        default:"1",
                        type:"number",
                        required: true,
                    },
                ]
            },
            {
                title: 'Group 2',
                data:
                [
                    {
                        classe: "col-sm-6 col-md-3",
                        title: "Nome",
                        name: "nome",
                        default:"1",
                        type:"text",
                        validation: item => {
                            if(item.length < 3)
                            {
                                return "O nome deve ter pelo menos 3 caracteres"
                            }
                        },
                        required: true,
                    },
                    {
                        classe: "col-sm-6 col-md-3",
                        title: "Estado",
                        name: "id_estado",
                        default:1,
                        type:"select",
                        face:"nome",
                        options:'Estado/get_estado',
                        required: true,
                    },
                ]
            }
        ]
    }
}
</script>

<style scoped>

</style>