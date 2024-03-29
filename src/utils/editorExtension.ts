import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Strike from "@tiptap/extension-strike";
import Image from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontSize from "tiptap-extension-font-size";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import {
  CustomHorizontalRule1,
  CustomHorizontalRule2,
  CustomHorizontalRule3,
  CustomHorizontalRule4,
} from "@/container/writingPage/components/customExtension/horizontalRule";

import {
  CustomBlockQuote1,
  CustomBlockQuote2,
  CustomBlockQuote3,
  CustomBlockQuote4,
  CustomBlockQuote5,
  CustomBlockQuote6,
  CustomBlockQuote7,
} from "@/container/writingPage/components/customExtension/blockquote";

import {
  CustomBulletList1,
  CustomBulletList2,
  CustomBulletList3,
} from "@/container/writingPage/components/customExtension/list";
import {
  ImageResize,
  VideoEmbed,
} from "@/container/writingPage/components/customExtension/file";

export const extension = [
  StarterKit,
  ListItem,
  Document,
  Paragraph,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  TextAlign.configure({
    types: ["heading", "paragraph", "list"],
  }),
  Placeholder.configure({
    placeholder: "내용을 입력하세요...",
  }),
  TextStyle,
  FontFamily,
  Color,
  Highlight.configure({ multicolor: true }),
  FontSize,
  Underline,
  Strike,
  Image,
  Youtube,
  CustomHorizontalRule1,
  CustomHorizontalRule2,
  CustomHorizontalRule3,
  CustomHorizontalRule4,
  CustomBlockQuote1,
  CustomBlockQuote2,
  CustomBlockQuote3,
  CustomBlockQuote4,
  CustomBlockQuote5,
  CustomBlockQuote6,
  CustomBlockQuote7,
  CustomBulletList1,
  CustomBulletList2,
  CustomBulletList3,
  ImageResize,
  VideoEmbed,
  Link.configure({
    autolink: false,
    linkOnPaste: false,
    HTMLAttributes: {
      class: "custom-HyperLink",
    },
  }),
];
