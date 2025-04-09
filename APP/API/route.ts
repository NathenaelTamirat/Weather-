import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration purposes
const mockWeatherData = {
  location: {
    name: "London",
    country: "United Kingdom",
    localtime: new Date().toISOString(),
  },
  current: {
    temp_c: 18,
    temp_f: 64.4,
    condition: {
      text: "Partly cloudy",
      code: 1003,
    },
    wind_kph: 15,
    wind_dir: "SW",
    humidity: 72,
    feelslike_c: 17.5,
    uv: 4,
  },
  forecast: {
    forecastday: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      day: {
        maxtemp_c: 18 + Math.floor(Math.random() * 5),
        mintemp_c: 12 + Math.floor(Math.random() * 3),
        condition: {
          text: ["Sunny", "Partly cloudy", "Cloudy", "Light rain"][Math.floor(Math.random() * 4)],
          code: [1000, 1003, 1006, 1063][Math.floor(Math.random() * 4)],
        },
      },
    })),
  },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const location = searchParams.get("location")

  // In a real app, you would use these parameters to fetch from a weather API
  // For this demo, we'll just return mock data with a slight delay to simulate API call

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // If location is provided, we could customize the mock data
  if (location) {
    return NextResponse.json({
      ...mockWeatherData,
      location: {
        ...mockWeatherData.location,
        name: location,
      },
    })
  }

  // If coordinates are provided, we could customize the mock data
  if (lat && lon) {
    return NextResponse.json(mockWeatherData)
  }

  return NextResponse.json(mockWeatherData)
}
