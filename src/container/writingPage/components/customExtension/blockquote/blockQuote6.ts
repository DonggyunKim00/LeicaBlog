import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

interface BlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote6: {
      /**
       * Set a blockquote node
       */
      setBlockquote6: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote6: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote6: () => ReturnType;
    };
  }
}

const inputRegex = /^\s*>\s$/;

export const CustomBlockQuote6 = Node.create<BlockquoteOptions>({
  name: "blockquote6",

  addOptions() {
    return {
      HTMLAttributes: { class: "basicDarkQuote" },
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
      setBlockquote6:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote6:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote6:
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
