import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate
} from "langchain/prompts";

export const PormptValueExample = async () => {

  /**
   * 
   * PromptValue usage examples (with PromptTemplate)
   */

  const template = "What is a good name for a company that makes {product}?";
  const promptA = new PromptTemplate({
    template,
    inputVariables: ['product'],
  });

  // The `formatPormptValue` method returns a `PromptValue1 object that can be 
  // uesd to format the prompt as a string or a list of `ChatMessage` objects.
  const responseA = await promptA.formatPromptValue({
    product: "colourful socks",
  });

  /**
   * PromptValue.toString()
   */
  const responseAString = responseA.toString();
  console.log({ responseAString });

  /**
   * PromptValue.toChatMessages()
   */
  const responseAMessages = responseA.toChatMessages();
  console.log({ responseAMessages });


  /**
   * 
   * PromptValue with ChatPromptTemplate
   * `formatPromptValue` also works with `ChatPromptTemplate`
   */

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a helpful assistant that translates {input_language} to {output_language}."
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);

  const responseB = await chatPrompt.formatPromptValue({
    input_language: "English",
    output_language: "French",
    text: "I love programming."
  });
  
  const responseBString = responseB.toString();
  console.log({ responseBString });
}