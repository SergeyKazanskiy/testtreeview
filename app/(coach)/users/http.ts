import { request } from '../../api/request';
import { api } from '../../api/utils';
import { User } from './model';



// Get
export function get_users(callback: (users: User[]) => void) {
  return request(() => api.get(`users`), callback);
};

export function get_user(id: number, callback: (user: User) => void) {
  return request(() => api.get(`users/${id}`), callback);
};


// Update
export function update_user(id: number, data: Partial<User>, callback: (res: {isOk: boolean}) => void) {
  return request(() => api.put(`users/${id}`, data), callback);
};


// Delete
export function delete_user(id: number, callback: (res: {isOk: boolean}) => void) {
  return request(() => api.delete(`users/${id}`), callback);
};


// Photo
// export function upload_photo(id: number, formData: FormData, callback: (res: {isOk: boolean}) => void) {
//   return request(() => api.post(`users/${id}/photo`, formData,
//       { headers: {'Content-Type': 'multipart/form-data'}}), callback);
// };



