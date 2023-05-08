import {Status} from'./stateType'

export const STATUS_CHECK = "STATUS_CHECK";

type StatusCheckAction = {
    type: typeof STATUS_CHECK,
    payload: Status,
}

type MyAction = StatusCheckAction;

export default MyAction;