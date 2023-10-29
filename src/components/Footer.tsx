import styles from "../styles/Footer.module.scss";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export const Footer = () => {
  return (
    <NavigationMenu.Root className={`${styles.navigation_menu}`}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className={`${styles.navigation_menu__link}`}
            href="https://github.com/jonasfroeller/bookmark-organizer"
          >
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
