import { fromJS, Map } from "immutable";
import authReducer from "../../reducers/authReducers";
import * as actionTypes from "../../constants";

describe("Authentication Reducer", () => {
    let initialState;

    beforeEach(() => {
        initialState = new Map({
            isLoggedIn: false,
            fetching: false,
            error: null,
            credentials: Map({
                email: '',
                password: ''
            }),
            token: ''
        });
    });

    it("should have the default state", () => {
        let result = authReducer(undefined, { type: "unknown" });

        expect(result).toEqual(initialState);
    });

    it("should handle LOGIN_USER", () => {
        let result = authReducer(undefined, { type: actionTypes.LOGIN_USER });

        expect(result).toEqual(initialState);
    });

    it("should handle LOGIN_SUCCESS", () => {
        let result = authReducer(
            initialState,
            {
                type: actionTypes.LOGIN_SUCCESS,
                payload: {
                    token: "really_complex_token",
                    credentials: {email: "user@email.com", password: "fakepassword"}
                }
            });

        let expectedResult = initialState.merge({
            isLoggedIn: true,
            token: "really_complex_token",
            credentials: fromJS({email: "user@email.com", password: "fakepassword"}),
            error: null
        });

        expect(result).toEqual(expectedResult);
    });

    it("should handle LOGIN_FAILED", () => {
        let result = authReducer(
            initialState,
            {
                type: actionTypes.LOGIN_FAILED,
                error: {
                    response: {
                        data: {
                            message: "Error"
                        }
                    }
                }
            });

        let expectedResult = initialState.merge({
            isLoggedIn: false,
            error: "Error"
        });

        expect(result).toEqual(expectedResult);
    });

    it("should handle LOGIN_MISSING_FIELDS", () => {
        let result = authReducer(
            initialState,
            {
                type: actionTypes.LOGIN_MISSING_FIELDS,
                error: "Error"
            });

        let expectedResult = initialState.merge({
            isLoggedIn: false,
            error: "Error"
        });

        expect(result).toEqual(expectedResult);
    });

    it("should handle AUTH_FIELD_CHANGE", () => {
        let result = authReducer(
            initialState,
            {
                type: actionTypes.AUTH_FIELD_CHANGE,
                credentials: {email: "user@email.com", password: "password"}
            });

        let expectedResult = initialState.merge({
            credentials: fromJS({email: "user@email.com", password: "password"})
        });

        expect(result).toEqual(expectedResult);
    });
});