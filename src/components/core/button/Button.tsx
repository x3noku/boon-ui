import React, { useMemo } from 'react';
import {
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import colors, { ColorSchemeKey, colorSchemes } from '@styles/colors';
import Space from '@components/core/space/Space';
import sizes from '@styles/sizes';
import { darkenColor, setAlpha } from '@utils/colors';

enum Preset {
    Formal = 'formal',
    Casual = 'casual',
}

type TPreset = typeof Preset;

enum Mode {
    Contained = 'contained',
    Outlined = 'outlined',
    Blank = 'blank',
}

type TMode = typeof Mode;

export interface IButton {
    mode?: Mode;
    preset?: Preset;
    colorSchemeKey?: ColorSchemeKey;
    title: string;
    icon?: ImageSourcePropType;
    iconSize?: number;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?(event: GestureResponderEvent): void;
    onLongPress?(event: GestureResponderEvent): void;
}

const Button: React.FC<IButton> & { Preset: TPreset; Mode: TMode } = props => {
    const {
        mode = Mode.Contained,
        preset = Preset.Casual,
        colorSchemeKey = preset === Preset.Formal ? ColorSchemeKey.Blue : ColorSchemeKey.Green,
        title,
        icon,
        iconSize,
        disabled,
        onPress,
        onLongPress,
    } = props;
    const colorScheme = colorSchemes.get(colorSchemeKey);
    const textStyle = StyleSheet.flatten<TextStyle>(props.textStyle);
    const containerStyle = StyleSheet.flatten<ViewStyle>(props.containerStyle);

    const color =
        textStyle?.color?.toString() ||
        {
            [Preset.Formal]: {
                [Mode.Contained]: colorScheme.primary,
                [Mode.Outlined]: colorScheme.primary,
                [Mode.Blank]: colorScheme.primary,
            },
            [Preset.Casual]: {
                [Mode.Contained]: colors.WHITE,
                [Mode.Outlined]: colors.WHITE,
                [Mode.Blank]: colorScheme.primary,
            },
        }[preset][mode];
    const backgroundColor =
        containerStyle?.backgroundColor?.toString() ||
        {
            [Preset.Formal]: {
                [Mode.Contained]: colors.WHITE,
                [Mode.Outlined]: colors.WHITE,
                [Mode.Blank]: colorScheme.shadowed,
            },
            [Preset.Casual]: {
                [Mode.Contained]: colorScheme.primary,
                [Mode.Outlined]: colorScheme.primary,
                [Mode.Blank]: colorScheme.primary,
            },
        }[preset][mode];
    const borderColor = containerStyle?.borderColor?.toString() || color;

    const isPressed = useSharedValue(false);
    const activeBackgroundColor = useMemo<string>(
        () => setAlpha(darkenColor(backgroundColor), mode === Mode.Blank ? 0.16 : 1),
        [mode, backgroundColor],
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withSpring(
                isPressed.value ? activeBackgroundColor : setAlpha(backgroundColor, mode === Mode.Blank ? 0 : 1),
            ),
        };
    });

    return (
        <Animated.View
            style={[
                styles.wrapper,
                preset === Preset.Formal && styles.wrapper_preset_formal,
                preset === Preset.Casual && styles.wrapper_preset_casual,
                mode === Mode.Outlined && styles.wrapper_mode_outlined,
                containerStyle,
                styles.wrapper_property_padding,
                disabled && styles.wrapper_state_disabled,
                { borderColor },
                animatedStyle,
            ]}
        >
            <Pressable
                style={[
                    styles.wrapper__content,
                    preset === Preset.Formal && styles.wrapper__content_preset_formal,
                    preset === Preset.Casual && styles.wrapper__content_preset_casual,
                    // todo: merge and apply incoming paddings
                    !!containerStyle?.width && { width: '100%' },
                    !!containerStyle?.height && { height: '100%' },
                ]}
                onPress={onPress ?? onPress}
                onLongPress={onLongPress ?? onLongPress}
                onPressIn={() => {
                    isPressed.value = true;
                }}
                onPressOut={() => {
                    isPressed.value = false;
                }}
                disabled={disabled}
            >
                <Text style={[styles.content__text, textStyle, { color }]} selectable={false}>
                    {title}
                </Text>
                {!!title && icon && <Space mode={Space.Mode.Vertical} size={8} />}
                {icon && <Image source={icon} style={[styles.content__icon, !!iconSize && { width: iconSize }]} />}
            </Pressable>
        </Animated.View>
    );
};
Button.Preset = Preset;
Button.Mode = Mode;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    wrapper_preset_formal: {
        borderRadius: 24,
    },
    wrapper_preset_casual: {
        borderRadius: 16,
    },
    wrapper_mode_outlined: {
        borderWidth: 2,
    },
    wrapper_property_padding: {
        padding: 0,
        paddingStart: 0,
        paddingLeft: 0,
        paddingTop: 0,
        paddingEnd: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    wrapper_state_disabled: {
        opacity: 0.56,
    },
    wrapper__content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper__content_preset_formal: {
        paddingLeft: 20,
        paddingTop: 8,
        paddingRight: 20,
        paddingBottom: 8,
    },
    wrapper__content_preset_casual: {
        paddingLeft: 24,
        paddingTop: 12,
        paddingRight: 24,
        paddingBottom: 12,
    },
    content__text: {
        backgroundColor: colors.TRANSPARENT,
        fontSize: sizes.TEXT_MEDIUM,
        textAlign: 'center',
    },
    content__icon: {
        width: 24,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
});

export default Button;
