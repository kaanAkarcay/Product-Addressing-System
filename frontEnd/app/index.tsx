import { Text } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';


export default function Page(){
  return <Redirect href={'/(drawer)/home'}/>;
}