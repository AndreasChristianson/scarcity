import logger from './logger';

const getOptions = ({body, ...options}) => {
    if (body) {
        return {
            ...options,
            body: JSON.stringify(body)
        };
    }

    return options;
};

export default async (url, options, ...rest) => {
    let result;

    try {
        const rawResponse = await fetch(
            url,
            getOptions(options),
            ...rest);
        const json = await rawResponse.json();

        result = {
            ...json,
            ok: rawResponse.ok,
            statusText: rawResponse.statusText,
            url: rawResponse.url
        };
    } catch (error) {
        result = {
            message: `Network error: ${error.message}`,
            ok: false,
            statusText: 'Error',
            url
        };
    }

    logger.log(`${result.url} -> ${result.statusText}. [${result.message}]`);

    return result;
};
