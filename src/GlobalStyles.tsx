import { Global } from "@mantine/core"
import regular from "./assets/fonts/GTWalsheimPro-Regular.woff2"
import oblique from "./assets/fonts/GTWalsheimPro-RegularOblique.woff2"
import medium from "./assets/fonts/GTWalsheimPro-Medium.woff2"
import bold from "./assets/fonts/GTWalsheimPro-Bold.woff2"
import black from "./assets/fonts/GTWalsheimPro-Black.woff2"

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => [
        {
          "@font-face": {
            fontFamily: "GT Walsheim",
            src: `url('${regular}') format("woff2")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "GT Walsheim",
            src: `url('${oblique}') format("woff2")`,
            fontWeight: 400,
            fontStyle: "oblique",
          },
        },
        {
          "@font-face": {
            fontFamily: "GT Walsheim",
            src: `url('${medium}') format("woff2")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "GT Walsheim",
            src: `url('${medium}') format("woff2")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "GT Walsheim",
            src: `url('${bold}') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "GT Walsheim",
            src: `url('${black}') format("woff2")`,
            fontWeight: 900,
            fontStyle: "normal",
          },
        },
        {
          "::selection": {
            background:
              theme.colors.indigo[theme.colorScheme === "light" ? 3 : 4],
          },
          "::-webkit-scrollbar": {
            width: 10,
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
            marginTop: 50,
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[6],
            borderRadius: 5,
          },
          "::-webkit-scrollbar-track": {
            marginTop: 50,
          },
          "::-webkit-scrollbar-thumb:window-inactive": {
            opacity: 0,
            diplay: "none",
          },
        },
      ]}
    />
  )
}
