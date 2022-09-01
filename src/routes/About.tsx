import { useMantineColorScheme, Title, Button } from '@mantine/core';
import ColorSchemeSwitch from '../components/core/ColorSchemeSwitch';

export default function About() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
    <ColorSchemeSwitch />
    <Button>test</Button>
    <Button variant='default'>test</Button>
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
