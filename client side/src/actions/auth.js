import {
    AUTH
} from '../constants/ActionConst';
import * as api from '../service_api/api';

export const signin = (formData, router) => async (dispatch) => {
    try {
        
        const {
            data
        } = await api.signIn(formData);
        
        dispatch({
            type: AUTH,
            data
        });

        router.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const {
            data
        } = await api.signUp(formData);
        dispatch({
            type: AUTH,
            data
        });

        router.push('/');
    } catch (error) {
        console.log(`We have error in signup Action and error is : ` , error);
    }
};