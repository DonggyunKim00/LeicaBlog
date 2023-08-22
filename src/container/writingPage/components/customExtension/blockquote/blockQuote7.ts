import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

interface BlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote7: {
      /**
       * Set a blockquote node
       */
      setBlockquote7: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote7: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote7: () => ReturnType;
    };
  }
}

const inputRegex = /^\s*>\s$/;

export const CustomBlockQuote7 = Node.create<BlockquoteOptions>({
  name: "blockquote7",

  addOptions() {
    return {
      HTMLAttributes: { class: "basicGrayQuote" },
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
      setBlockquote7:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote7:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote7:
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
