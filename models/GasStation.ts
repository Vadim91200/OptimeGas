type GasStation = {
    address: { street_line: string, city_line: string },
    age: number,
    price: number,
    distance: number,
    fuels: string,
    location?: {
        latitude?: number,
        longitude?: number
    },
}
export { GasStation }