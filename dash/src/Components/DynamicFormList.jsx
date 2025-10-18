import { Form, Input, Button, Card } from "antd";

const DynamicFormList = ({ name, label, placeholder, rules }) => {
  return (
    <Card
      title={label}
      bordered={false}
      style={{ marginBottom: 16, background: "#f7f7f7" }}
      bodyStyle={{ padding: 16 }}
    >
      <Form.List name={name}>
        {(models, { add: addModel, remove: removeModel }) => (
          <>
            {models.map(
              ({ key, name: modelName, ...restModelField }, index) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  {/* Model Input Field */}
                  <div className="text-lg font-semibold mb-2">
                    Enter{" "}
                    {name === "model" ? "Model Name" : `Warranty ${index + 1}`}
                  </div>

                  {/* Warranty List */}
                  {name !== "model" && (
                    <Form.Item
                      {...restModelField}
                      name={modelName}
                      rules={rules}
                    >
                      <Input
                        placeholder={placeholder}
                        addonAfter={
                          <Button
                            type="link"
                            onClick={() => removeModel(index)}
                            danger
                          >
                            Remove Warranty
                          </Button>
                        }
                      />
                    </Form.Item>
                  )}

                  {/* Nested typeValue- (Expects an array) */}
                  {name === "model" && (
                    <>
                      <Form.Item
                        {...restModelField}
                        name={[modelName, "model"]}
                        rules={rules}
                      >
                        <Input
                          placeholder={placeholder}
                          addonAfter={
                            <Button
                              type="link"
                              onClick={() => removeModel(index)}
                              danger
                            >
                              Remove Model
                            </Button>
                          }
                        />
                      </Form.Item>

                      <Form.List name={[modelName, "typeValue"]}>
                        {(
                          typeValue,
                          { add: addSpecification, remove: removeSpecification }
                        ) => (
                          <>
                            <div className="text-md font-semibold">
                              Model Specification
                            </div>

                            {typeValue.map(
                              (
                                { key, name: specName, ...restSpecField },
                                specIndex
                              ) => (
                                <div key={key}>
                                  <div className="grid grid-cols-5 gap-x-5 my-3">
                                    <Form.Item
                                      {...restSpecField}
                                      name={[specName, "type"]}
                                      label="Type"
                                      rules={rules}
                                      className="col-span-2 mb-0"
                                    >
                                      <Input placeholder="Enter type" />
                                    </Form.Item>

                                    <Form.Item
                                      {...restSpecField}
                                      name={[specName, "value"]}
                                      label="Value"
                                      rules={rules}
                                      className="col-span-2 mb-0"
                                    >
                                      <Input placeholder="Enter value" />
                                    </Form.Item>

                                    <div className="flex justify-end items-end">
                                      <Button
                                        type="dashed"
                                        onClick={() =>
                                          removeSpecification(specIndex)
                                        }
                                        danger
                                      >
                                        Remove Specification
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}

                            <div className="flex justify-end">
                              <Button
                                type="dashed"
                                onClick={() => addSpecification()}
                              >
                                Add Specification
                              </Button>
                            </div>
                          </>
                        )}
                      </Form.List>
                    </>
                  )}
                </div>
              )
            )}

            {/* Add Model or Advantage Button */}
            <Button type="dashed" onClick={() => addModel()} block>
              Add {label}
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default DynamicFormList;
