import { useEffect, useRef, useState } from "react";
import Quill from "quill/core";
import "quill/dist/quill.snow.css";

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Underline from "quill/formats/underline";
import Strike from "quill/formats/strike";
import Blockquote from "quill/formats/blockquote";
import CodeBlock from "quill/formats/code";
import Header from "quill/formats/header";
import List from "quill/formats/list";
import Script from "quill/formats/script";
import Indent from "quill/formats/indent";
import Link from "quill/formats/link";
import Image from "quill/formats/image";
import Video from "quill/formats/video";
import { AlignClass } from "quill/formats/align";
import { ColorStyle } from "quill/formats/color";
import { BackgroundStyle } from "quill/formats/background";
import { FontClass } from "quill/formats/font";
import { SizeStyle } from "quill/formats/size";

Quill.register("modules/toolbar", Toolbar);
Quill.register("themes/snow", Snow);
Quill.register("formats/bold", Bold);
Quill.register("formats/italic", Italic);
Quill.register("formats/underline", Underline);
Quill.register("formats/strike", Strike);
Quill.register("formats/blockquote", Blockquote);
Quill.register("formats/code-block", CodeBlock);
Quill.register("formats/header", Header);
Quill.register("formats/list", List);
Quill.register("formats/script", Script);
Quill.register("formats/indent", Indent);
Quill.register("formats/link", Link);
Quill.register("formats/image", Image);
Quill.register("formats/video", Video);
Quill.register("formats/align", AlignClass);
Quill.register("formats/color", ColorStyle);
Quill.register("formats/background", BackgroundStyle);
Quill.register("formats/font", FontClass);
Quill.register("formats/size", SizeStyle);

function CustomQuillEditor({ register }) {
  const quillRef = useRef(null);
  const [quillInstance, setQuillInstance] = useState(null);
  const [editorContent, setEditorContent] = useState(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }, { size: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        setEditorContent(html);

        console.log(JSON.stringify(html));
      });
      setQuillInstance(quill);
    }

    return () => {
      if (quillInstance) {
        quillInstance.root.innerHTML = ""; // Clears editor
        quillInstance.getModule("toolbar").container.remove(); // Removes toolbar
        setQuillInstance(null); // ✅ Correct way to reset state
      }
    };
  }, [quillInstance]); // Dependency array ensures this effect runs only when quillInstance changes

  console.log(register.id);
  const entry = async () => {
    const xyz = await fetch(`/info/${register.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content: editorContent }),
    });
  };
  return (
    <div>
      <div ref={quillRef} />
      <button onClick={entry}>Complete</button>
    </div>
  );
}

export default CustomQuillEditor;
