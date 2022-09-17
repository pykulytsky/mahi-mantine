import {
  Grid,
  useMantineTheme,
  createStyles,
  Box,
  Container,
  Title,
} from "@mantine/core"
import { ProjectEdit } from "../../../types"

const useStyles = createStyles((theme) => ({
  color: {
    height: 30,
    width: 30,
    borderRadius: theme.radius.xl,
    transition: ".2s all linear",
    cursor: "pinter",

    "&:hover": {
      transform: "scale(1.1)",
      border: `2px solid ${theme.colors.gray[7]}`,
    },
  },
  colorPicked: {
    transform: "scale(1.1)",
    border: `2px solid ${theme.colors.gray[7]}`,
  },
  col: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 10,
    cursor: "pointer",
  },
}))

type ColorPickerProps = {
  color?: string
  updateProject: (project: ProjectEdit) => void
}

export default function ColorPicker(props: ColorPickerProps) {
  const theme = useMantineTheme()
  const { classes, cx } = useStyles()

  function colors(): string[] {
    let arr = []
    for (let color in theme.colors) {
      if (color !== "dark" && color !== "grape") arr.push(color)
    }
    return arr
  }

  function onColorChange(color: string): void {
    props.updateProject({ accent_color: color })
  }

  return (
    <Container p={0} mb="sm" mt="sm">
      <Title m="sm" order={5}>
        Pick a color
      </Title>
      <Grid gutter={10}>
        {colors().map((color, index) => (
          <Grid.Col key={index} className={classes.col} span={2}>
            <Box
              onClick={() => {
                onColorChange(color)
              }}
              m={0}
              p={0}
              sx={{
                backgroundColor: theme.colors[color][9],
              }}
              className={cx(classes.color, {
                [classes.colorPicked]: color === props.color,
              })}
            ></Box>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}
