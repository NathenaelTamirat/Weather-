import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WeatherDisplayProps {
  weatherData: {
    location: {
      name: string
      country: string
      localtime: string
    }
    current: {
      temp_c: number
      temp_f: number
      condition: {
        text: string
        code: number
      }
      wind_kph: number
      wind_dir: string
      humidity: number
      feelslike_c: number
      uv: number
    }
  }
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  const { location, current } = weatherData

  // Function to determine which weather icon to display
  const getWeatherIcon = (code: number) => {
    // This is a simplified version - in a real app you would have more conditions
    if (code >= 1000 && code < 1003) {
      return <Sun className="h-16 w-16 text-yellow-500" />
    } else if (code >= 1003 && code < 1063) {
      return <Cloud className="h-16 w-16 text-gray-500" />
    } else if (code >= 1063 && code < 1200) {
      return <CloudRain className="h-16 w-16 text-blue-500" />
    } else {
      return <Cloud className="h-16 w-16 text-gray-500" />
    }
  }

  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-sky-900 dark:text-sky-100">
              {location.name}, {location.country}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{new Date(location.localtime).toLocaleString()}</p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            Local Time
          </Badge>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            {getWeatherIcon(current.condition.code)}
            <div>
              <div className="text-4xl font-bold text-sky-900 dark:text-sky-100">{current.temp_c}°C</div>
              <div className="text-gray-500 dark:text-gray-400">{current.condition.text}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Feels Like</div>
                <div className="font-medium">{current.feelslike_c}°C</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Wind</div>
                <div className="font-medium">
                  {current.wind_kph} km/h {current.wind_dir}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
                <div className="font-medium">{current.humidity}%</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">UV Index</div>
                <div className="font-medium">{current.uv}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
