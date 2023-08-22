import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

interface BlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote2: {
      /**
       * Set a blockquote node
       */
      setBlockquote2: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote2: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote2: () => ReturnType;
    };
  }
}

const inputRegex = /^\s*>\s$/;

export const CustomBlockQuote2 = Node.create<BlockquoteOptions>({
  name: "blockquote2",

  addOptions() {
    return {
      HTMLAttributes: { class: "openEndQuoteDark" },
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
      setBlockquote2:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote2:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote2:
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
