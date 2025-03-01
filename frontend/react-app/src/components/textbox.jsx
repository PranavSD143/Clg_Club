import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/club/${register}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        if (data && data[0]?.club_info && quillInstance) {
          // Extract club_info and catchy_phrase from backend response
          const clubInfo = data[0].club_info || "";
          const catchyPhrase = data[0].catchy_phrase || "";

          // Merge both into one formatted HTML content
          const fullContent = `${clubInfo} <br><strong>Catchy Phrase:</strong> ${catchyPhrase}`;

          // Set the merged content in Quill editor
          quillInstance.clipboard.dangerouslyPasteHTML(fullContent);
          setEditorContent(fullContent);
        }
      } catch (error) {
        console.error("Failed to fetch existing content:", error);
      }
    }

    if (register && quillInstance) {
      fetchData();
    }
  }, [register, quillInstance]);

  function extractCatchyPhraseHTML(editorContent) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorContent;

    const regex = /(.*?)(<[^>]*>catchy phrase:<\/[^>]*>)(.*)/i;
    const match = tempDiv.innerHTML.match(regex);

    if (match) {
      return {
        club_info: match[1].trim(), // Keep HTML before "catchy phrase:"
        catchy_phrase: match[3].trim(), // Keep HTML after "catchy phrase:"
      };
    }

    return { club_info: editorContent.trim(), catchy_phrase: null }; // No catchy phrase found
  }

  const entry = async () => {
    console.log(register);
    const xyz = await fetch(`/info/${register}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(extractCatchyPhraseHTML(editorContent)),
    });
    navigate("/list");
  };
  return (
    <div>
      <div ref={quillRef} />
      <button onClick={entry}>Complete</button>
    </div>
  );
}

export default CustomQuillEditor;
