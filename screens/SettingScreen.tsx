import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';

export default function SettingsScreen () {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: 'white' }}>
      <Text>
        Dark mode
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
      />
    </View>
  );
};