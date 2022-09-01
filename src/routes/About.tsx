import { ActionIcon, useMantineColorScheme, Title } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export default function About() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque.</Title>
    aaaa
    </>

  );
}
