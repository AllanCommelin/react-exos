import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addUser, getUser} from '../store/user'

const Auth = Component => {
    const Layout = () => {
        const history = useHistory();
        const dispatch = useDispatch();
        const { user } = useSelector(getUser)

        useEffect(() => {
            if (!Cookies.get('userReact')) {
                history.push('/login')
                return;
            }
            if(Object.entries(user).length === 0) {
                const {sub} = jwt.decode(Cookies.get('userReact'))

                fetch(`http://localhost:3004/users/${sub}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('userReact')}`
                    }
                }).then( async (res) => {
                    const data =  await res.json();
                    if (res.status === 401) history.push('/login')
                    dispatch(addUser({...data}))
                })
            }
        })

        return (
            <>
                <Component/>
            </>
        )
    }
    return Layout
}

export default Auth