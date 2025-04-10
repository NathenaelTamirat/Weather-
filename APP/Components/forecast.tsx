import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"

interface ForecastProps {
  forecastData: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        mintemp_c: number
        condition: {
          text: string
          code: number
        }
      }
    }>
  }
}

export function Forecast({ forecastData }: ForecastProps) {
  // Function to determine which weather icon to display
  const getWeatherIcon = (code: number) => {
    // This is a simplified version - in a real app you would have more conditions
    if (code >= 1000 && code < 1003) {
      return <Sun className="h-8 w-8 text-yellow-500" />
    } else if (code >= 1003 && code < 1063) {
      return <Cloud className="h-8 w-8 text-gray-500" />
    } else if (code >= 1063 && code < 1200) {
      return <CloudRain className="h-8 w-8 text-blue-500" />
    } else {
      return <Cloud className="h-8 w-8 text-gray-500" />
    }
  }

  // Format date to display day of week
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-sky-900 dark:text-sky-100">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {forecastData.forecastday.map((day, index) => (
            <Card key={index} className="bg-white/50 dark:bg-slate-800/50 border-0">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="font-medium mb-2">{formatDate(day.date)}</div>
                {getWeatherIcon(day.day.condition.code)}
                <div className="mt-2 text-center">
                  <div className="font-medium">{Math.round(day.day.maxtemp_c)}°</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{Math.round(day.day.mintemp_c)}°</div>
                </div>
                <div className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400 line-clamp-1">
                  {day.day.condition.text}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
