"use client"

import { useState, useEffect } from "react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { WeatherDisplay } from "@/components/weather-display"
import { SearchLocation } from "@/components/search-location"
import { Forecast } from "@/components/forecast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorDisplay } from "@/components/error-display"

export default function WeatherApp() {
  const [location, setLocation] = useState<string | null>(null)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { coordinates, locationError } = useGeolocation()

  useEffect(() => {
    if (coordinates && !location) {
      fetchWeatherByCoordinates(coordinates.latitude, coordinates.longitude)
    }
  }, [coordinates, location])

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    try {
      setLoading(true)
      setError(null)

      // In a real app, you would call your API here
      // For demo purposes, we're using a timeout to simulate API call
      setTimeout(async () => {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const data = await response.json()
        setWeatherData(data)
        setLocation(data.location.name)
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      setLoading(false)
    }
  }

  const fetchWeatherByLocation = async (searchLocation: string) => {
    try {
      setLoading(true)
      setError(null)

      // In a real app, you would call your API here
      // For demo purposes, we're using a timeout to simulate API call
      setTimeout(async () => {
        const response = await fetch(`/api/weather?location=${encodeURIComponent(searchLocation)}`)
        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const data = await response.json()
        setWeatherData(data)
        setLocation(data.location.name)
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-sky-900 dark:text-sky-100">
          Weather Forecast
        </h1>

        <SearchLocation onSearch={fetchWeatherByLocation} />

        {loading && <LoadingSpinner />}

        {error && <ErrorDisplay message={error} />}

        {locationError && <ErrorDisplay message="Unable to get your location. Please search for a location instead." />}

        {!loading && !error && weatherData && (
          <>
            <WeatherDisplay weatherData={weatherData} />
            <Forecast forecastData={weatherData.forecast} />
          </>
        )}
      </div>
    </main>
  )
}
