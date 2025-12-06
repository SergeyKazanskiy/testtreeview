import { get_student_coach_comments } from '../http';
import { Comment } from "../model";
import { StudentsSlice } from '../StudentsScreen/state';


export interface CommentsSlice {
    comments: Comment[];
    
    loadComments: () => void;
}

export const createCommentsSlice = (set: any, get: any): CommentsSlice => ({     
    comments: [],

    loadComments: ( ) => {
        const { student_id }: StudentsSlice = get()

        get_student_coach_comments(student_id, (comments: Comment[]) => {
            set({comments})
        })
    },
});
