import React, { useState } from "react";
import css from "./styles/useEditable.module.scss";

export function useEditableText(
  value: string | null
): [(editable: boolean) => JSX.Element, string, () => void] {
  const [text, setText] = useState(value ? value : "");

  const reset = () => {
    setText(value ? value : "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.currentTarget.value);
  };

  const getEditableField = () => {
    return (
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className={css["editable"]}
      />
    );
  };

  const renderEditableField = (editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        {editable ? getEditableField() : <span>{text}</span>}
      </div>
    );
  };

  return [renderEditableField, text, reset];
}
