export const STATUS_CHECK = "STATUS_CHECK";

export type Status = {
    status_code: number,
    detail: string,
    result: string,
};

type StatusCheckAction = {
    type: typeof STATUS_CHECK,
    payload: Status,
}

type MyAction = StatusCheckAction;

export default MyAction;