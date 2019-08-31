import { getData } from "./api";

export function getMusicDetails(onSuccess: Function, onError: Function) {
    getData({}, `${process.env.REACT_APP_GET_MUSIC}`, onSuccess, onError);
}