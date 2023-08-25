import { Drawer } from "../../components/drawer";

export default function Layout() {
  return (
    <Drawer screenOptions={{headerShown:true}}>
      <Drawer.Screen 
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />

    </Drawer>
  );
}