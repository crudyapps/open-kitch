import "regenerator-runtime/runtime";

interface Config {
    apiBaseUrl: string;
}

export function getConfig() {
    if (window.OPEN_KITCH && window.OPEN_KITCH.config) {
        return Promise.resolve(window.OPEN_KITCH.config as Config);
    }
    return fetch("config.json")
        .then(response => {
            if (response.ok) {
                return response
                    .json()
                    .then(config => {
                        window.OPEN_KITCH = { config };
                        return config;
                    });

            }
            return Promise.reject("fail to load config.json");
        })
}
