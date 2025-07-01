import React from 'react';
import { people } from '../Data/table_data.jsx';
import { getImageUrl } from '../utilities/utils.jsx';
import { useState } from 'react';

function Table({title}){
    const [selectedId, setSelectedId] = useState(null); // Track the clicked row
    function handleClick(id){
        setSelectedId(id);
    }
    return (
        <>
            <h2 className='text-3xl text-slate-700 font-bold'>{title}</h2>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Profession</th>
                            <th scope="col" className="px-6 py-3">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person) => (
                            <tr key={person.id} 
                            onClick={()=>handleClick(person.id)}
                            className={`cursor-pointer border -b dark:border-gray-700 ${
                  selectedId === person.id
                    ? 'bg-slate-600 '
                    : 'bg-white dark:bg-gray-800'
                }`}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {person.name}
                                </td>
                                <td className="px-6 py-4">
                                    {person.profession}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={getImageUrl(person)} alt={person.name} className="w-10 h-10 rounded-full" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
