import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input'
import Banner from "../../components/Banner";
import {loginUser} from "../../store/user";


const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [displayBanner, setDisplayBanner] = useState(false)
    const [fields, setFields] = useState({
        email: '',
        password: '',
    })

    const handleChangeField = ({ target: { value, name } }) => setFields({
        ...fields,
        [name] : value
    })

    const closeBanner = () => setDisplayBanner(false)

    const submitForm = async (e) => {
        e.preventDefault();
        const checkRequired = Object.keys(fields).find(key => fields[key] === '')
        if (checkRequired) {
            return;
        }
        const isOk = await dispatch(loginUser({...fields}))
        if (isOk) {
            setDisplayBanner(true)
            setFields({
                email: '',
                password: '',
            })
            setTimeout(function () {
                history.push('/articles')
            }, 1000)
        }
    }

    return (
        <>
            {displayBanner && <Banner text="Utilisateur connecté !" close={closeBanner} />}
            <h1>Connexion</h1>
            <form onSubmit={submitForm} className="m-10">
                <Input
                    label="email"
                    name="email"
                    type="mail"
                    placeholder="e.g. john@doe.com"
                    handleChange={handleChangeField}
                    value={fields.email}
                />
                <Input
                    label="Mot de passe"
                    name="password"
                    type="password"
                    handleChange={handleChangeField}
                    value={fields.password}
                />
                <button type="submit" className="py-3 px-5 border mt-10">S'inscrire</button>
            </form>
        </>
    )
}

export default Login;