import { ReactNode } from "react";
import "./Tag.css";

export function Tag({ name, content, children }: Props) {
  return (
    <div className="handmadeReactChart-presets-codes-Tag">
      <div className="open">
        {"<"}
        <span className="name">{name}</span>
        {content}
        {children ? ">" : "/>"}
      </div>

      {children && (
        <>
          <div className="children">{children}</div>

          <div className="close">
            {"</"}
            <span className="name">{name}</span>
            {">"}
          </div>
        </>
      )}
    </div>
  );
}

interface Props {
  name: string;
  content?: ReactNode;
  children?: ReactNode;
}
