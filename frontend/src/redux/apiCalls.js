import axios from "axios";
import { loginStart, loginSuccess, loginError } from "./userSlice";


export const LoginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/auth/login', user)
        
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        dispatch(loginSuccess(res.data))
        console.log('res', res.data)
        res.data && window.location.replace('/')
    } catch (err) {
        console.log('err', err?.response?.data?.message)
        dispatch(loginError());
    }
}
