import React from 'react'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div>
      <h1>This is the home page</h1>
      <Button className='cursor-pointer text-lg mt-4' size="lg" variant="default">Click me</Button>
    </div>
  )
}

export default page
