import { api } from "@/src/api/api";
import { request as httpWrapper } from '@/src/api/request';
import { Camp, Coach, CoachGroup, CoachShort, FreeGroup } from './model';


// Get 
export function get_camps(callback: (camps: Camp[]) => void) {
  return httpWrapper(() => api.get(`camps`), callback);
};

export function get_coaches(camp_id: number, callback: (coaches: CoachShort[]) => void) {
  return httpWrapper(() => api.get(`camps/${camp_id}/coaches`), callback);
};

export function get_coach(coach_id: number, callback: (coach: Coach) => void) {
  return httpWrapper(() => api.get(`camps/coaches/${coach_id}`), callback);
};

export function get_coache_groups(coach_id: number, callback: (coachGroups: CoachGroup[]) => void) {
  return httpWrapper(() => api.get(`camps/coaches/${coach_id}/groups`), callback);
};

export function get_free_groups(callback: (freeGroup: FreeGroup[]) => void) {
  return httpWrapper(() => api.get(`groups/free`), callback);
};

// Add
export function create_coach(data: Coach, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`camps/coaches`, data), callback);
};

export function add_coach_group(data: {coache_id: number, group_id: number}, callback: (coachGroups: CoachGroup[]) => void) {
    return httpWrapper(() => api.post(`camps/coaches/groups`, data), callback);
};

// Update
export function update_coach(coach_id: number, data: Partial<Coach>, callback: (res: {isOk: boolean}) => void) {
  return httpWrapper(() => api.put(`camps/coaches/${coach_id}`, data), callback);
};

// Delete
export function delete_coach(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/coaches/${id}`), callback);
};

export function remove_coach_group(id: number, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`camps/coaches/groups/${id}`), callback);
};