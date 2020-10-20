import { getUserEndpoint, getUsersEndpoint } from "./endpoints";
import { User } from "../ducks/users/users";

export interface QueryProps {
    email?: string;
    username?: string;
    limit?: number;
    offset?: number;
}

export function queryAllUsers(props: QueryProps) {
    return getUsersEndpoint()
        .get(props)
        .json();
}

export function createUser(props: Omit<User, "id">) {
    return getUsersEndpoint()
        .post(props)
        .res();
}

export function updateUser(props: User) {
    return getUsersEndpoint()
        .put(props)
        .res();
}

export function deleteUser(id: string) {
    return getUserEndpoint(id)
        .delete()
        .res();
}
