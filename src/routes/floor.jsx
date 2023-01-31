import Nav from '../components/nav'
import List from '../components/list'
import '../styles/floor.css'
import medparkImg from '../../public/medpark-alt.png'

export default function Floor() {
  return (
    <div>
      <Nav />
      <div className="flex space-between justify-around items-center min-h-screen">
        <div>
          <p className="my-2 text-xl">Cashier</p>
          <List />
        </div>

        <img className="fixed opacity-10" src={medparkImg} width="50%" />

        <div>
          <p className="my-2 text-xl">Pharmacy</p>
          <List />
        </div>
      </div>
    </div>
  )
}
