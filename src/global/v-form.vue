<template>
    <div :key="responsividade">
        <div v-for="({title, data}) in fields" :key="title" class="card" >
                <div class="card-header"> {{ title }} </div>
                <div class="card-body row">
                    <v-input 
                    v-for="({name, classe, title, required, type, options, face, back}) in data"
                        :key="name"
                        :class="classe"
                        :title="title + ':' + (required ? ' *' : '') "
                        v-model="form[name]"
                        :type="type"
                        :options="options"
                        :face="face"
                        :back="back"
                        :erro="erro[name]"
                    />
                </div>
        </div>
             
        <div class="col-sm-12" style="margin-bottom:100px; margin-top:20px">
            <button 
                class="btn btn-primary" 
                style="float:right"
                @click="submit()"
            >{{ id == 0 ? 'Salvar' : 'Atualizar'}}</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'v-form',
    props:{
        fields: {
            type: Array,
            default: () => []
        },
        data:{
            type: String,
            default: ''
        },
        id:{
        }
    },
    data(){
        return {
            form:{},
            erro:{},
            colapse:false,
            responsividade: 0,
        }
    },
    mounted(){

        if(this.id != 0)
        {
            this.axios(`/${this.data}/listar/${this.id}`, 'get', {
                callback: (result) => {
                    this.form = result;
                }
            })
            
        }
        else
        {
            this.form = this.fields.reduce((acc, field) => {
                field.data.forEach(input => {
                    acc[input.name] = input.default
                })
                return acc
            }, {})
            this.form.id = 0
        }
        
    },

    methods:
    {
        submit(){
            var erro = false;
            this.fields.forEach(({data, title}) => {
                data.forEach(({name, required, type, validation}) => {
                    if(required && (this.form[name] == undefined || this.form[name] == ''))
                    {
                        erro = true
                        this.erro[name] = 'Este campo é obrigatório.'
                    }
                    else
                    {
                        if(typeof validation !== 'undefined')
                        {
                            const processed = validation(this.form[name])
                            if(typeof processed != 'undefined')
                            {
                                this.erro[name] = processed
                                erro = true
                            }
                            else
                            {
                                this.erro[name] = ''
                            }
                        }
                        else
                        {
                            this.erro[name] = ''
                        }
                    }
                })
                
            });
            this.responsividade++
            if(!erro)
            {
                this.axios(`/${this.data}/salvar/`, 'post', {
                    data: this.form,
                })
            }
        },
    },


}
</script>
<style scoped>
.card{
    margin-top:20px;
    padding: 0px;
}
.btn{
    font-size: 15px;
    padding:10px;
    padding-left: 50px;
    padding-right:50px;
    color:white;
    background-color: #3b7daf;
}
.card-header{
    background-color: #3b7daf;
    color:white;
}
.card-body{
    padding: 25px 40px 10px 40px;
}

</style>