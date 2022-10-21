import {
  Group,
  TextInput,
  Tooltip,
  Button,
  Transition,
  CheckIcon,
  Container,
  Text,
} from "@mantine/core"
import { useClipboard, useLocalStorage, useToggle } from "@mantine/hooks"
import { useStyles } from "./ProjectShareComponent.styles"
import { useMatch } from "@tanstack/react-location"
import { Link } from "../../icons"
import { generateInvitationCode } from "../../../api/projects.api"

export default function LinkPanel() {
  const {
    params: { projectID },
  } = useMatch()

  const clipboard = useClipboard()
  const { classes } = useStyles()

  const [code, setCode] = useLocalStorage<string>({
    key: `project_${projectID}_invite_code`,
    defaultValue: "",
  })
  const [isGenerating, toggleGenerating] = useToggle()
  const baseUrl = window.location
  const url = baseUrl.protocol + "//" + baseUrl.host + "/app?share="

  function generateCode() {
    toggleGenerating()
    generateInvitationCode(Number(projectID))
      .then((res) => {
        setCode(res.code)
        toggleGenerating()
      })
      .catch(() => {
        toggleGenerating()
      })
  }

  return (
    <Container>
      <Text my="sm">
        Share this link to invite new people to your project, this link is
        avaliable for <Text color="red">24 hours.</Text>
      </Text>
      {code ? (
        <Group spacing={0} noWrap mt="md">
          <TextInput
            value={`${url}${code}`}
            readOnly
            className={classes.input}
          />
          <Tooltip
            label="Link copied!"
            offset={5}
            position="bottom"
            radius="xl"
            transition="slide-down"
            transitionDuration={100}
            opened={clipboard.copied}
          >
            <Button
              leftIcon={
                clipboard.copied ? (
                  <Transition
                    mounted={clipboard.copied}
                    transition="slide-up"
                    duration={400}
                    timingFunction="ease"
                  >
                    {(styles) => (
                      <CheckIcon
                        style={styles}
                        width={10}
                        height={10}
                        color="green"
                      />
                    )}
                  </Transition>
                ) : undefined
              }
              onClick={() => clipboard.copy(`${url}${code}`)}
              className={classes.button}
            >
              Share
            </Button>
          </Tooltip>
        </Group>
      ) : (
        <Button
          loading={isGenerating}
          onClick={generateCode}
          fullWidth
          leftIcon={<Link size={20} />}
        >
          Generate invitation link
        </Button>
      )}
    </Container>
  )
}
