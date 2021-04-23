import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Input from '../../components/Input'
import {registerUser} from "../../store/user";
import Banner from "../../components/Banner";


const Register = () => {
    const dispatch = useDispatch();
    const [displayBanner, setDisplayBanner] = useState(false)
    const [fields, setFields] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
    })

    const handleChangeField = ({ target: { value, name } }) => setFields({
        ...fields,
        [name] : value
    })

    const closeBanner = () => setDisplayBanner(false)

    const submitForm = (e) => {
        e.preventDefault();
        const checkRequired = Object.keys(fields).find(key => fields[key] === '')
        if (checkRequired) {
            return;
        }
        dispatch(registerUser({...fields}))
        setDisplayBanner(true)
        setFields({
            lastname: '',
            firstname: '',
            email: '',
            password: '',
        })
    }

    return (
        <>
            {displayBanner && <Banner text="Utilisateur inscrit !" close={closeBanner} />}
            <h1>Inscription</h1>
            <form onSubmit={submitForm} className="m-10">
                <Input
                    label="Nom"
                    name="lastname"
                    placeholder="Doe"
                    handleChange={handleChangeField}
                    value={fields.lastname}
                />
                <Input
                    label="Prénom"
                    name="firstname"
                    placeholder="John"
                    handleChange={handleChangeField}
                    value={fields.firstname}
                />
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

export default Register;