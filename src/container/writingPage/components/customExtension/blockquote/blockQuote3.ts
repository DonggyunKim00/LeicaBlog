import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

interface BlockquoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockQuote3: {
      /**
       * Set a blockquote node
       */
      setBlockquote3: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote3: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote3: () => ReturnType;
    };
  }
}

const inputRegex = /^\s*>\s$/;

export const CustomBlockQuote3 = Node.create<BlockquoteOptions>({
  name: "blockquote3",

  addOptions() {
    return {
      HTMLAttributes: { class: "borderSquareQuote" },
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
      setBlockquote3:
        () =>
        ({ commands }) => {
          return commands.wrapIn(this.name);
        },
      toggleBlockquote3:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
      unsetBlockquote3:
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
