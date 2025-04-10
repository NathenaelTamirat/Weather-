"use client"

import { useState, useEffect } from "react"

interface Coordinates {
  latitude: number
  longitude: number
}

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        let errorMessage = "Failed to get your location"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }

        setLocationError(errorMessage)
      },
    )
  }, [])

  return { coordinates, locationError }
}
