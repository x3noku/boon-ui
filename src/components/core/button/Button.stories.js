import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import Button from '@components/core/button/Button';
import Center from '@components/utils/center/Center';
import colors, { ColorSchemeKey } from '@styles/colors';

const colorSchemesKeys = {
    [ColorSchemeKey.Green]: ColorSchemeKey.Green,
    [ColorSchemeKey.Blue]: ColorSchemeKey.Blue,
    [ColorSchemeKey.Red]: ColorSchemeKey.Red,
};

storiesOf('Button', module)
    .addDecorator(getStory => <Center style={{ backgroundColor: colors.BLUE_PALE }}>{getStory()}</Center>)
    .add('Formal Contained', () => (
        <Button
            mode={Button.Mode.Contained}
            preset={Button.Preset.Formal}
            title={text('Text', 'Formal Button')}
            colorSchemeKey={select('Color Scheme', colorSchemesKeys, ColorSchemeKey.Blue)}
            onPress={action('clicked-text')}
        />
    ))
    .add('Formal Outlined', () => (
        <Button
            mode={Button.Mode.Outlined}
            preset={Button.Preset.Formal}
            title={text('Text', 'Formal Button')}
            colorSchemeKey={select('Color Scheme', colorSchemesKeys, ColorSchemeKey.Blue)}
            onPress={action('clicked-text')}
        />
    ))
    .add('Formal Blank', () => (
        <Button
            mode={Button.Mode.Blank}
            preset={Button.Preset.Formal}
            title={text('Text', 'Formal Button')}
            colorSchemeKey={select('Color Scheme', colorSchemesKeys, ColorSchemeKey.Blue)}
            onPress={action('clicked-text')}
        />
    ))
    .add('Casual Contained', () => (
        <Button
            mode={Button.Mode.Contained}
            preset={Button.Preset.Casual}
            title={text('Text', 'Casual Button')}
            colorSchemeKey={select('Color Scheme', colorSchemesKeys, ColorSchemeKey.Green)}
            onPress={action('clicked-text')}
        />
    ))
    .add('Casual Outlined', () => (
        <Button
            mode={Button.Mode.Outlined}
            preset={Button.Preset.Casual}
            title={text('Text', 'Casual Button')}
            colorSchemeKey={select('Color Scheme', colorSchemesKeys, ColorSchemeKey.Green)}
            onPress={action('clicked-text')}
        />
    ))
    .add('Casual Blank', () => (
        <Button
            mode={Button.Mode.Blank}
            preset={Button.Preset.Casual}
            title={text('Text', 'Casual Button')}
            colorSchemeKey={select('Color Scheme', colorSchemesKeys, ColorSchemeKey.Green)}
            onPress={action('clicked-text')}
        />
    ));
