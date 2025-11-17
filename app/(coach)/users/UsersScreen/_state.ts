import { delete_user, get_users } from '../_http';
import { User } from '../_model';
import { ProfileSlice } from '../ProfileScreen/_state';


export interface UsersSlice {
    users: User[];
    user_id: number;
    isDeleteAlert: boolean;

    loadUsers:() => void;
    selectUser:(user_id: number) => void;
    checkUser:(user_id: number) => void;
    deleteUser:() => void;

    showDeleteAlert: () => void;
    hideDeleteAlert: () => void;
}

export const createUsersSlice = (set: any, get: any): UsersSlice => ({
    users: [],
    user_id: 0,
    isDeleteAlert: false,


    loadUsers:() => {
        get_users((users => { 
            set({ users, user_id: 0 })
        }))
    },
    
    selectUser:(user_id: number) => {
        const { loadUser }: ProfileSlice = get();
        loadUser(user_id);
        set({user_id});
    },

    checkUser:(user_id: number) => {
        set({user_id});
    },

    deleteUser:() => {
        const { user_id }: UsersSlice = get();

        delete_user(user_id, (res => {
            if (res.isOk) {
                set((state: UsersSlice) => ({
                    user_id: 0,
                    isDeleteAlert: false,
                    users: state.users.filter(el => el.id !== user_id),
                }));
            }
        }))
    },

    showDeleteAlert: () => set({isDeleteAlert: true}),
    hideDeleteAlert: () => set({isDeleteAlert: false}),
})

