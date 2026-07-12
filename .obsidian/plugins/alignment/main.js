const { Plugin, Menu, PluginSettingTab, Setting } = require('obsidian');

// 1. Define default settings
const DEFAULT_SETTINGS = {
    enableJustify: false
};

// 2. Create the Settings Tab UI
class AlignmentSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Plugin Settings' });

        new Setting(containerEl)
            .setName('Enable Justify')
            .setDesc('Add "Justify" to the context menu and alignment picker.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enableJustify)
                .onChange(async (value) => {
                    this.plugin.settings.enableJustify = value;
                    await this.plugin.saveSettings();
                }));
    }
}

module.exports = class AlignmentPlugin extends Plugin {
    async onload() {
        // Load settings
        await this.loadSettings();

        // Add the settings tab
        this.addSettingTab(new AlignmentSettingTab(this.app, this));

        // --- Context Menu Registration ---
        this.registerEvent(
            this.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addSeparator();

                menu.addItem((item) => {
                    item
                        .setTitle("Align")
                        .setIcon("align-center")
                        .onClick(() => {
                            const cursor = editor.getCursor();
                            const coords = editor.coordsAtPos(cursor);
                            this.showAlignmentPicker(editor, coords);
                        });
                });

                menu.addItem((item) => {
                    item
                        .setTitle("Reset Align")
                        .setIcon("trash")
                        .onClick(() => this.applyAlignment(editor, "clear"));
                });
            })
        );

        // --- Command Palette Registration ---
        this.addCommand({
            id: 'align-center',
            name: 'Center Align',
            editorCallback: (editor) => this.applyAlignment(editor, "center")
        });

        this.addCommand({
            id: 'align-right',
            name: 'Right Align',
            editorCallback: (editor) => this.applyAlignment(editor, "right")
        });

        // Add Justify Command (conditional or always available)
        this.addCommand({
            id: 'align-justify',
            name: 'Justify Align',
            editorCallback: (editor) => this.applyAlignment(editor, "justify")
        });

        this.addCommand({
            id: 'align-reset',
            name: 'Reset Align',
            editorCallback: (editor) => this.applyAlignment(editor, "clear")
        });
    }

    // Helper functions for data persistence
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    showAlignmentPicker(editor, coords) {
        const menu = new Menu();
        const options = [
            { title: "Center", icon: "align-center", value: "center" },
            { title: "Right", icon: "align-right", value: "right" },
        ];

        // Only add Justify if enabled in settings
        if (this.settings.enableJustify) {
            options.push({ title: "Justify", icon: "align-justify", value: "justify" });
        }

        options.forEach(opt => {
            menu.addItem((item) => {
                item
                    .setTitle(opt.title)
                    .setIcon(opt.icon)
                    .onClick(() => this.applyAlignment(editor, opt.value));
            });
        });

        menu.showAtPosition({ x: coords.left, y: coords.top });
    }

    applyAlignment(editor, type) {
        const selection = editor.getSelection();
        if (!selection) return;

        const alignRegex = /<.*?>(.*?)<\/.*?>/gs;

        if (type === "clear") {
            const cleaned = selection.replace(alignRegex, '$1');
            editor.replaceSelection(cleaned);
        } else {
            const cleanSelection = selection.replace(alignRegex, '$1');
            const replacement = `<${type}>${cleanSelection}</${type}>`;
            editor.replaceSelection(replacement);
        }
    }
};