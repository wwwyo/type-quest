import { ClassAttributes, HTMLAttributes } from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { getDoc } from "../../_fetch/get-doc";

const Pre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps;
  const classList = className ? className.split(":") : [];
  const language = classList[0]?.replace("language-", "");
  const fileName = classList[1];

  return (
    <>
      {fileName && (
        <div>
          <span>{fileName}</span>
        </div>
      )}
      <SyntaxHighlighter style={dracula} language={language}>
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </>
  );
};

export const QuestionDescriptionMarkdown: React.FC<{
  questionOriginalId: string;
}> = async ({ questionOriginalId }) => {
  const description = await getDoc(questionOriginalId, "description");
  return (
    <ReactMarkdown
      className="markdown whitespace-pre-wrap h-full"
      remarkPlugins={[remarkGfm]}
      components={{
        pre: Pre,
      }}
    >
      {description}
    </ReactMarkdown>
  );
};
