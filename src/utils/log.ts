import { consoleTransport, logger } from 'xenous-logs';

const config = {
    transport: consoleTransport,
    severity: __DEV__ ? 'debug' : 'error',
    levels: {
        info: 6,
        error: 3,
        // dev levels
        warn: 2,
        debug: 1,
    },
    transportOptions: {
        colors: 'ansi',
    },
    enabledExtensions: ['ui'] as const,
    async: true,
    dateFormat: __DEV__ ? 'time' : 'utc',
    printLevel: true,
    printDate: true,
    enabled: true,
};

export default logger.createLogger<typeof config.levels, typeof config.enabledExtensions[number]>(config);
