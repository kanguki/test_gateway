declare const config: {
    kafka: {
        producer: {
            id: string;
            brokerList: string;
            enableIndempotence: boolean;
            dr_cb: boolean;
            defaultTopic: string;
        };
        consumer: {
            groupId: string;
            brokerList: string;
            topics: string[];
        };
    };
    socket: {
        topicOn: string;
        topicEmit: string;
    };
};
export default config;
