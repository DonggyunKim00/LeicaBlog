import { Component, FC, ReactElement } from "react";
import { mergeAttributes, nodeInputRule, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageResizeComponent from "./ImageResizeComponent";
import Image from "@tiptap/extension-image";

export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
  resizeIcon: any;
}
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageResize: {
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string | number;
        height?: string | number;
        draggable?: boolean;
        id?: string;
        videos?: boolean;
      }) => ReturnType;
    };
  }
}

export const inputRegex = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
export const ImageResize = Image.extend<ImageOptions>({
  name: "imageResize",

  addOptions() {
    return {
      inline: true,
      allowBase64: true,
      HTMLAttributes: {},
      resizeIcon: "⊙",
    };
  },
  addAttributes() {
    return {
      src: {
        default: "",
        renderHTML: (attributes) => {
          return {
            src: attributes.src,
          };
        },
      },
      width: {
        default: "550px",
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: "550px",
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
      draggable: {
        default: true,
        renderHTML: (attributes) => {
          return {};
        },
      },
      id: {
        default: "center",
        renderHTML: (attributes) => {
          return { id: attributes.id };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "file-resizer",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "file-resizer",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent);
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title, height, width, draggable, id] = match;
          return { src, alt, title, height, width, draggable, id };
        },
      }),
    ];
  },
});
