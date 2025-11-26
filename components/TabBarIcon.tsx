import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused?: boolean;
}) => {
  return (
    <FontAwesome
      size={props.focused === true ? 35 : 28}
      style={[styles.tabBarIcon, { marginTop: props.focused === true ? -20 : 0 }]}
      {...props}
    />
  );
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
