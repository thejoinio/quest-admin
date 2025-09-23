import localFont from 'next/font/local';

export const fontTSB = localFont({src: [
    {
        path: "./TSB-Regular-Buch.otf",
        style: "normal",
        weight: "400"
    },
    {
        path: "./TSB-Medium-Halbfett.otf",
        style: "normal",
        weight: "500"
    },
    {
        path: "./TSB-Semibold-Dreiviertelfett.otf",
        style: "normal",
        weight: "600"
    },
    {
        path: "./TSB-Bold-Fett.otf",
        style: "normal",
        weight: "700"
    },
],
preload: true,
variable: "--font-tsb",

})
