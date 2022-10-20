import { UnstyledButton, Checkbox, Text, Avatar } from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import { useStyles } from "./UserCeckbox.styles"

interface UserCheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?(checked: boolean): void
  name?: string
  avatar?: string
  isCurrentUser: boolean
}

export default function UserCheckbox({
  checked,
  defaultChecked,
  onChange,
  name,
  className,
  avatar,
  isCurrentUser,
  ...others
}: UserCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof UserCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  })

  const { classes, cx } = useStyles({ checked: value })

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      <Avatar size="sm" src={avatar} />
      <div className={classes.body}>
        <Text weight={300} size="sm" sx={{ lineHeight: 1 }}>
          {isCurrentUser ? "Assign yourself" : name}
        </Text>
      </div>

      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        styles={{ input: { cursor: "pointer" } }}
      />
    </UnstyledButton>
  )
}
