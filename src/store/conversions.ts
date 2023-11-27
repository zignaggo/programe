
// Hour
export const hour_to_seconds = (hour: number) => {
    return hour * 3600
}
export const hour_to_minutes = (hour: number) => {
    return hour * 60
}

// Minutes
export const minutes_to_hour = (minutes: number) => {
    return minutes / 60
}
export const minutes_to_seconds = (seconds: number) => {
    return seconds * 60
}

// Seconds
export const seconds_to_hour = (seconds: number) => {
    return seconds / 3600
}
export const seconds_to_minutes = (minutes: number) => {
    return minutes / 60
}

export const getTypeConversion = (type: 'hour' | 'min' |'sec', number: number) => {
    switch(type) {
        case 'hour': 
        return hour_to_seconds(number)
        case 'min': 
        return minutes_to_seconds(number)
        case 'sec': 
        return number
    }
}