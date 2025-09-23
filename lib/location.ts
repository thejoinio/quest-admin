/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { restCountries } from "./countries";

export async function getCountries() {
    try {
        const url = "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags,idd";
        const response = (await axios.get(`${url}`)).data;

        response.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });

        return response;
    } catch (error: any) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
        return restCountries;
    }
}

export function getCountryNameByCca2(code: string, countries = restCountries): string | null {
    const match = countries.find(
        (country) => country.cca2.toUpperCase() === code.toUpperCase()
    );

    return match ? match.name.common : null;
}