import React from 'react'

import CreateFormLocation from '../create-form-location'
import TableListLocation from '../table-list-location'

export default function Location() {
  
  return (
    <div>
      <CreateFormLocation/>
      <hr className="my-3 h-0.5 border-t-5 bg-neutral-100 dark:bg-white/10" />
      <TableListLocation/>
    </div>
  )
}
