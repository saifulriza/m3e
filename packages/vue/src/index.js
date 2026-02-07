// Components
import MAppBar from "./components/MAppBar.vue";
import MAutocomplete from "./components/MAutocomplete.vue";
import MAvatar from "./components/MAvatar.vue";
import MBadge from "./components/MBadge.vue";
import MButton from "./components/MButton.vue";
import MButtonGroup from "./components/MButtonGroup.vue";
import MCard from "./components/MCard.vue";
import MCheckbox from "./components/MCheckbox.vue";
import MChip from "./components/MChip.vue";
import MDialog from "./components/MDialog.vue";
import MDivider from "./components/MDivider.vue";
import MDrawer from "./components/MDrawer.vue";
import MExpansionPanel from "./components/MExpansionPanel.vue";
import MFab from "./components/MFab.vue";
import MFabMenu from "./components/MFabMenu.vue";
import MFabMenuItem from "./components/MFabMenuItem.vue";
import MHeading from "./components/MHeading.vue";
import MIcon from "./components/MIcon.vue";
import MIconButton from "./components/MIconButton.vue";
import MList from "./components/MList.vue";
import MListItem from "./components/MListItem.vue";
import MLoadingIndicator from "./components/MLoadingIndicator.vue";
import MMenu from "./components/MMenu.vue";
import MNavBar from "./components/MNavBar.vue";
import MNavBarItem from "./components/MNavBarItem.vue";
import MNavMenu from "./components/MNavMenu.vue";
import MNavMenuItem from "./components/MNavMenuItem.vue";
import MNavRail from "./components/MNavRail.vue";
import MNavRailItem from "./components/MNavRailItem.vue";
import MOption from "./components/MOption.vue";
import MPaginator from "./components/MPaginator.vue";
import MProgressIndicator from "./components/MProgressIndicator.vue";
import MRadio from "./components/MRadio.vue";
import MRadioGroup from "./components/MRadioGroup.vue";
import MSegmentedButton from "./components/MSegmentedButton.vue";
import MSelect from "./components/MSelect.vue";
import MShape from "./components/MShape.vue";
import MSlideGroup from "./components/MSlideGroup.vue";
import MSlider from "./components/MSlider.vue";
import MSnackbar from "./components/MSnackbar.vue";
import MSplitButton from "./components/MSplitButton.vue";
import MStep from "./components/MStep.vue";
import MStepper from "./components/MStepper.vue";
import MSwitch from "./components/MSwitch.vue";
import MTab from "./components/MTab.vue";
import MTabs from "./components/MTabs.vue";
import MTextField from "./components/MTextField.vue";
import MToc from "./components/MToc.vue";
import MToolbar from "./components/MToolbar.vue";
import MTooltip from "./components/MTooltip.vue";

export {
  MAppBar,
  MAutocomplete,
  MAvatar,
  MBadge,
  MButton,
  MButtonGroup,
  MCard,
  MCheckbox,
  MChip,
  MDialog,
  MDivider,
  MDrawer,
  MExpansionPanel,
  MFab,
  MFabMenu,
  MFabMenuItem,
  MHeading,
  MIcon,
  MIconButton,
  MList,
  MListItem,
  MLoadingIndicator,
  MMenu,
  MNavBar,
  MNavBarItem,
  MNavMenu,
  MNavMenuItem,
  MNavRail,
  MNavRailItem,
  MOption,
  MPaginator,
  MProgressIndicator,
  MRadio,
  MRadioGroup,
  MSegmentedButton,
  MSelect,
  MShape,
  MSlideGroup,
  MSlider,
  MSnackbar,
  MSplitButton,
  MStep,
  MStepper,
  MSwitch,
  MTab,
  MTabs,
  MTextField,
  MToc,
  MToolbar,
  MTooltip,
};

// Plugin — registers all components globally
const allComponents = {
  MAppBar,
  MAutocomplete,
  MAvatar,
  MBadge,
  MButton,
  MButtonGroup,
  MCard,
  MCheckbox,
  MChip,
  MDialog,
  MDivider,
  MDrawer,
  MExpansionPanel,
  MFab,
  MFabMenu,
  MFabMenuItem,
  MHeading,
  MIcon,
  MIconButton,
  MList,
  MListItem,
  MLoadingIndicator,
  MMenu,
  MNavBar,
  MNavBarItem,
  MNavMenu,
  MNavMenuItem,
  MNavRail,
  MNavRailItem,
  MOption,
  MPaginator,
  MProgressIndicator,
  MRadio,
  MRadioGroup,
  MSegmentedButton,
  MSelect,
  MShape,
  MSlideGroup,
  MSlider,
  MSnackbar,
  MSplitButton,
  MStep,
  MStepper,
  MSwitch,
  MTab,
  MTabs,
  MTextField,
  MToc,
  MToolbar,
  MTooltip,
};

export const M3eVue = {
  install(app) {
    for (const [name, component] of Object.entries(allComponents)) {
      app.component(name, component);
    }
  },
};

export default M3eVue;
