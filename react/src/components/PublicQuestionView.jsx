import React from "react";
import { Checkbox } from "./Checkbox";
import { RadioButton } from "./RadioButton";
import { SelectMenu } from "./SelectMenu";
import { Textarea } from "./Textarea";
import { TextInput } from "./TextInput";

export const PublicQuestionView = ({ question, index, answerChanged }) => {
  let selectedOptions = [];

  function onCheckboxChange(option, $event) {
    if ($event.target.checked) {
      selectedOptions.push(option.text);
    } else {
      selectedOptions = selectedOptions.filter((op) => op != option.text);
    }
    answerChanged(selectedOptions);
  }
  return (
    <>
      <fieldset className="mb-4">
        <div>
          <legend className="text-base font-medium text-gray-900">
            {index + 1}. {question.question}
          </legend>
          <p className="text-gray-500 text-sm">{question.description}</p>
        </div>

        <div className="mt-3">
          {question.type === "select" && (
            <div>
              <SelectMenu
                onChange={(ev) => answerChanged(ev.target.value)}
              >
                <option value="">Please Select</option>
                {question.data.options.map((option) => (
                  <option key={option.uuid} value={option.text}>
                    {option.text}
                  </option>
                ))}
              </SelectMenu>
            </div>
          )}
          {question.type === "radio" && (
            <div>
              {question.data.options.map((option, ind) => (
                <div key={option.uuid} className="flex items-center">
                  <RadioButton
                    id={option.uuid}
                    name={"question" + question.id}
                    value={option.text}
                    onChange={(ev) => answerChanged(ev.target.value)}
                    label={option.text}
                  />
                </div>
              ))}
            </div>
          )}
          {question.type === "checkbox" && (
            <div>
              {question.data.options.map((option, ind) => (
                <div key={option.uuid} className="flex items-center">
                  <Checkbox
                    id={option.uuid}
                    onChange={(ev) => onCheckboxChange(option, ev)}
                    label={option.text}
                  />
                </div>
              ))}
            </div>
          )}
          {question.type === "text" && (
            <div>
              <TextInput
                onChange={(ev) => answerChanged(ev.target.value)}
              />
            </div>
          )}
          {question.type === "textarea" && (
            <div>
              <Textarea
                onChange={(ev) => answerChanged(ev.target.value)}
              />
            </div>
          )}
        </div>
      </fieldset>
      <hr className="mb-4" />
    </>
  );
};
