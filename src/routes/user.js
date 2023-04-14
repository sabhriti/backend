import UserComponent from "@/components/user/UserComponent.vue";
import UserList from "@/components/user/UserList.vue";
import UserForm from "@/components/user/UserForm.vue";

export default {
    path: '/user',
    name: 'UserComponent',
    component: UserComponent,
    children: [
        {
            path: '',
            name: 'UserList',
            component: UserList
        },
        {
            path: 'form/id=:id?',
            name: 'UserForm',
            component: UserForm
        },
    ]
};
