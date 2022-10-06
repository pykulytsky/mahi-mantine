import { Global } from "@mantine/core"
import regular from "./assets/fonts/GTWalsheimPro-Regular.woff2"
import oblique from "./assets/fonts/GTWalsheimPro-RegularOblique.woff2"
import medium from "./assets/fonts/GTWalsheimPro-Medium.woff2"
import bold from "./assets/fonts/GTWalsheimPro-Bold.woff2"
import black from "./assets/fonts/GTWalsheimPro-Black.woff2"
import regularMaru from "./assets/fonts/GTMaru-Regular.woff2"
import obliqueMaru from "./assets/fonts/GTMaru-Regular-Oblique.woff2"
import mediumMaru from "./assets/fonts/GTMaru-Medium.woff2"
import boldMaru from "./assets/fonts/GTMaru-Bold.woff2"
import blackMaru from "./assets/fonts/GTMaru-Black.woff2"

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
              theme.colors[theme.primaryColor][
                theme.colorScheme === "light" ? 3 : 4
              ],
          },
          "::-webkit-scrollbar": {
            width: 10,
            marginTop: 50,
            height: 0,
            zIndex: 0,
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[4],
            borderRadius: 5,
          },
          "::-webkit-scrollbar-thumb:window-inactive": {
            opacity: 0,
            diplay: "none",
          },
          ".ql-editor": {
            padding: "12px 16px 0 16px !important",
          },
          ".burger .burger-lines, .burger .burger-lines:after, .burger .burger-lines:before":
            {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[3]
                  : theme.black,
            },
        },
      ]}
    />
  )
}
