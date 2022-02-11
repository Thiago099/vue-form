<template>
    <div>
        <input type="search" class="form-control input-sm" style="margin:20px 0 20px 0">
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th scope="col" v-for="title in Object.keys(display[0])" :key="title">{{ title }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="line in display" :key="line">
                    <td v-for="item in line" :key="item">{{ item }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

export default {
    name: 'v-table',
    props: {
        data: {
        },
        fields:{},
    },
    data(){
        return {
            display:[]
        }
    },
    created(){
        const process = result =>{
            this.display = result.map(line => {
                let newLine = {};
                for(let field of this.fields)
                {
                    if(Array.isArray(field))
                    {
                        newLine[field[1].toUpperCase()] = line[field[0]]
                    }
                    else
                    {
                        newLine[field.toUpperCase()] = line[field]
                    }
                }
                return newLine;
            });
        }
        if(typeof this.data === 'object')
        {
            process(this.data)
        }
        else
        {
            this.axios(`/${this.data}/listar/`, 'get', {
                callback: (result) => {
                    process(result)
                }
            })
        }
    },

}
</script>

<style scoped>
    thead th{
        border-style: none;
        background-color: #1e85d4;
        color:white;
    }
    th:first-child{
        border-radius: 6px 0 0 0;
    }
    th:last-child{
        border-radius: 0 6px 0 0;
    }
    tr:nth-child(even){
        background-color: #f5f4f4;
    }
</style>