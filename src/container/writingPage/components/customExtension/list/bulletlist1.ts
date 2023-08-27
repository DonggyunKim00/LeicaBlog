import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

export interface BulletListOptions {
  itemTypeName: string;
  HTMLAttributes: Record<string, any>;
  keepMarks: boolean;
  keepAttributes: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bulletList1: {
      /**
       * Toggle a bullet list
       */
      toggleBulletList1: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*([-+*])\s$/;

export const CustomBulletList1 = Node.create<BulletListOptions>({
  name: "bulletList1",

  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: { class: "bulletList" },
      keepMarks: false,
      keepAttributes: false,
    };
  },

  group: "block list",

  content() {
    return `${this.options.itemTypeName}+`;
  },

  parseHTML() {
    return [{ tag: "ul" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "ul",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleBulletList1:
        () =>
        ({ commands, chain }) => {
          if (this.options.keepAttributes) {
            return chain()
              .toggleList(
                this.name,
                this.options.itemTypeName,
                this.options.keepMarks
              )
              .updateAttributes(
                ListItem.name,
                this.editor.getAttributes(TextStyle.name)
              )
              .run();
          }
          return commands.toggleList(
            this.name,
            this.options.itemTypeName,
            this.options.keepMarks
          );
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList(),
    };
  },

  addInputRules() {
    let inputRule = wrappingInputRule({
      find: inputRegex,
      type: this.type,
    });

    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: inputRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: () => {
          return this.editor.getAttributes(TextStyle.name);
        },
        editor: this.editor,
      });
    }
    return [inputRule];
  },
});
