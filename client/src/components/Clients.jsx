import React from 'react';
import {useQuery} from '@apollo/client';
import ClientRow from './ClientRow';
import {GET_CLIENTS} from '../queries/clientQueries';
import Spinner from './Spinner';


const Clients = () => {

 const {loading, error, data} = useQuery(GET_CLIENTS)

 if(loading) return <Spinner/>
 if(error) return <p>Something Went Wrong</p>

  return (
    <div>
        {!loading && !error && (
            <table className='table table-hover mt-3'>
                <thead className=''>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map((client) => (
                        <ClientRow key={client.id} client={client}/> 
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default Clients