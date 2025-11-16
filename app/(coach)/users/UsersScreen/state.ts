import { get_users } from '../http';
import { User } from '../model';
import { ProfileSlice } from '../ProfileScreen/state';


export interface UsersSlice {
    users: User[];
    user_id: number;

    loadUsers:() => void;
    selectUser:(user_id: number) => void;
}

export const createUsersSlice = (set: any, get: any): UsersSlice => ({
    users: [],
    user_id: 0,


    loadUsers:() => {
        get_users((users => { 
            set({ users, user_id: 0 })
        }))
    },
    
    selectUser:(user_id: number) => {
        const { loadUser }: ProfileSlice = get();
        loadUser(user_id);
        set({user_id});
    }
})

