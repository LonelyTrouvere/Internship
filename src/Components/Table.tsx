import * as ReactBootStrap from 'react-bootstrap'
import {useEffect, useState} from 'react'

const Table = (props:
    {view: string}
) =>{

    return(
        <ReactBootStrap.Table>
             <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
          <th>Phone</th>
          <th>E-mai</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
        </ReactBootStrap.Table>
    );
}

export default Table;