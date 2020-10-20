import wretch from "wretch";
import { AuthState, updateAuthState } from "../ducks/auth/auth";
import { getApiUtils } from "./utils";
import { push } from "connected-react-router";

export enum Endpoints {
    ApiAuth = "/api/auth",
    RefreshToken = "/api/token/refresh",
    User = "/api/user",
}

const getBase = () => {
    const authState: AuthState = JSON.parse(window.localStorage.getItem("authState") || `{"id": 0}`);
    const token = authState.token && authState.token.access;

    if (token) {
        return wretch(process.env.REACT_APP_BASE_API_URL)
            .headers({ "X-AUTH-TOKEN": `Bearer ${token}` })
            .catcher(403, async (error, originalRequest) => {
                const refreshToken = authState.token && authState.token.refresh;
                const { dispatch } = getApiUtils();

                if (refreshToken) {
                    const newAuthState: AuthState = await getRefreshTokenEndpoint()
                        .headers({ "X-AUTH-REFRESH-TOKEN": `${refreshToken}` })
                        .post()
                        .json();

                    const newToken: any = newAuthState && newAuthState.token && newAuthState.token.access;

                    if (newToken) {
                        dispatch(updateAuthState(newAuthState));

                        return originalRequest
                            .headers({
                                "X-AUTH-TOKEN": `Bearer ${newToken}`,
                            })
                            .replay()
                            .json();
                    }
                }

                dispatch(push("/login"));
                return;
            });
    }

    return wretch(process.env.REACT_APP_BASE_API_URL);
};

export const getAuthEndpoint = () => getBase().url(Endpoints.ApiAuth);
export const getRefreshTokenEndpoint = () => getBase().url(Endpoints.RefreshToken);
export const getUsersEndpoint = () => getBase().url(Endpoints.User);
export const getUserEndpoint = (id: string) => getBase().url(Endpoints.User + `/${id}`);
