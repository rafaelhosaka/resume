import { Section } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import InfoItem from "../components/InfoTable/InfoItem";
import css from "./styles/useEditable.module.scss";

export function useEditableSections(
  array: Section[]
): [
  ((index: number, editable: boolean) => JSX.Element)[],
  Section[],
  () => void,
  (section: Section) => void,
  (index: number) => void
] {
  function textAreaAdjust(element: HTMLTextAreaElement) {
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
  }

  const reset = () => {
    setSections(JSON.parse(JSON.stringify(array)));
  };

  const addSection = (section: Section) => {
    setSections([...sections, section]);
  };

  const deleteSection = (index: number) => {
    const filtered = sections.filter((section) => section !== sections[index]);
    setSections(filtered);
  };

  const handleChangeTitle = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    let copy = [...sections];
    copy[index].title = e.target.value;
    setSections(copy);
  };

  const handleChangeDesc = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    let copy = [...sections];
    copy[index].description = e.target.value;

    setSections(copy);
  };

  const getEditableField = (index: number) => {
    return (
      <>
        <div className={css["title"]}>
          <InfoItem>
            <input
              type="text"
              value={sections[index].title ? sections[index].title! : ""}
              onChange={(e) => handleChangeTitle(index, e)}
              className={css["editable"]}
            />
          </InfoItem>
        </div>
        <InfoItem>
          <textarea
            ref={ref}
            value={
              sections[index].description ? sections[index].description! : ""
            }
            onChange={(e) => handleChangeDesc(index, e)}
            className={css["editable"]}
          />
        </InfoItem>
      </>
    );
  };

  const renderEditableField = (index: number, editable: boolean) => {
    return (
      <div className={css["editable-text__container"]}>
        {editable ? (
          getEditableField(index)
        ) : (
          <>
            <div className={css["title"]}>
              <InfoItem>{sections[index].title}</InfoItem>
            </div>
            <InfoItem>
              <span className={css["uneditable"]}>
                {sections[index].description}
              </span>
            </InfoItem>
          </>
        )}
      </div>
    );
  };

  const [editableSections, setEditableSections] = React.useState(() =>
    array.map(() => renderEditableField)
  );
  const [sections, setSections] = useState<Section[]>(
    JSON.parse(JSON.stringify(array))
  );

  const ref = useCallback(
    (node: HTMLTextAreaElement) => {
      if (node !== null) {
        return textAreaAdjust(node);
      }
    },
    [sections]
  );

  useEffect(() => {
    setEditableSections(() => sections.map(() => renderEditableField));
  }, [sections]);

  return [editableSections, sections, reset, addSection, deleteSection];
}
