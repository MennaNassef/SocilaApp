import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center mt-50">
      <Spinner classNames={{label: "text-foreground"}} color="secondary" size="lg"  variant="gradient" />
    </div>)
}
