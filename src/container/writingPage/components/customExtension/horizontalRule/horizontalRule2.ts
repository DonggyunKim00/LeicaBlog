import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

interface HorizontalRuleOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    horizontalRule2: {
      /**
       * Add a horizontal rule
       */
      setHorizontalRule2: () => ReturnType;
    };
  }
}

export const CustomHorizontalRule2 = Node.create<HorizontalRuleOptions>({
  name: "horizontalRule2",

  addOptions() {
    return {
      HTMLAttributes: { class: "hrDivWhiteSquare" },
    };
  },

  group: "block",

  parseHTML() {
    return [{ tag: "hr" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setHorizontalRule2:
        () =>
        ({ chain }) => {
          return (
            chain()
              .insertContent({ type: this.name })
              // set cursor after horizontal rule
              .command(({ tr, dispatch }) => {
                if (dispatch) {
                  const { $to } = tr.selection;
                  const posAfter = $to.end();

                  if ($to.nodeAfter) {
                    tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                  } else {
                    // add node after horizontal rule if it’s the end of the document
                    const node =
                      $to.parent.type.contentMatch.defaultType?.create();

                    if (node) {
                      tr.insert(posAfter, node);
                      tr.setSelection(TextSelection.create(tr.doc, posAfter));
                    }
                  }

                  tr.scrollIntoView();
                }

                return true;
              })
              .run()
          );
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type,
      }),
    ];
  },
});
