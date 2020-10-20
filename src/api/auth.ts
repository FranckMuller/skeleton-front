import { getAuthEndpoint } from "./endpoints";

interface AuthProps {
    username: string;
    password: string;
}

export async function auth(props: AuthProps) {
    return getAuthEndpoint()
        .post(props)
        .json();
}
