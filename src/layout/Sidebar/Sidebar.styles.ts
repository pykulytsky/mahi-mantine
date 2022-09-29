import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
  navbar: {
    height: "98vh",
    borderRadius: theme.radius.lg,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    border: "none",
    position: "fixed",
    margin: 8,
    top: 0,
    zIndex: 100,
  },

  header: {
    height: "3vh",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  mainSection: {
    overflow: "auto",
    height: "80vh",
    padding: "0 6px",
    "::-webkit-scrollbar": {
      width: 0,
    },
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingRight: theme.spacing.sm,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
}))
