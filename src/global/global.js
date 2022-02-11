import vInput from './v-input'
import vTable from './v-table'
import vForm from './v-form'

export default {
    components:{
        vInput,
        vTable,
        vForm
    },
    data(){
        return{
            INPUT_SIM_NAO:[['Sim','1'],['Não','0']]
        }
    }
}