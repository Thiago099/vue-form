<template>
<div>
    
    <label 
        v-if="title!=''" 
        for="input"
        >{{ title }}
    </label>
    <p>
        <div 
            :class="`${group_class} col-12` "
        >
            <input v-if="type === 'text'"
                type="text" 
                class="form-control input-sm" 
                :class="erro != '' ? 'erro-input' : ''"
                @input="handleBaisc"
                :value="value"
            />
            <div v-else-if="type === 'switch'" class="btn-group col-12">
                <button 
                    v-for="([option, key]) in list_options"
                    :key="option"
                    type="button"
                    class="btn"
                    :class="`${key == value ? 'btn-blue' : ''} ${erro != '' ? 'erro-input' : ''}`"
                    @click="$emit('input', key == value ? null : key)"
                >
                    {{ option }}
                </button>
            </div>
            <select
             v-else-if="type === 'select'" 
             class="form-select input-sm" 
            :class="erro != '' ? 'erro-input' : ''"
             @change="$emit('input', $event.target.value)"
             >
                <option value=""></option>
                <option 
                    v-for="([option, key]) in list_options"
                    :key="option"
                    :value="key"
                    :selected="key == value"
                >
                {{ option }}</option>
             </select>
             <input 
                v-else-if="type === 'date'"
                @input="handleBaisc"
                type="date" 
                class="form-control"
                :class="erro != '' ? 'erro-input' : ''"
                :value="value"
             >
            <input 
                v-else-if="type === 'time'"
                @input="handleBaisc"
                type="time" 
                class="form-control"
                :class="erro != '' ? 'erro-input' : ''"
                :value="value"
            >
            <input 
                v-else-if="type === 'number'"
                @input="handleBaisc"
                type="number" 
                class="form-control"
                :class="erro != '' ? 'erro-input' : ''"
                :value="value"
            >
            <!-- <div v-else-if="type === 'check'">
                <div class="form-check" v-for="([option, key]) in list_options" :key="key">
                    <input 
                        class = "form-check-input" 
                        type = "checkbox" 
                        value = "" 
                        :id = "`flexCheckDefault_${key}_${name}`"
                        :class="erro != '' ? 'erro-input' : ''"
                        >
                    <label class="form-check-label" :for="`flexCheckDefault_${key}_${name}`">
                        {{option}}
                    </label>
                </div>
            </div> -->
        </div>
    </p>
    <div class="erro-message" v-if="erro != ''">{{ erro }}</div>
    <div v-else class="erro-placeholder">A</div>
</div>

</template>
<script>
export default {
    name: 'v-input',
    props: {
        
        erro:{
            type: String,
            default: ''
        },
        value:{},
        title:{ 
            default:''
        },
        type:{
            default: 'text'
        },
        options:{},
        face:{
            default: 'description'
        },
        back:{
            default: 'id'
        },

    },

    data(){ 
        return {
            content: this.value,
            list_options: [],
        }
    },
    methods:
    {
        handleBaisc(event)
        {
            this.content = event.target.value
            this.$emit('input', this.content)
        },
    },
    mounted(){
        if(Array.isArray(this.options[0]))
        {
            this.list_options = this.options
        }
        else if(typeof this.options[0] ==='object')
        {
            this.list_options = this.options.map(option => [option[this.face],option[this.back]])
        }
        else 
        {
            this.axios(this.options, 'get', {
                callback: ({lista}) => {
                    this.list_options = lista.map(option => [option[this.face],option[this.back]])
                }
            })
        }
    },
    computed:
    {
        group_class(){
            switch(this.type)
            {
                case 'text':
                    return 'form-group'
                case 'switch':
                    return 'btn-group btn-group-justified'
            }
            return '';
        },
    }
}
</script>
<style scoped>
    .btn{
        border:1px solid rgb(206, 212, 218);
    }
    p{
        margin-bottom: 10px;
    }
    .btn-info{
        color:white;
        background-color: rgb(10, 126, 172);
    }	
    .erro-message{
        color:red;
        font-size: 12px;
        margin-top: 5px;
    }
    .erro-input{
        border: 1px solid red;
    }
    .erro-label{
        color:red;
    }
    .erro-placeholder{
        opacity: 0;
    }

    .btn-blue{
        color:white;
        background-color: #3b7daf;
    }

</style>