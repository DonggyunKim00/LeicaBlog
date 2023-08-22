import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

export interface BlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote1: {
      /**
       * Set a blockquote node
       */
      setBlockquote1: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote1: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote1: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*>\s$/;

export const CustomBlockQuote1 = Node.create<BlockquoteOptions>({
  name: "blockquote1",

  addOptions() {
    return {
      HTMLAttributes: { class: "openEndQuoteGray" },
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
      setBlockquote1:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote1:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote1:
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
