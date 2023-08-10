import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

interface BlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote5: {
      /**
       * Set a blockquote node
       */
      setBlockquote5: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote5: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote5: () => ReturnType;
    };
  }
}

const inputRegex = /^\s*>\s$/;

export const CustomBlockQuote5 = Node.create<BlockquoteOptions>({
  name: "blockquote5",

  addOptions() {
    return {
      HTMLAttributes: { class: "balloonQuote" },
    };
  },

  content: "block+",

  group: "block",

  defining: true,

  parseHTML() {
    return [{ tag: "blockquote" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBlockquote5:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote5:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote5:
        () =>
        ({ commands }) => {
          return commands.lift(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});
