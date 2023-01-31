import React from 'react'

const List = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 main-color text-white">
              Queue Number
            </th>
            <th scope="col" className="px-6 py-3 main-color text-white">
              Counter
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b text-gray-900">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              6368
            </th>
            <td className="px-6 py-4">1</td>
          </tr>
          <tr className="bg-white border-b text-gray-900">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2623
            </th>
            <td className="px-6 py-4">2</td>
          </tr>
          <tr className="bg-white text-gray-900">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2849
            </th>
            <td className="px-6 py-4">3</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default List
