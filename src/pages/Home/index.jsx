import { Link } from 'react-router-dom'
import Button from '../../components/RegisterButton'

const Home = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <div className="flex flex-col items-center">
      <Link className="block" to="/popup"><Button text="Popup"/></Link>
      <Link className="block mt-2" to="/form"><Button text="Form"/></Link>
      <Link className="block mt-2" to="/calculator"><Button text="Calculator"/></Link>
    </div>
  </div>
)

export default Home;
