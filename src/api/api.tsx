import axios from "axios";

export function getData(config: {}, url: string, callback: Function, errorCallback: Function) {
    axios.get(url, config)
        .then(res => {
            if (callback !== null) {
                callback(res);
            } else {
                return res.data;
            }
        })
        .catch(err => {
            if (errorCallback !== null) {
                errorCallback(err);
            } else {
                return err;
            }
        });
};