export declare class Log {
    error: (data: any, additionalData?: any) => void;
    info: (data: any, additionalData?: any) => void;
    package: (data: any, additionalData?: any) => void;
    warn: (data: any, additionalData?: any) => void;
    emphasize: (data: any, additionalData?: any) => void;
}
export declare const log: Log;
