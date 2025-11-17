import { AvatarName } from '@/app/constants/avatars';
import { get_user, update_user } from '../http';
import { User } from '../model';


export interface ProfileSlice {
    user: User | null;
    photo: AvatarName;
    first_name: string;
    last_name: string;
    email: string;
    isProfileChanged: false,

    loadUser:(user_id: number) => void;
    setPhoto:(photo: string) => void;
    setFirstName:(firstName: string) => void;
    setLastName:(lastName: string) => void;
    setEmail:(phone: string) => void;

    checkProfile:() => void;
    updateProfile:(callback:() => void) => void ;
    uploadPhoto:(student_id: number, file: File, file_name: string) => void;
}

export const createProfileSlice = (set: any, get: any): ProfileSlice => ({
    user: null,
    photo: 'stab_avatar',
    first_name: "Name",
    last_name: "Name",
    email: "123456789",
    isProfileChanged: false,

    loadUser:(user_id: number) => {
        get_user(user_id, (user => { 
            const { first_name, last_name, email } = user;
            set({ user, first_name, last_name, email })
        }))
    },
    setPhoto:(photo: string) => set({ photo }),
    setFirstName:(first_name: string) => set({ first_name }),
    setLastName:(last_name: string) => set({ last_name }),
    setEmail:(phone: string) => set({ phone }),

    checkProfile:() => { 
        const { user, first_name, last_name, email}: ProfileSlice = get();
        if (user) {
            const isProfileChanged = 
            user.first_name !== first_name ||
            user.last_name !== last_name ||
            user.email !== email
            set({ isProfileChanged });
        }    
    },

    updateProfile:(callback) => {
        const { user, first_name, last_name, email }: ProfileSlice = get();

        update_user(user!.id, {first_name, last_name, email }, (res => {
            if (res.isOk) callback();
        }))
    },

    uploadPhoto: (student_id: number, file: File, file_name: string) => {
        // const formData = new FormData();
        // formData.append('file', file);

        // add_student_photo(student_id, formData, (res => {
        //     if (res.isOk) {
        //         set((state: ProfileSlice) => ({
        //             photo: file_name,
        //         }))
        //     }
        // }));
    },
})

