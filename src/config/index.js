export const production = "prod.xxxx.com"
export const development = "index.musclewiki.cn"

export const isProd = window.location.host.includes(production);
export const isDevelopment = () => {
    return !isProd
}

const prefix = "https://"
const ROUTE = "/proxyApi"
// const ROUTE = "/api/admin"
export const config = (routePrefix = "") => {
    const COOKIE_KEY = isDevelopment() ? "COOKIE_KEY_dev" : "COOKIE_KEY_prod"
    const FIELD_PREFIX = isDevelopment() ? "dev" : "prod"
    routePrefix = routePrefix || ROUTE
    if (isProd) {
        return {
            BASE_URL: `${prefix}${production}${routePrefix}`,
            COOKIE_KEY,
            FIELD_PREFIX
        };
    }
    return {
        BASE_URL: `${prefix}${development}${routePrefix}`,
        COOKIE_KEY,
        FIELD_PREFIX
    };
};
