import Gio from "@gi-ts/gio2";

const showBannersSetting = "show-banners";
const schemaId = "org.gnome.desktop.notifications";

const eventSoundsSetting = "event-sounds";
const soundSchemaId = "org.gnome.desktop.sound";

export class DoNotDisturbManager {
  private _settings: Gio.Settings | null = null;
  private _soundSettings: Gio.Settings | null = null;
  private _previousEventSoundsValue: boolean | null = null;

  private getSettings() {
    if (!this._settings) {
      this._settings = new Gio.Settings({ schema_id: schemaId });
    }

    return this._settings;
  }

  private getSoundSettings() {
    if (!this._soundSettings) {
      this._soundSettings = new Gio.Settings({ schema_id: soundSchemaId });
    }

    return this._soundSettings;
  }

  turnDndOn(muteSounds: boolean) {
    this.getSettings().set_boolean(showBannersSetting, false);

    if (muteSounds) {
      this._previousEventSoundsValue = this.getSoundSettings().get_boolean(eventSoundsSetting);
      this.getSoundSettings().set_boolean(eventSoundsSetting, false);
    }
  }

  turnDndOff(muteSounds: boolean) {
    this.getSettings().set_boolean(showBannersSetting, true);

    if (muteSounds && this._previousEventSoundsValue !== null) {
      this.getSoundSettings().set_boolean(eventSoundsSetting, this._previousEventSoundsValue);
      this._previousEventSoundsValue = null;
    }
  }

  dispose() {
    this._settings = null;
    this._soundSettings = null;
    this._previousEventSoundsValue = null;
  }
}
