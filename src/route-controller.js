import home from './component/pages/home.vue'
import cadastro from './component/pages/cadastro.vue'
// const Cadastro = () => System.import('./component/pages/Cadastro.vue')

export const routes = [
    {
        path: '',
        name: 'home',
        component: home,
    },
    {
        path: '/cadastro/',
        name: 'cadastro',
        component: cadastro,
    },
    {
        path: '/cadastro/:id',
        name: 'Editar',
        component: cadastro,
    },
    {
        path: '*',
        component: home,
    }
]