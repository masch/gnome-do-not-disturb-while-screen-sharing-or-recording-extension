import { ExtensionPreferences } from "gnomejs://prefs.js";

import Adw from "@gi-ts/adw1";
import Gtk from "@gi-ts/gtk4";

import { SettingsManager, SettingsPath } from "./settings-manager";

export default class Preferences extends ExtensionPreferences {
  fillPreferencesWindow(window: Adw.PreferencesWindow) {
    const page = new Adw.PreferencesPage();

    const settings = new SettingsManager(this.getSettings(SettingsPath));

    const group = new Adw.PreferencesGroup({
      title: "Automatic Do Not Disturb Mode",
      description:
        "Select what events should cause Do Not Disturb mode to be switched on automatically",
    });

    this.setupScreenRecording(settings, group);
    this.setupScreenSharing(settings, group);

    page.add(group);

    const soundGroup = new Adw.PreferencesGroup({
      title: "Sound",
      description: "Configure notification sound behavior during Do Not Disturb",
    });

    this.setupMuteSounds(settings, soundGroup);

    page.add(soundGroup);
    window.add(page);
  }

  setupScreenRecording(settings: SettingsManager, group: Adw.PreferencesGroup) {
    const row = new Adw.ActionRow({
      title: "Screen Recording",
    });

    const toggle = new Gtk.Switch({
      active: settings.getShouldDndOnScreenRecording(),
      valign: Gtk.Align.CENTER,
    });

    toggle.connect("state-set", (_, state) => {
      settings.setShouldDndOnScreenRecording(state);

      return false;
    });

    row.add_suffix(toggle);
    row.activatable_widget = toggle;

    group.add(row);
  }

  setupScreenSharing(settings: SettingsManager, group: Adw.PreferencesGroup) {
    const row = new Adw.ActionRow({
      title: "Screen Sharing",
    });

    const toggle = new Gtk.Switch({
      active: settings.getShouldDndOnScreenSharing(),
      valign: Gtk.Align.CENTER,
    });

    toggle.connect("state-set", (_, state) => {
      settings.setShouldDndOnScreenSharing(state);

      return false;
    });

    row.add_suffix(toggle);
    row.activatable_widget = toggle;

    group.add(row);
  }

  setupMuteSounds(settings: SettingsManager, group: Adw.PreferencesGroup) {
    const row = new Adw.ActionRow({
      title: "Mute Notification Sounds",
      subtitle: "Also mute notification sounds when Do Not Disturb is automatically activated",
    });

    const toggle = new Gtk.Switch({
      active: settings.getShouldMuteSoundsOnDnd(),
      valign: Gtk.Align.CENTER,
    });

    toggle.connect("state-set", (_, state) => {
      settings.setShouldMuteSoundsOnDnd(state);

      return false;
    });

    row.add_suffix(toggle);
    row.activatable_widget = toggle;

    group.add(row);
  }
}
