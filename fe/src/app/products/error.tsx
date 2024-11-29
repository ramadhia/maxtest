'use client'

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import { AlertCircle } from "lucide-react"
import { useEffect } from "react";

export default function Error({
  error,
}: {
    error: Error & { digest?: string }
}) {

    useEffect(() => {
        // Log the error to an error reporting service
    }, [error])

    return (
        <>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error.message}
                </AlertDescription>
            </Alert>
        </>
    )
}