export const config = {
    // Weather
    weatherCycleTime: 60000 * 5, // 5 Minutes
    weatherCycle: [
        0, // Extra sunny
        0, // Extra sunny
        0, // Extra sunny
        0, // Extra sunny
        0, // Extra sunny
        0, // Extra sunny
        0, // Extra sunny
        1, // Clear
        2, // Clouds
        2, // Clouds
        4, // Foggy
        5, // Overcast
        8, // Light Rain
        6, // Rain
        6, // Rain
        7, // Thunder
        7, // Thunder
        6, // Rain
        8, // Light Rain
        5, // Overcast
        2, // Clouds
        1, // Clear
        1, // Clear
    ],
    // Time
    minutesPerMinute: 1, // Used to set the Time Scale of the server for the minute. 1 Minute = 30 Minutes.
    hoursPerSixtyMinutes: 1, // Used to set the Time Scale of the server for the hour.
};
