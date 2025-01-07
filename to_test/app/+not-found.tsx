import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4 text-gray-800">¡Oops!</Text>
      <Text className="text-lg text-gray-600 mb-6">Esta página no existexd.</Text>
      <Link href="/" className="bg-blue-500 px-6 py-3 rounded-lg">
        <Text className="text-white text-lg">Volver al inicio</Text>
      </Link>
    </View>
  );
}
