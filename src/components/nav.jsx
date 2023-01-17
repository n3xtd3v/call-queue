import React from 'react'
import { useParams } from 'react-router-dom'

const Nav = () => {
  let { floorId } = useParams()

  return <nav className="bg-gray-800 text-white">HTML Floor {floorId}</nav>
}

export default Nav
