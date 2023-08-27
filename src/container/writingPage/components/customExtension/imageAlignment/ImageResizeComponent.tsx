/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import styled from "styled-components";

const ImageResizeComponent = (props: any) => {
  const handler = (mouseDownEvent: React.MouseEvent<HTMLImageElement>) => {
    const parent = (mouseDownEvent.target as HTMLElement).closest(
      ".image-resizer"
    );
    const image = parent?.querySelector("img.postimage") ?? null;
    if (image === null) return;
    const startSize = { x: image.clientWidth, y: image.clientHeight };
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      props.updateAttributes({
        width: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        height: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      });
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };
  return (
    <NodeViewWrapper className="image-resizer">
      {props.extension.options.useFigure ? (
        <>
          <PostImage
            {...props.node.attrs}
            src={props.node.attrs.src}
            className="postimage"
            contentEditable="true"
          />
          <div className="resize-trigger" onMouseDown={handler}>
            {props.extension.options.resizeIcon}
          </div>
        </>
      ) : (
        <>
          <PostImage
            {...props.node.attrs}
            className="postimage"
            contentEditable="true"
          />
          <div className="resize-trigger" onMouseDown={handler}>
            {props.extension.options.resizeIcon}
          </div>
        </>
      )}
    </NodeViewWrapper>
  );
};

export default ImageResizeComponent;

const PostImage = styled.img`
  display: inline-block;
`;
