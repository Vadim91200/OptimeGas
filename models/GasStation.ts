type GasStation = {
    name: string,
    address: { street_line: string, city_line: string },
    price: number,
    distance: number,
    fuels: string,
    location?: {
        latitude?: number,
        longitude?: number
    },
}
export { GasStation }