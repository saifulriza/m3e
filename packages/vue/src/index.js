// Components
import MButton from "./components/MButton.vue";
import MCheckbox from "./components/MCheckbox.vue";
import MSwitch from "./components/MSwitch.vue";
import MRadio from "./components/MRadio.vue";
import MRadioGroup from "./components/MRadioGroup.vue";
import MDialog from "./components/MDialog.vue";
import MSnackbar from "./components/MSnackbar.vue";
import MExpansionPanel from "./components/MExpansionPanel.vue";
import MTabs from "./components/MTabs.vue";
import MTab from "./components/MTab.vue";
import MMenu from "./components/MMenu.vue";
import MDrawer from "./components/MDrawer.vue";
import MTextField from "./components/MTextField.vue";
import MSelect from "./components/MSelect.vue";
import MSlider from "./components/MSlider.vue";
import MChip from "./components/MChip.vue";
import MSegmentedButton from "./components/MSegmentedButton.vue";
import MFab from "./components/MFab.vue";
import MIconButton from "./components/MIconButton.vue";
import MTooltip from "./components/MTooltip.vue";
import MStepper from "./components/MStepper.vue";
import MStep from "./components/MStep.vue";
import MCard from "./components/MCard.vue";
import MBadge from "./components/MBadge.vue";
import MAvatar from "./components/MAvatar.vue";
import MDivider from "./components/MDivider.vue";
import MProgressIndicator from "./components/MProgressIndicator.vue";
import MLoadingIndicator from "./components/MLoadingIndicator.vue";
import MAppBar from "./components/MAppBar.vue";
import MNavBar from "./components/MNavBar.vue";
import MNavBarItem from "./components/MNavBarItem.vue";
import MList from "./components/MList.vue";
import MListItem from "./components/MListItem.vue";
import MToolbar from "./components/MToolbar.vue";

export {
  MButton,
  MCheckbox,
  MSwitch,
  MRadio,
  MRadioGroup,
  MDialog,
  MSnackbar,
  MExpansionPanel,
  MTabs,
  MTab,
  MMenu,
  MDrawer,
  MTextField,
  MSelect,
  MSlider,
  MChip,
  MSegmentedButton,
  MFab,
  MIconButton,
  MTooltip,
  MStepper,
  MStep,
  MCard,
  MBadge,
  MAvatar,
  MDivider,
  MProgressIndicator,
  MLoadingIndicator,
  MAppBar,
  MNavBar,
  MNavBarItem,
  MList,
  MListItem,
  MToolbar,
};

// Plugin — registers all components globally
const allComponents = {
  MButton,
  MCheckbox,
  MSwitch,
  MRadio,
  MRadioGroup,
  MDialog,
  MSnackbar,
  MExpansionPanel,
  MTabs,
  MTab,
  MMenu,
  MDrawer,
  MTextField,
  MSelect,
  MSlider,
  MChip,
  MSegmentedButton,
  MFab,
  MIconButton,
  MTooltip,
  MStepper,
  MStep,
  MCard,
  MBadge,
  MAvatar,
  MDivider,
  MProgressIndicator,
  MLoadingIndicator,
  MAppBar,
  MNavBar,
  MNavBarItem,
  MList,
  MListItem,
  MToolbar,
};

export const M3eVue = {
  install(app) {
    for (const [name, component] of Object.entries(allComponents)) {
      app.component(name, component);
    }
  },
};

export default M3eVue;
