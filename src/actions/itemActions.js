import axios from "axios";
import * as constants from "../constants";
import * as headerUtils from "../utilities/headers";
import * as urls from "../utilities/urls";

export function loadItems(bucketlist) {
    return {
        type: constants.ITEMS_REQUEST,
        bucketlist: bucketlist,
        items: bucketlist.get("items")
    }
}