const Applet = imports.ui.applet;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;

class LuckyDayApplet extends Applet.TextApplet {
    constructor(metadata, orientation, panelHeight, instanceId) {
        super(orientation, panelHeight, instanceId);
        this.set_applet_tooltip("Checks if today is a Jewish or Islamic lucky day");

        this._scriptPath = GLib.build_filenamev([
            GLib.get_home_dir(),
            ".local",
            "share",
            "cinnamon",
            "applets",
            "lucky-day@n1",
            "lucky-day.py"
        ]);

        this._update();
    }

    _update() {
        try {
            let [ok, stdout, stderr, status] = GLib.spawn_command_line_sync(`python3 "${this._scriptPath}"`);
            if (ok && status === 0) {
                let output = imports.byteArray.toString(stdout).trim();
                this.set_applet_label(output || "-");
            } else {
                this.set_applet_label("Err");
            }
        } catch (e) {
            this.set_applet_label("Err");
        }

        // Refresh every 5 minutes
        Mainloop.timeout_add_seconds(300, () => {
            this._update();
            return false;  // Run once
        });
    }
}

function main(metadata, orientation, panelHeight, instanceId) {
    return new LuckyDayApplet(metadata, orientation, panelHeight, instanceId);
}

