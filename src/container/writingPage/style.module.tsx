import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #999999;

  .ProseMirror {
    min-height: 2000px;
    padding: 80px 60px;
    font-size: 16px;
    background-color: white;
    color: #252525;
    margin-top: 10px;
    h1,
    h2,
    h3,
    p {
      font-weight: normal;
      line-height: 1.8;
      margin: 0;
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1.25em;
    }
  }

  .ProseMirror:focus {
    outline: none;
  }

  /* first view placeHolder style */
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  .ProseMirror .custom-HyperLink {
    color: #608cba;
    text-decoration: underline;
    cursor: pointer;
  }

  .image-resizer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .resize-trigger {
      position: relative;
      top: 8px;
      margin-left: -13px;
    }
  }
  .ProseMirror img {
    display: block;
    cursor: move;
  }
  div #left {
    float: left;
    margin-right: 36px;
    &::before {
      clear: left;
      display: block;
    }
    &::after {
      clear: left;
      display: block;
    }
    .resize-trigger {
      position: relative;
      top: 15px;
      margin-left: -41px;
    }
  }
  div #right {
    float: right;
    margin-left: 36px;
    &::before {
      clear: right;
      display: block;
    }
    &::after {
      clear: right;
      display: block;
    }
    .resize-trigger {
      position: relative;
      top: 8px;
      margin-left: -13px;
    }
  }

  iframe {
    border: 8px solid #000;
    border-radius: 4px;
    display: block;
    margin: auto;
    height: 350px;
  }
  div[data-youtube-video] > iframe {
    cursor: move;
  }

  /* HorizontalRule style */
  .ProseMirror div.hrDiv {
    border-top: 1px solid #ddd;
    margin: 20px auto;
  }
  .ProseMirror div.hrDivWhiteSquare {
    border-top: 1px solid #252525;
    margin: 40px auto 0px;
    width: 250px;
    &::after {
      content: "◇";
      font-size: 30px;
      position: relative;
      top: -14px;
      left: calc(50% - 8px);
      background-clip: padding-box;
      background-color: #fff;
    }
  }
  .ProseMirror div.hrDivDarkSquare {
    border-top: 1px solid #252525;
    margin: 40px auto 0px;
    width: 250px;
    &::after {
      content: "⬥";
      font-size: 30px;
      position: relative;
      top: -16px;
      left: calc(50% - 8px);
      background-clip: padding-box;
      background-color: #fff;
    }
  }
  .ProseMirror div.hrDivShort {
    border-top: 1px solid #ddd;
    margin: 20px auto;
    width: 250px;
  }

  .ProseMirror blockquote.openEndQuoteGray {
    ::before {
      content: "";
      display: inline-block;
      margin-right: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -115px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(37, 37, 37);
    }
    ::after {
      content: "";
      display: inline-block;
      margin-left: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -69px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(37, 37, 37);
    }
  }

  .ProseMirror blockquote.openEndQuoteDark {
    ::before {
      content: "";
      display: inline-block;
      margin-right: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -90px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(0, 0, 0);
    }
    ::after {
      content: "";
      display: inline-block;
      margin-left: 30px;
      width: 21px;
      height: 18px;
      background-image: url(https://editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position-x: -48px;
      background-position-y: -411px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
      border-collapse: collapse;
      color: rgb(0, 0, 0);
    }
  }

  .ProseMirror blockquote.borderSquareQuote {
    position: relative;
    margin-bottom: 50px;
    margin: 50px 300px;
    padding: 20px 30px;
    ::before,
    ::after {
      content: "";
      position: absolute;
      width: 26px;
      height: 26px;
      border: solid #4a4a4a;
    }
    ::before {
      top: -30px;
      left: -30px;
      border-width: 6px 0 0 6px;
    }
    ::after {
      bottom: -30px;
      right: -30px;
      border-width: 0 6px 6px 0;
    }
  }

  .ProseMirror blockquote.paperBoardQuote {
    max-width: 460px;
    padding: 33px 33px 0;
    border: solid #d5d5d5;
    border-width: 4px 4px 0;
    background: transparent;
    position: relative;
    margin: auto;
    margin-bottom: 50px;
    box-sizing: border-box;
    ::before {
      width: 47px;
      height: 48px;
      content: "";
      position: absolute;
      top: 100%;
      right: -4px;
      background-image: url(//editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position: -300px -186px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
    }
    ::after {
      content: "";
      position: absolute;
      top: 100%;
      left: -4px;
      right: 43px;
      height: 48px;
      background-color: transparent;
      border: solid #d5d5d5;
      border-width: 0 0 4px 4px;
      box-sizing: border-box;
    }
  }

  .ProseMirror blockquote.balloonQuote {
    padding-top: 35px;
    padding-bottom: 33px;
    border-width: 5px;
    max-width: 460px;
    padding: 21px;
    border: 4px solid #e4e4e4;
    border-bottom: 0;
    box-sizing: border-box;
    background: transparent;
    position: relative;
    margin: auto;
    margin-bottom: 50px;
    ::before {
      content: "";
      position: absolute;
      left: -5px;
      right: -5px;
      bottom: -5px;
      height: 5px;
      background: linear-gradient(
        90deg,
        #e4e4e4 0,
        #e4e4e4 30%,
        transparent 0,
        transparent 180px,
        #e4e4e4 0,
        #e4e4e4
      );
    }
    ::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 30%;
      width: 44px;
      height: 39px;
      background-image: url(//editor-static.pstatic.net/v/basic/1.46.0/img/se-sp-viewer.fc792692.png);
      background-position: -182px -325px;
      background-repeat: no-repeat;
      background-size: 432px 428px;
    }
  }
  .ProseMirror blockquote.basicDarkQuote {
    position: relative;
    margin: auto;
    box-sizing: border-box;
    padding: 0 20px;
    border-left: 6px solid #515151;
  }
  .ProseMirror blockquote.basicGrayQuote {
    position: relative;
    margin: auto;
    box-sizing: border-box;
    padding: 0 20px;
    border-left: 6px solid #b5b2b2;
  }

  .ProseMirror ul {
    list-style-type: none;
  }
  .ProseMirror ul.bulletList > li > p {
    &::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 13px;
      background-image: url(/img/writingPage/bullet.png);
      background-repeat: no-repeat;
    }
  }
  .ProseMirror ul.diamondList > li > p {
    list-style-type: none;
    &::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 13px;
      background-image: url(/img/writingPage/diamond.png);
      background-repeat: no-repeat;
    }
  }
  .ProseMirror ul.checkList > li > p {
    list-style-type: none;
    &::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 10px;
      background-image: url(/img/writingPage/check.png);
      background-repeat: no-repeat;
    }
  }
  .ProseMirror ol {
    margin-left: 18px;
    list-style-position: inherit;
  }
`;
