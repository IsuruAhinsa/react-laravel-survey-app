import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { SelectMenu } from "../../components/SelectMenu";
import { Textarea } from "../../components/Textarea";
import { TextInput } from "../../components/TextInput";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon } from "@heroicons/react/24/outline";

const QuestionEditor = ({
  index = 0,
  question,
  addQuestion,
  deleteQuestion,
  changeQuestion,
}) => {
  const [model, setModel] = useState({ ...question });
  const questionTypes = useSelector((state) => state.survey.questionTypes);

  useEffect(() => {
    changeQuestion(model);
  }, [model]);

  const upperCaseFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const shouldHaveOptions = (type = null) => {
    type = type || model.type;
    return ["select", "radio", "checkbox"].includes(type);
  };

  const handleQuestionTypeChange = (e) => {
    const newModel = { ...model, type: e.target.value };
    if (!shouldHaveOptions(model.type) && shouldHaveOptions(e.target.value)) {
      if (!model.data.options) {
        newModel.data = {
          options: [{ uuid: uuidv4(), text: "" }],
        };
      }
    }
    setModel(newModel);
  };

  const addOption = () => {
    model.data.options.push({
      uuid: uuidv4(),
      text: "",
    });
    setModel({ ...model });
  };

  const deleteOption = (op) => {
    model.data.options = model.data.options.filter(
      (option) => option.uuid != op.uuid
    );
    setModel({ ...model });
  };

  return (
    <div className="bg-green-200 p-3 rounded-md">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">
          {index + 1} . {model.question}
        </h4>
        <div className="space-x-3">
          <Button onClick={() => addQuestion(index + 1)} color="black">
            Add
          </Button>
          <Button onClick={() => deleteQuestion(question)} color="red">
            Delete
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3">
          <TextInput
            label="Question"
            id="question"
            value={model.question}
            onChange={(e) => setModel({ ...model, question: e.target.value })}
          />
        </div>
        <div>
          <SelectMenu
            id="questionType"
            label="Question Type"
            value={model.type}
            onChange={handleQuestionTypeChange}
          >
            {questionTypes.map((type) => (
              <option key={type} value={type}>
                {upperCaseFirst(type)}
              </option>
            ))}
          </SelectMenu>
        </div>
        <div className="col-span-4">
          <Textarea
            id="questionDescription"
            label="Description"
            value={model.description || ""}
            onChange={(e) =>
              setModel({ ...model, description: e.target.value })
            }
          />
        </div>
      </div>
      <div>
        {shouldHaveOptions() && (
          <div className="my-4 bg-blue-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-semibold">Options</h4>
              <Button onClick={() => addOption()} color="blue">
                Add Option
              </Button>
            </div>

            {model.data.options.length === 0 && (
              <div className="mx-auto bg-red-300 p-2 px-7 mt-2 w-fit rounded-md">
                You don't have any options defined.
              </div>
            )}

            {model.data.options.length > 0 && (
              <div className="my-3">
                {model.data.options.map((op, index) => (
                  <div
                    key={op.uuid}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3 w-full mr-5">
                      <span>{index + 1}</span>
                      <input
                        type='text'
                        value={op.text}
                        onInput={(e) => {
                          op.text = e.target.value;
                          setModel({ ...model });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div
                      onClick={() => deleteOption(op)}
                      className="p-2 rounded-full bg-white hover:bg-red-400 hover:cursor-pointer"
                    >
                      <TrashIcon className="w-5 text-red-500 hover:text-white hover:cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionEditor;
