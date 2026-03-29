type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, unknown>;
    userId?: string;
    requestId?: string;
    error?: string;
    stack?: string;
}

class Logger {
    private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...(context && { context }),
        };

        // Standard structured logging for stdout/stderr (e.g. Datadog JSON ingest)
        console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](JSON.stringify(entry));
    }

    debug(message: string, context?: Record<string, unknown>) {
        this.log('debug', message, context);
    }

    info(message: string, context?: Record<string, unknown>) {
        this.log('info', message, context);
    }

    warn(message: string, context?: Record<string, unknown>) {
        this.log('warn', message, context);
    }

    error(message: string, error: Error | unknown, context?: Record<string, unknown>) {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level: 'error',
            message,
            ...(context && { context }),
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        };
        console.error(JSON.stringify(entry));
    }
}

export const logger = new Logger();
