import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { HomeIcon } from "../components/Icons";
import Screen from "../components/Screen";

export default function About() {
    return (
        <Screen>
            <Text style={{ color: '#ffffff' }}>About this app</Text>
            <Text style={{ color: '#ffffff' }}>This app is built using React Native and Expo Router.</Text>

        </Screen>

    );
}